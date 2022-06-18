import { images } from '../../routes';
import request from 'supertest';
import app from '../../index';
import { v4 } from 'uuid';

describe('Testing Edit Endpoint for single image', () => {
  // it will test the endpoint with xiao.png from thumb and images
  const image = {
    file: 'assets/thumb/xiao.jpg',
    originalFile: 'assets/userimages/xiao.jpg',
    filename: 'xiao',
    format: 'jpg',
    width: 200,
    height: 200,
    index: v4()
  };
  images.push(image);
  it('should Test GET/edit Endpoint with status 200', async function () {
    const response = await request(app).get(`/images/edit/${image.index}`);
    expect(response.status).toBe(200);
  });
  it('should Test PATCH/edit endpoints with redirecting to home with status 302', async function () {
    images[0].originalFile = 'assets/images/xiao.jpg';
    const response = await request(app)
      .patch(`/images/edit/${image.index}`)
      .field('width', 200)
      .field('height', 200)
      .field('filename', '');
    expect(response.status).toBe(302);
  });
});
