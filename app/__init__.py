import os
from flask import request, jsonify, abort, Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# local import
from instance.config import app_config

# initialize sql-alchemy
db = SQLAlchemy()

#Initialize app
app = Flask(__name__)
config_name = os.getenv('APP_SETTINGS') # config_name = "development"
app.config.from_object(app_config[config_name])
app.config.from_pyfile('../instance/config.py')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
bcrypt = Bcrypt(app)

#Import SQL_alchemy models
from app.models import FoodDistributionCenter, User, BlacklistToken, Pickup
from app.schemas import FDCSchema, UserSchema, PickupSchema

#Initialize Marshmallow schemas
fdc_schema = FDCSchema()
fdcs_schema = FDCSchema(many=True)
user_schema = UserSchema()
users_schema = UserSchema(many=True)
pickup_schema = PickupSchema()
pickups_schema = PickupSchema(many=True)

#Create a new FDC and get all FDCs
@app.route('/fdcs/', methods=['POST', 'GET'])
def fdcs():
    if request.method == "POST":
        #Register user
        json_data = request.get_json()
        if not json_data:
            return jsonify({'message': 'No input data provided'}), 400
        
        #Check for errors when loading from FDC Schema
        data, errors = fdc_schema.load(json_data)
        if errors:
            return jsonify(errors), 422

        #Ensure that user is logged in
        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ''
        if auth_token:
            response = User.decode_auth_token(auth_token)
            if not isinstance(response, str):
                user = User.query.filter_by(id=response).first()

                #Check that user is correct and a FDC Admin
                if user.role == 'fdcAdmin':
                    try:
                        name, address = data['name'], data['address']

                        if name and address:
                            fdc = FoodDistributionCenter(name=name, address=address)
                            user.fdc = fdc
                            fdc.save()
                            db.session.commit()
                            result = fdc_schema.dump(FoodDistributionCenter.query.get(fdc.id))
                            response = jsonify({'status': 'success',
                                                'message': 'Successfully created FDC.',
                                                'fdc': result.data})
                            response.status_code = 201
                            return response
                    except Exception as e:
                        response_object = {
                            'status': 'fail',
                            'message': e
                        }
                        print(response_object)
                        return jsonify(response_object), 500
                else:
                    response_object = {
                        'status': 'fail',
                        'message': 'wrong user'
                    }
                    return jsonify(response_object), 401
            else:
                response_object = {
                    'status': 'fail',
                    'message': response
                }
                print(response_object)
                return jsonify(response_object), 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            print(response_object)
            return jsonify(response_object), 401
    else:
        # GET
        fdcs = FoodDistributionCenter.get_all()
        results = fdcs_schema.dump(fdcs)
        response = jsonify({'fdcs': results.data,
                            'status': 'success'})
        response.status_code = 200
        return response

#Get, edit, or delete a specific FDC
@app.route('/fdcs/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def fdc_manipulation(id, **kwargs):
    # retrieve a FDC using it's ID
    try:
        fdc = FoodDistributionCenter.query.get(id)
    except IntegrityError:
        return jsonify({"message": "FDC could not be found."}), 400

    if request.method == 'DELETE':
        fdc.delete()
        return {
        "message": "Food Distribution Center {} deleted successfully".format(fdc.name) 
        }, 200

    elif request.method == 'PUT':
        json_data = request.get_json()
        if not json_data:
            return jsonify({'message': 'No input data provided'}), 400
        
        data, errors = fdc_schema.load(json_data)
        if errors:
            return jsonify(errors), 422

        name, address = data['name'], data['address']

        if name:
            fdc.name = name
        if address:
            fdc.address = address

        fdc.save()
        result = fdc_schema.dump(FoodDistributionCenter.query.get(fdc.id))
        response = jsonify({'message': 'Edited FDC',
                            'fdc': result.data})
        response.status_code = 201
        return response
    else:
        # GET
        result = fdc_schema.dump(FoodDistributionCenter.query.get(fdc.id))
        response = jsonify({'fdc': result.data})
        response.status_code = 200
        return response

#Register a new user or get a list of all users
@app.route('/users/', methods=['POST', 'GET'])
def users():
    if request.method == "POST":
        json_data = request.get_json()
        if not json_data:
            return jsonify({'message': 'No input data provided'}), 400
        
        data, errors = user_schema.load(json_data)
        if errors:
            return jsonify({'error': errors}), 422

        username, email, password, first_name, last_name, role, location = data['username'], data['email'], data['password'], data['first_name'], data['last_name'], data['role'], data['location']

        if username and email and password and first_name and last_name and role and location:
            old_user = User.query.filter_by(username=username).first()
            email_user = User.query.filter_by(email=email).first()
            if not old_user and not email_user:
                try:
                    user = User(username=username, email=email, password=password, first_name=first_name, last_name=last_name, role=role, location=location)
                    user.save()

                    #Generate JWT
                    auth_token = user.encode_auth_token(user.id)
                    responseObject = {
                        'status': 'success',
                        'message': 'Successfully registered.',
                        'auth_token': auth_token.decode()
                    }

                    return jsonify(responseObject), 201
                except Exception as e:
                    responseObject = {
                        'status': 'fail',
                        'message': 'Some error occurred. Please try again.'
                    }
                    return jsonify(responseObject), 401
            else:
                responseObject = {
                    'status': 'fail', 
                    'message': 'User already exists'
                }
                return jsonify(responseObject), 202

#Login user
@app.route('/users/login', methods=['POST'])
def login():
    json_data = request.get_json()
    if not json_data:
            return jsonify({'message': 'No input data provided'}), 400

    data, errors = user_schema.load(json_data)
    if errors:
        return jsonify(errors), 422

    username, password = data['username'], data['password']

    if username and password:
        try:
            user = User.query.filter_by(username=username).first()
            if user and bcrypt.check_password_hash(user.password, json_data.get('password')):
                auth_token = user.encode_auth_token(user.id)
                if auth_token:
                    response_object = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'auth_token': auth_token.decode()
                    }
                return jsonify(response_object), 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'User does not exist.'
                }
                return jsonify(response_object), 404

        except Exception as e:
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return jsonify(response_object), 500

