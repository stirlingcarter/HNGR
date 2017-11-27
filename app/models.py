import datetime
from app import db

class FoodDistributionCenter(db.Model):
    """This class represents the FDC table."""

    __tablename__ = 'fooddistributioncenters'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    opening_time = db.Column(db.Time, default=datetime.time(hour=8))
    closing_time = db.Column(db.Time, default=datetime.time(hour=17))
    address = db.Column(db.String(255))
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(
        db.DateTime, default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp())

    def __init__(self, name, address):
        """initialize with name."""
        self.name = name
        self.address = address

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return FoodDistributionCenter.query.all()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Food Distribution Center: {} \n Address: {1}>".format(self.name, self.address)

class User(db.Model):
    """This class represents the users."""

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)
    role = db.Column(db.String(255), nullable=False)

    def __init__(self, email, password, first_name, last_name, role): 
        self.email = email
        self.password = self.password = bcrypt.generate_password_hash(
            password, app.config.get('BCRYPT_LOG_ROUNDS')
        ).decode()