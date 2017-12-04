import unittest
import os
import json
import instance
from app import app, db
from app.models import User
from app.schemas import UserSchema

class DistributionCenterTestCase(unittest.TestCase):
    """This class represents the User test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = app
        self.app.config.from_object(instance.config.TestingConfig)
        self.client = self.app.test_client()

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
        self.assertTrue(User.decode_auth_token(auth_token) == user.username)

    def test_user_registration(self):
        user = User(username='charlie', email='test@test.com', password='password', first_name='charlie', last_name='fei', role='volunteer')
        schema = UserSchema()
        response = self.client.post(
            '/users/',
            data = schema.dumps(user).data,
            content_type = 'application/json'
        )
        data = json.loads(response.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertTrue(data['message'] == 'Successfully registered.')
        self.assertTrue(data['auth_token'])
        self.assertTrue(response.content_type == 'application/json')
        self.assertEqual(response.status_code, 201)

    def test_registered_with_already_registered_user(self):
        user = User(username='charlie', email='test@test.com', password='password', first_name='charlie', last_name='fei', role='volunteer')
        schema = UserSchema()
        self.client.post('/users/',
            data = schema.dumps(user).data,
            content_type = 'application/json'
        )

        response = self.client.post(
            '/users/',
            data = schema.dumps(user).data,
            content_type = 'application/json'
        )

        data = json.loads(response.data.decode())
        self.assertTrue(data['status'] == 'fail')
        self.assertTrue(
            data['message'] == 'User already exists')
        self.assertTrue(response.content_type == 'application/json')
        self.assertEqual(response.status_code, 202)

    def test_user_login(self):
        user = User(username='charlie', email='test@test.com', password='password', first_name='charlie', last_name='fei', role='volunteer')
        schema = UserSchema()

        register_response = self.client.post('/users/',
            data = schema.dumps(user).data,
            content_type = 'application/json'
        )

        registration_data = json.loads(register_response.data.decode())
        self.assertTrue(registration_data['status'] == 'success')
        self.assertTrue(
            registration_data['message'] == 'Successfully registered.'
        )

        self.assertTrue(registration_data['auth_token'])
        self.assertTrue(register_response.content_type == 'application/json')
        self.assertEqual(register_response.status_code, 201)

        login_response = self.client.post('/users/login',
            data = schema.dumps(user).data,
            content_type = 'application/json'
        )

        login_data = json.loads(login_response.data.decode())
        self.assertTrue(login_data['status'] == 'success')
        self.assertTrue(login_data['message'] == 'Successfully logged in.')
        self.assertTrue(login_data['auth_token'])
        self.assertTrue(login_response.content_type == 'application/json')
        self.assertEqual(login_response.status_code, 200)

    def tearDown(self):
        """teardown all initialized variables."""
        with self.app.app_context():
            # drop all tables
            db.session.remove()
            db.drop_all()

if __name__ == '__main__':
    unittest.main()