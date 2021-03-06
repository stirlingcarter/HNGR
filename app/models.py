import datetime
import jwt
from app import db, bcrypt, app

class User(db.Model):
    """This class represents the users."""

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)
    role = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    available = db.Column(db.Boolean(), nullable=False)
    fdc = db.relationship('FoodDistributionCenter', uselist=False, backref='admin', lazy=True)
    pickups = db.relationship('Pickup', backref='donor', lazy=True)

    def __init__(self, username, email, password, first_name, last_name, role, location):
        self.username = username
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.role = role
        self.password = bcrypt.generate_password_hash(
            password, app.config.get('BCRYPT_LOG_ROUNDS')
        ).decode()
        self.available = False
        self.registered_on = datetime.datetime.now()
        self.location = location

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def encode_auth_token(self, user_id):
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=2, seconds=0),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'), algorithms='HS256')
            is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
            if is_blacklisted_token:
                return 'Token blacklisted. Please log in again.'
            else:
                return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

class BlacklistToken(db.Model):
    """
    Token Model for storing JWT tokens
    """
    __tablename__ = 'blacklist_tokens'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.String(500), unique=True, nullable=False)
    blacklisted_on = db.Column(db.DateTime, nullable=False)

    def __init__(self, token):
        self.token = token
        self.blacklisted_on = datetime.datetime.now()

    def __repr__(self):
        return '<id: token: {}'.format(self.token)

    @staticmethod
    def check_blacklist(auth_token):
        # check whether auth token has been blacklisted
        res = BlacklistToken.query.filter_by(token=str(auth_token)).first()
        if res:
            return True
        else:
            return False

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Pickup(db.Model):
    """This class represents the pickups."""

    __tablename__ = 'pickups'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.String)
    registered_on = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(255), nullable=False)
    donor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    destination_id = db.Column(db.Integer, db.ForeignKey('fooddistributioncenters.id'), nullable=True)
    location = db.Column(db.String(255), nullable=False)

    def __init__(self, description, donor):
        self.status = 'available'
        self.registered_on = datetime.datetime.now()
        self.description = description
        self.location = donor.location

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    @staticmethod
    def get_all():
        return Pickup.query.all()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class FoodDistributionCenter(db.Model):
    """This class represents the FDC table."""

    __tablename__ = 'fooddistributioncenters'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    opening_time = db.Column(db.Time, default=datetime.time(hour=8))
    closing_time = db.Column(db.Time, default=datetime.time(hour=17))
    address = db.Column(db.String(255))
    date_created = db.Column(db.DateTime)
    date_modified = db.Column(
        db.DateTime, default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp())
    admin_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    deliveries = db.relationship('Pickup', backref='destination', lazy=True)

    def __init__(self, name, address):
        """initialize with name."""
        self.name = name
        self.address = address
        self.opening_time = datetime.time(hour=8)
        self.closing_time = datetime.time(hour=17)
        self.date_created = datetime.datetime.now()
        self.date_modified = self.date_created

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
        return "<Food Distribution Center: {0} \n Address: {1}>".format(self.name, self.address)
