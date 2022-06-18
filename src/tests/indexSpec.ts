import request from 'supertest';
import app from '../index';

describe('Testing Root Endpoints', () => {
  describe('Testing Get/root Endpoint', () => {
    it('Should redirect from the root to images', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(302);
    });
  });
});
describe('Testing Images Endpoints', () => {
  describe('Testing Get/images Endpoint', () => {
    it('Should Get the images endpoint with status of 200', async () => {
      const response = await request(app).get('/images');
      expect(response.status).toBe(200);
    });
  });
  describe('Testing Post/images Endpoint', () => {
    it('Should Post to the images endpoint and redirect to Get/images endpoint with status 302', () => {
      request(app).post('/images').expect(302);
    });
    it('Should Post image file with width and height to the Post/images Endpoint with status 200', () => {
      request(app)
        .post('/images')
        .attach('image', 'assets/images/xiao.jpg', {
          contentType: 'application/octet-stream'
        })
        .field('width', 200)
        .field('height', 200)
        .expect(200);
    });
  });
});
