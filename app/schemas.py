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