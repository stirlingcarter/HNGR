import unittest
import os
import json
import instance
from app import app, db
from app.models import FoodDistributionCenter, User
from app.schemas import FDCSchema, UserSchema

class DistributionCenterTestCase(unittest.TestCase):
    """This class represents the FDC test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = app
        self.app.config.from_object(instance.config.TestingConfig)
        self.client = self.app.test_client()
        self.fdc = FoodDistributionCenter(name="Nashville Food Project", address="Ames")
        self.headers = {'Content-Type' : 'application/json'}

        # binds the app to the current context
        with self.app.app_context():
            # create all tables
            db.create_all()

    def test_fdc_creation(self):
        """Test FDC Creation (POST request)"""
        user = User(username='charlie', email='test@test.com', password='password', first_name='charlie', last_name='fei', role='fdcAdmin', location='nashville')
        schema = UserSchema()

        #Register a new FDC Admin
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

        #Login as FDC Admin
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

        fdc_schema = FDCSchema()
        creation_response = self.client.post('/fdcs/',
            data = fdc_schema.dumps(self.fdc).data,
            headers=dict(
                Authorization='Bearer ' + login_data['auth_token']
            ),
            content_type = 'application/json'
        )

        creation_data = json.loads(creation_response.data.decode())
        self.assertTrue(creation_data['status'] == 'success')
        self.assertTrue(creation_data['message'] == 'Successfully created FDC.')
        self.assertTrue(creation_response.content_type == 'application/json')
        self.assertEqual(creation_response.status_code, 201)

    def test_api_can_get_all_fdc(self):
        """Test API can get a FDC (GET request)."""
        user = User(username='charlie', email='test@test.com', password='password', first_name='charlie', last_name='fei', role='fdcAdmin', location='nashville')
        schema = UserSchema()

        #Register a new FDC Admin
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

        #Login as FDC Admin
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

        fdc_schema = FDCSchema()
        creation_response = self.client.post('/fdcs/',
            data = fdc_schema.dumps(self.fdc).data,
            headers=dict(
                Authorization='Bearer ' + login_data['auth_token']
            ),
            content_type = 'application/json'
        )

        creation_data = json.loads(creation_response.data.decode())
        self.assertTrue(creation_data['status'] == 'success')
        self.assertTrue(creation_data['message'] == 'Successfully created FDC.')
        self.assertTrue(creation_response.content_type == 'application/json')
        self.assertEqual(creation_response.status_code, 201)

        get_response = self.client.get('/fdcs/');
        data = json.loads(get_response.data.decode())
        self.assertTrue(data['status'] == 'success')
        self.assertIn('Nashville Food Project', str(data['fdcs']))
        self.assertEqual(get_response.status_code, 200)

    def test_api_can_get_fdc_by_id(self):
        """Test API can get a single FDC by using it's id."""
        user = User(username='charlie', email='test@test.com', password='password', first_name='charlie', last_name='fei', role='fdcAdmin', location='nashville')
        schema = UserSchema()

        #Register a new FDC Admin
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

        #Login as FDC Admin
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

        fdc_schema = FDCSchema()
        creation_response = self.client.post('/fdcs/',
            data = fdc_schema.dumps(self.fdc).data,
            headers=dict(
                Authorization='Bearer ' + login_data['auth_token']
            ),
            content_type = 'application/json'
        )

        creation_data = json.loads(creation_response.data.decode())
        self.assertTrue(creation_data['status'] == 'success')
        self.assertTrue(creation_data['message'] == 'Successfully created FDC.')
        self.assertTrue(creation_response.content_type == 'application/json')
        self.assertEqual(creation_response.status_code, 201)

        get_result = self.client.get('/fdcs/1')
        self.assertEqual(get_result.status_code, 200)
        self.assertIn('Nashville Food Project', str(get_result.data))

    def test_fdc_can_be_edited(self):
        """Test API can edit an existing DC. (PUT request)"""
        user = User(username='charlie', email='test@test.com', password='password', first_name='charlie', last_name='fei', role='fdcAdmin', location='nashville')
        schema = UserSchema()

        #Register a new FDC Admin
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

        #Login as FDC Admin
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

        fdc_schema = FDCSchema()
        creation_response = self.client.post('/fdcs/',
            data = fdc_schema.dumps(self.fdc).data,
            headers=dict(
                Authorization='Bearer ' + login_data['auth_token']
            ),
            content_type = 'application/json'
        )

        creation_data = json.loads(creation_response.data.decode())
        self.assertTrue(creation_data['status'] == 'success')
        self.assertTrue(creation_data['message'] == 'Successfully created FDC.')
        self.assertTrue(creation_response.content_type == 'application/json')
        self.assertEqual(creation_response.status_code, 201)

        put_response = self.client.put(
            '/fdcs/1',
            headers=dict(
                Authorization='Bearer ' + login_data['auth_token']
            ),
            data={'name': 'Wendys'},
            content_type = 'application/json'
        )
        
        print(put_response.data)
        self.assertEqual(put_response.status_code, 200)
        results = self.client().get('/fdcs/1')
        self.assertIn('Wendys', str(results.data))

    def test_dc_deletion(self):
        """Test API can delete an existing fdc. (DELETE request)."""
        user = User(username='charlie', email='test@test.com', password='password', first_name='charlie', last_name='fei', role='fdcAdmin', location='nashville')
        schema = UserSchema()

        #Register a new FDC Admin
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

        #Login as FDC Admin
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

        fdc_schema = FDCSchema()
        creation_response = self.client.post('/fdcs/',
            data = fdc_schema.dumps(self.fdc).data,
            headers=dict(
                Authorization='Bearer ' + login_data['auth_token']
            ),
            content_type = 'application/json'
        )

        creation_data = json.loads(creation_response.data.decode())
        self.assertTrue(creation_data['status'] == 'success')
        self.assertTrue(creation_data['message'] == 'Successfully created FDC.')
        self.assertTrue(creation_response.content_type == 'application/json')
        self.assertEqual(creation_response.status_code, 201)

        res = self.client.delete(
            '/fdcs/1',
            headers=dict(
                Authorization='Bearer ' + login_data['auth_token']
            )
        )
        self.assertEqual(res.status_code, 200)
        # Test to see if it exists, should return a 404
        result = self.client().get('/fdcs/1')
        self.assertEqual(result.status_code, 404)

    def tearDown(self):
        """teardown all initialized variables."""
        with self.app.app_context():
            # drop all tables
            db.session.remove()
            db.drop_all()

# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()