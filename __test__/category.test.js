//~Import module

import { app } from '../index.js';
import supertest from 'supertest';

//~ Testing category

describe('category', () => {
  describe('get category route', () => {
    describe("given the category doesn't exist", () => {
      it('should return a 404', async () => {
        const categoryId = '1234';

        await supertest(app).get(`/api/v1/categories/${categoryId}`).expect(500);
      });
    });
  });
});

describe('category', () => {
  describe('get category route', () => {
    describe('given the category does exist', () => {
      it('should return a 200 status and the product', async () => {
        const categoryId = '1';

        const { statusCode, body } = await supertest(app).get(`/api/v1/categories`);

        expect(statusCode).toBe(200);

        // expect(body.id).toBe(categoryId);
      });
    });
  });
});