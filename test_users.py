import unittest
import os
import json
import instance
from app import app, db
from app.models import User

class DistributionCenterTestCase(unittest.TestCase):
    """This class represents the User test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = app
        self.app.config.from_object(instance.config.TestingConfig)
        self.client = self.app.test_client

        with self.app.app_context():
            # create all tables
            db.create_all()

    def test_encode_auth_token(self):
        user = User(username='charlie', email='test@test.com', password='password', first_name='charlie', last_name='fei', role='volunteer')
        auth_token = user.encode_auth_token(user_id=user.id)
        self.assertTrue(isinstance(auth_token, bytes))

    def test_decode_auth_token(self):
        user = User(username='charlie', email='test@test.com', password='password', first_name='charlie', last_name='fei', role='volunteer')
        auth_token = user.encode_auth_token(user_id=user.username)
        self.assertTrue(isinstance(auth_token, bytes))
        print(User.decode_auth_token(auth_token))
        self.assertTrue(User.decode_auth_token(auth_token) == user.username)

    def tearDown(self):
        """teardown all initialized variables."""
        with self.app.app_context():
            # drop all tables
            db.session.remove()
            db.drop_all()

if __name__ == '__main__':
    unittest.main()