#Logout user by blacklisting their JWT
@app.route('/users/logout', methods=['POST'])
def logout():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(" ")[1]
    else:
        auth_token = ''
    if auth_token:
        response = User.decode_auth_token(auth_token)
        if not isinstance(response, str):
            #Mark token as blacklisted
            blacklist_token = BlacklistToken(token=auth_token)
            try:
                blacklist_token.save()
                response_object = {
                    'status': 'success',
                    'message': 'Successfully logged out.'
                }
                return jsonify(response_object), 200
            except Exception as e:
                response_object = {
                    'status': 'fail',
                    'message': e
                }
                return jsonify(response_object), 500
        else:
            response_object = {
                'status': 'fail',
                'message': resp
            }
            return jsonify(response_object), 401
    else:
        response_object = {
            'status': 'fail', 
            'message': 'Please return a valid auth token.'
        }
        return jsonify(response_object), 403

#Get or edit a specific user
@app.route('/users/<string:username>', methods=['GET', 'PUT'])
def user(username, **kwargs):
    if request.method == "GET":
        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ''
        if auth_token:
            response = User.decode_auth_token(auth_token)
            if not isinstance(response, str):
                user = User.query.filter_by(id=response).first()
                response_object = {
                    'status': 'success',
                    'data': {
                        'username':         user.username,
                        'email':            user.email,
                        'first_name':       user.first_name,
                        'last_name':        user.last_name,
                        'role':             user.role
                    }
                }
                return jsonify(response_object), 200
            else:
                response_object = {
                    'status': 'fail', 
                    'message': response
                }
                return jsonify(response_object), 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return jsonify(response_object), 401

#Create a new pickup
@app.route('/users/<string:username>/pickups/', methods=['POST'])
def pickups(username, **kwargs):
    json_data = request.get_json()
    if not json_data:
        return jsonify({'message': 'No input data provided'}), 400

    data, errors = pickup_schema.load(json_data)
    if errors:
        return jsonify(errors), 422
    
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(" ")[1]
    else:
        auth_token = ''
    if auth_token:
        print(auth_token)
        response = User.decode_auth_token(auth_token)
        if not isinstance(response, str):
            user = User.query.filter_by(id=response).first()

            #Check that user is correct and a donor
            if username == user.username and user.role == 'donor':
                try:
                    description = data['description']
                    #Create new pickup in DB
                    pickup = Pickup(description=description, donor=user)
                    user.pickups.append(pickup)
                    pickup.save()
                    db.session.commit()

                    response_object = {
                        'status': 'success',
                        'message': 'Successfully created pickup.'
                    }
                    return jsonify(response_object), 201
                except Exception as e:
                    response_object = {
                        'status': 'fail',
                        'message': str(e)
                    }
                    return jsonify(response_object), 500
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'wrong user'
                }
                return jsonify(response_object), 401
        else:
            response_object = {
                'status': 'fail', 
                'message': response
            }
            return jsonify(response_object), 401    
    else:
        response_object = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return jsonify(response_object), 401

#Get all pickups
@app.route('/pickups/', methods=['GET'])
def get_pickups():
    pickups = Pickup.get_all()
    results = pickups_schema.dump(pickups)
    response = jsonify({'pickups': results.data,
                        'status': 'success'}), 200
    return response