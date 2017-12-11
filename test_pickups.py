import unittest
import os
import json
import instance
from app import app, db
from app.models import User, Pickup
from app.schemas import UserSchema, PickupSchema

class PickupTestCase(unittest.TestCase):
    """This class represents the Pickup test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = app
        self.app.config.from_object(instance.config.TestingConfig)
        self.client = self.app.test_client()

        with self.app.app_context():
            # create all tables
            db.create_all()
    
    def test_pickup_creation(self):
        #User we're using
        user = User(username='charlie', email='test@test.com', password='password', first_name='charlie', last_name='fei', role='donor', location='nashville')
        schema = UserSchema()

        #Register User
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

        #Login User
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

        pickup_schema = PickupSchema()
        pickup = Pickup(description="My Pickup", donor=user)

        creation_response = self.client.post('/users/charlie/pickups/',
            data = pickup_schema.dumps(pickup).data,
            headers=dict(
                Authorization='Bearer ' + login_data['auth_token']
            ),
            content_type = 'application/json'
        )

        creation_data = json.loads(creation_response.data.decode())
        self.assertTrue(creation_data['status'] == 'success')
        self.assertTrue(creation_data['message'] == 'Successfully created pickup.')
        self.assertTrue(creation_response.content_type == 'application/json')
        self.assertEqual(creation_response.status_code, 201)
    
    def test_pickup_accept:
        #User we're using
        user = User(username='charlie', email='test@test.com', password='password', first_name='charlie', last_name='fei', role='donor', location='nashville')
        volunteer = User(username='volunteer', email='vol@test.com', password='password', first_name='vol', last_name='fei', role='volunteer', location='nashville')
        schema = UserSchema()

        #Register User
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

        #Login User
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

        pickup_schema = PickupSchema()
        pickup = Pickup(description="My Pickup", donor=user)

        creation_response = self.client.post('/users/charlie/pickups/',
            data = pickup_schema.dumps(pickup).data,
            headers=dict(
                Authorization='Bearer ' + login_data['auth_token']
            ),
            content_type = 'application/json'
        )

        creation_data = json.loads(creation_response.data.decode())
        self.assertTrue(creation_data['status'] == 'success')
        self.assertTrue(creation_data['message'] == 'Successfully created pickup.')
        self.assertTrue(creation_response.content_type == 'application/json')
        self.assertEqual(creation_response.status_code, 201)

        # accept_response = self.client.put('/pickups/1',
        #     )

    def tearDown(self):
        """teardown all initialized variables."""
        with self.app.app_context():
            # drop all tables
            db.session.remove()
            db.drop_all()

if __name__ == '__main__':
    unittest.main()