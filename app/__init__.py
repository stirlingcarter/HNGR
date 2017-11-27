from flask import request, jsonify, abort, Flask
from flask_sqlalchemy import SQLAlchemy
from flask.ext.bcrypt import Bcrypt

# local import
from instance.config import app_config

# initialize sql-alchemy
db = SQLAlchemy()

def create_app(config_name):
    from app.models import FoodDistributionCenter
    from app.schemas import FDCSchema

    app = Flask(__name__)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('../instance/config.py')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    fdc_schema = FDCSchema()
    fdcs_schema = FDCSchema(many=True)

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

    return app