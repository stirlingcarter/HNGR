import unittest
import os
import json
from app import create_app, db
from app.models import FoodDistributionCenter

class DistributionCenterTestCase(unittest.TestCase):
    """This class represents the FDC test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app(config_name="testing")
        self.client = self.app.test_client
        self.fdc = {'name': 'Nashville Food Project', 'address': '5417 Thackeray Drive'}
        self.headers = {'Content-Type' : 'application/json'}

        # binds the app to the current context
        with self.app.app_context():
            # create all tables
            db.create_all()

    def test_fdc_creation(self):
        """Test API can create a FDC (POST request)"""
        res = self.client().post('/fdcs/', data=json.dumps(self.fdc), headers=self.headers)
        self.assertEqual(res.status_code, 201)
        self.assertIn('Nashville Food Project', str(res.data))

    def test_api_can_get_all_fdc(self):
        """Test API can get a FDC (GET request)."""
        res = self.client().post('/fdcs/', data=json.dumps(self.fdc), headers=self.headers)
        self.assertEqual(res.status_code, 201)
        res = self.client().get('/fdcs/')
        self.assertEqual(res.status_code, 200)
        self.assertIn('Nashville Food Project', str(res.data))

    def test_api_can_get_fdc_by_id(self):
        """Test API can get a single FDC by using it's id."""
        rv = self.client().post('/fdcs/', data=json.dumps(self.fdc), headers=self.headers)
        self.assertEqual(rv.status_code, 201)
        result_in_json = json.loads(rv.data.decode('utf-8').replace("'", "\""))
        result = self.client().get(
            '/fdcs/{}'.format(result_in_json['id']))
        self.assertEqual(result.status_code, 200)
        self.assertIn('Nashville Food Project', str(result.data))

    def test_fdc_can_be_edited(self):
        """Test API can edit an existing DC. (PUT request)"""
        rv = self.client().post(
            '/fdcs/',
            data={'name': 'McDonalds'})
        self.assertEqual(rv.status_code, 201)
        rv = self.client().put(
            '/fdcs/1',
            data={
                "name": "Wendys"
            })
        self.assertEqual(rv.status_code, 200)
        results = self.client().get('/fdcs/1')
        self.assertIn('Wendys', str(results.data))

    def test_dc_deletion(self):
        """Test API can delete an existing fdc. (DELETE request)."""
        rv = self.client().post(
            '/fdcs/',
            data={'name': 'Nashville Food Project'})
        self.assertEqual(rv.status_code, 201)
        res = self.client().delete('/fdcs/1')
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