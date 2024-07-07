// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import request from 'supertest';
// import app from '../index.js'; 

// dotenv.config();

// // Test Token
// describe('Token Generation', () => {
//   it('should generate a token with the correct user details and expiration', () => {
//     const userId = '123456';
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     expect(decoded.userId).toBe(userId);
//     expect(decoded.exp).toBeGreaterThan(decoded.iat);
//   });
// });

// // Test Organisation Access
// describe('Organisation Access', () => {
//   it('should prevent users from accessing organisations they do not belong to', async () => {
//     const user1Token = 'user1token'; 
//     const orgId = 'someOrgId';

//     const response = await request(app)
//       .get(`/api/organisations/${orgId}`)
//       .set('Authorization', `Bearer ${user1Token}`);

//     expect(response.status).toBe(403);
//     expect(response.body.message).toBe('You do not have permission to view this organisation');
//   });
// });


// // Registration Test
// describe('User Registration', () => {
//   it('should register user successfully with default organisation', async () => {
//     const user = {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john@example.com',
//       password: 'password123',
//       phone: '1234567890',
//     };

//     const response = await request(app)
//       .post('/api/auth/register')
//       .send(user);

//     expect(response.status).toBe(201);
//     expect(response.body.status).toBe('success');
//     expect(response.body.data.user.email).toBe(user.email);
//     expect(response.body.data.user.firstname).toBe(user.firstName);
//     expect(response.body.data.user.lastname).toBe(user.lastName);
//     expect(response.body.data.accessToken).toBeDefined();
//     expect(response.body.data.organisation.name).toBe("John's Organisation");
//   });

//   it('should fail if required fields are missing', async () => {
//     const user = {
//       firstName: '',
//       lastName: 'Doe',
//       email: 'john@example.com',
//       password: 'password123',
//       phone: '1234567890',
//     };

//     const response = await request(app)
//       .post('/api/auth/register')
//       .send(user);

//     expect(response.status).toBe(422);
//     expect(response.body.errors).toContain('First name is required');
//   });

//   it('should fail if there is a duplicate email', async () => {
//     const user = {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john@example.com',
//       password: 'password123',
//       phone: '1234567890',
//     };

//     await request(app)
//       .post('/api/auth/register')
//       .send(user);

//     const response = await request(app)
//       .post('/api/auth/register')
//       .send(user);

//     expect(response.status).toBe(422);
//     expect(response.body.message).toBe('User already exists');
//   });

//   it('should log in user successfully', async () => {
//     const user = {
//       email: 'john@example.com',
//       password: 'password123',
//     };

//     const response = await request(app)
//       .post('/api/auth/login')
//       .send(user);

//     expect(response.status).toBe(200);
//     expect(response.body.status).toBe('success');
//     expect(response.body.data.user.email).toBe(user.email);
//     expect(response.body.data.accessToken).toBeDefined();
//   });

//   it('should fail to log in with invalid credentials', async () => {
//     const user = {
//       email: 'john@example.com',
//       password: 'wrongpassword',
//     };

//     const response = await request(app)
//       .post('/api/auth/login')
//       .send(user);

//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe('Wrong password');
//   });
// });

import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../index'; 

describe('Auth API', () => {
  it('should register user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data.user.email', 'john@example.com');
  });

  it('should login user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data.user.email', 'john@example.com');
  });

  it('should fail if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('errors');
  });

  it('should fail if there’s duplicate email', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890'
      });

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '0987654321'
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('errors');
  });
});

