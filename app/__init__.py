from flask_api import FlaskAPI
from flask_sqlalchemy import SQLAlchemy
from flask import request, jsonify, abort

# local import
from instance.config import app_config

# initialize sql-alchemy
db = SQLAlchemy()

def create_app(config_name):
    from app.models import FoodDistributionCenter

    app = FlaskAPI(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    @app.route('/fdcs/', methods=['POST', 'GET'])
    def fdcs():
        if request.method == "POST":
            name = str(request.data.get('name', ''))
            if name:
                fdc = FoodDistributionCenter(name=name)
                fdc.save()
                response = jsonify({
                    'id': fdc.id,
                    'name': fdc.name,
                    'date_created': fdc.date_created,
                    'date_modified': fdc.date_modified
                })
                response.status_code = 201
                return response
        else:
            # GET
            fdcs = FoodDistributionCenter.get_all()
            results = []

            for fdc in fdcs:
                obj = {
                    'id': fdc.id,
                    'name': fdc.name,
                    'date_created': fdc.date_created,
                    'date_modified': fdc.date_modified
                }
                results.append(obj)
            response = jsonify(results)
            response.status_code = 200
            return response

    @app.route('/fdcs/<int:id>', methods=['GET', 'PUT', 'DELETE'])
    def fdc_manipulation(id, **kwargs):
     # retrieve a FDC using it's ID
        fdc = FoodDistributionCenter.query.filter_by(id=id).first()
        if not fdc:
            # Raise an HTTPException with a 404 not found status code
            abort(404)

        if request.method == 'DELETE':
            fdc.delete()
            return {
            "message": "Food Distribution Center {} deleted successfully".format(fdc.id) 
         }, 200

        elif request.method == 'PUT':
            name = str(request.data.get('name', ''))
            fdc.name = name
            fdc.save()
            response = jsonify({
                'id': fdc.id,
                'name': fdc.name,
                'date_created': fdc.date_created,
                'date_modified': fdc.date_modified
            })
            response.status_code = 200
            return response
        else:
            # GET
            response = jsonify({
                'id': fdc.id,
                'name': fdc.name,
                'date_created': fdc.date_created,
                'date_modified': fdc.date_modified
            })
            response.status_code = 200
            return response

    return app