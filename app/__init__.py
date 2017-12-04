import os
from flask import request, jsonify, abort, Flask, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# local import
from instance.config import app_config

# initialize sql-alchemy
db = SQLAlchemy()

app = Flask(__name__)
config_name = os.getenv('APP_SETTINGS') # config_name = "development"
app.config.from_object(app_config[config_name])
app.config.from_pyfile('../instance/config.py')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
bcrypt = Bcrypt(app)

from app.models import FoodDistributionCenter, User
from app.schemas import FDCSchema, UserSchema

fdc_schema = FDCSchema()
fdcs_schema = FDCSchema(many=True)
user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.route('/fdcs/', methods=['POST', 'GET'])
def fdcs():
    if request.method == "POST":
        json_data = request.get_json()
        if not json_data:
            return jsonify({'message': 'No input data provided'}), 400
        
        data, errors = fdc_schema.load(json_data)
        if errors:
            return jsonify(errors), 422

        name, address = data['name'], data['address']

        if name and address:
            fdc = FoodDistributionCenter(name=name, address=address)
            fdc.save()
            result = fdc_schema.dump(FoodDistributionCenter.query.get(fdc.id))
            response = jsonify({'message': 'Created new FDC',
                                'fdc': result.data})
            response.status_code = 201
            return response
    else:
        # GET
        fdcs = FoodDistributionCenter.get_all()
        results = fdcs_schema.dump(fdcs)
        response = jsonify({'fdcs': results.data})
        response.status_code = 200
        return response

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
        response.status_code = 201
        return response

@app.route('/users/', methods=['POST', 'GET'])
def users():
    if request.method == "POST":
        json_data = request.get_json()
        if not json_data:
            return jsonify({'message': 'No input data provided'}), 400
        
        data, errors = user_schema.load(json_data)
        if errors:
            return jsonify(errors), 422

        username, email, password, first_name, last_name, role = data['username'], data['email'], data['password'], data['first_name'], data['last_name'], data['role']

        if username and email and password and first_name and last_name and role:
            old_user = User.query.filter_by(username=username).first()
            email_user = User.query.filter_by(email=email).first()
            if not old_user and not email_user:
                try:
                    user = User(username=username, email=email, password=password, first_name=first_name, last_name=last_name, role=role)
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

@app.route('/users/login', methods=['POST'])
def login():
    json_data = request.get_json()
    if not json_data:
            return jsonify({'message': 'No input data provided'}), 400

    data, errors = user_schema.load(json_data)
    if errors:
        return jsonify(errors), 422

    username, email, password, first_name, last_name, role = data['username'], data['email'], data['password'], data['first_name'], data['last_name'], data['role']

    if username and email and password and first_name and last_name and role:
        try:
            user = User.query.filter_by(username=username).first()
            auth_token = user.encode_auth_token(user.id)
            if auth_token:
                response_object = {
                    'status': 'success',
                    'message': 'Successfully logged in.',
                    'auth_token': auth_token.decode()
                }
            return jsonify(response_object), 200
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return jsonify(response_object), 500

