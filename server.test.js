const request = require('supertest');
const app = require('./server');

describe('Arithmetic Operations API', () => {
  // Test root endpoint
  describe('GET /', () => {
    it('should return API information', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('endpoints');
      expect(response.body.endpoints).toHaveProperty('addition');
      expect(response.body.endpoints).toHaveProperty('subtraction');
      expect(response.body.endpoints).toHaveProperty('multiplication');
      expect(response.body.endpoints).toHaveProperty('division');
    });
  });

  // Test addition endpoint
  describe('GET /add', () => {
    it('should add two positive numbers correctly', async () => {
      const response = await request(app).get('/add?a=5&b=3');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        operation: 'addition',
        a: 5,
        b: 3,
        result: 8
      });
    });

    it('should add negative numbers correctly', async () => {
      const response = await request(app).get('/add?a=-5&b=-3');
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(-8);
    });

    it('should add decimal numbers correctly', async () => {
      const response = await request(app).get('/add?a=5.5&b=2.3');
      expect(response.status).toBe(200);
      expect(response.body.result).toBeCloseTo(7.8);
    });

    it('should return error when parameters are missing', async () => {
      const response = await request(app).get('/add?a=5');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return error for non-numeric inputs', async () => {
      const response = await request(app).get('/add?a=abc&b=5');
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Both parameters must be valid numbers');
    });
  });

  // Test subtraction endpoint
  describe('GET /subtract', () => {
    it('should subtract two numbers correctly', async () => {
      const response = await request(app).get('/subtract?a=10&b=3');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        operation: 'subtraction',
        a: 10,
        b: 3,
        result: 7
      });
    });

    it('should handle negative results', async () => {
      const response = await request(app).get('/subtract?a=3&b=10');
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(-7);
    });

    it('should subtract decimal numbers correctly', async () => {
      const response = await request(app).get('/subtract?a=5.5&b=2.3');
      expect(response.status).toBe(200);
      expect(response.body.result).toBeCloseTo(3.2);
    });

    it('should return error when parameters are missing', async () => {
      const response = await request(app).get('/subtract');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  // Test multiplication endpoint
  describe('GET /multiply', () => {
    it('should multiply two numbers correctly', async () => {
      const response = await request(app).get('/multiply?a=4&b=5');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        operation: 'multiplication',
        a: 4,
        b: 5,
        result: 20
      });
    });

    it('should handle multiplication by zero', async () => {
      const response = await request(app).get('/multiply?a=5&b=0');
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(0);
    });

    it('should multiply negative numbers correctly', async () => {
      const response = await request(app).get('/multiply?a=-4&b=-5');
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(20);
    });

    it('should multiply decimal numbers correctly', async () => {
      const response = await request(app).get('/multiply?a=2.5&b=4');
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(10);
    });
  });

  // Test division endpoint
  describe('GET /divide', () => {
    it('should divide two numbers correctly', async () => {
      const response = await request(app).get('/divide?a=20&b=4');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        operation: 'division',
        a: 20,
        b: 4,
        result: 5
      });
    });

    it('should handle decimal division correctly', async () => {
      const response = await request(app).get('/divide?a=10&b=3');
      expect(response.status).toBe(200);
      expect(response.body.result).toBeCloseTo(3.333333);
    });

    it('should return error for division by zero', async () => {
      const response = await request(app).get('/divide?a=10&b=0');
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Division by zero is not allowed');
    });

    it('should divide negative numbers correctly', async () => {
      const response = await request(app).get('/divide?a=-20&b=4');
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(-5);
    });

    it('should return error when parameters are missing', async () => {
      const response = await request(app).get('/divide?b=5');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  // Test 404 handling
  describe('404 handling', () => {
    it('should return 404 for undefined routes', async () => {
      const response = await request(app).get('/undefined-route');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Endpoint not found');
      expect(response.body).toHaveProperty('availableEndpoints');
    });
  });

  // Edge cases
  describe('Edge cases', () => {
    it('should handle very large numbers', async () => {
      const response = await request(app).get('/add?a=999999999999&b=1');
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(1000000000000);
    });

    it('should handle very small decimal numbers', async () => {
      const response = await request(app).get('/multiply?a=0.0001&b=0.0001');
      expect(response.status).toBe(200);
      expect(response.body.result).toBeCloseTo(0.00000001);
    });

    it('should handle special numeric strings', async () => {
      const response = await request(app).get('/add?a=1e2&b=2e1');
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(120);
    });

    it('should reject infinity as input', async () => {
      const response = await request(app).get('/add?a=Infinity&b=5');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
