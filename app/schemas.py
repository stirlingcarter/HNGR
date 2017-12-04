from marshmallow import Schema, fields, post_load
from app.models import FoodDistributionCenter

class FDCSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    opening_time = fields.Time()
    closing_time = fields.Time()
    address = fields.Str()
    date_created = fields.DateTime()
    date_modified = fields.DateTime()
    admin_id = fields.Int()

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str()
    email = fields.Email()
    first_name = fields.Str()
    last_name = fields.Str()
    password = fields.Str()
    registered_on = fields.DateTime()
    role = fields.Str(validate=lambda n: n == 'fdcAdmin' or n == 'volunteer' or n == 'donor')
    fdc = fields.Nested(FDCSchema)
