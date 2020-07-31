const server = require('../api/server.js');
const supertest = require('supertest');
const Recipes = require('./recipes-model.js');
const Ingredients = require('./ingredients-model.js');
const Instructions = require('./instructions-model.js');
const Users = require('../users/users-model.js');
const db = require('../data/connection.js');
const bcryptjs = require('bcryptjs');

const baseURL = `/api/recipes`;

// // GET REQUESTS //
describe('authorized tests', () => {
  let token;
  beforeAll(async () => {
    await db('users').truncate();
    const user = { username: 'barbara', password: 'moore' };
    const hash = bcryptjs.hashSync(user.password, 8);
    user.password = hash;
    await Users.add(user);
    await supertest(server)
      .post(`/api/users/login`)
      .send({ username: 'barbara', password: 'moore' })
      .then((res) => {
        return (token = res.body.token);
      });
  });

  describe('GET requests', () => {
    describe('GET /recipes', () => {
      beforeEach(async () => {
        await db('recipes').truncate();
        await Recipes.add({
          name: 'Honey Chicken Kabobs',
          source: 'Ann Marie',
          category: 'Grill',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
          user_id: 2,
        });
      });
      it('should return a list of recipes', async () => {
        await supertest(server)
          .get(`${baseURL}`)
          .set('Authorization', token)
          .then((res) => {
            // expect(res.body).toHaveLength(2);
            expect(res.body.data).toHaveLength(1);
          });
      });

      it('should respond with 200 OK', async () => {
        await supertest(server)
          .get(`${baseURL}`)
          .set('Authorization', token)
          // .expect(404);
          .expect(200);
      });

      it('should respond with JSON', async () => {
        await supertest(server)
          .get(`${baseURL}`)
          .set('Authorization', token)
          .then((res) => {
            expect(res.type).toMatch(/json/i);
          });
      });
    });

    describe('GET /recipes/:id', () => {
      beforeEach(async () => {
        await db('recipes').truncate();
        await Recipes.add({
          name: 'Honey Chicken Kabobs',
          source: 'Ann Marie',
          category: 'Grill',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
          user_id: 2,
        });
      });

      it('should return the requested recipe', async () => {
        await supertest(server)
          .get(`${baseURL}/1`)
          .set('Authorization', token)
          .then((res) => {
            expect(res.body.data.id).toBe(1);
          });
      });

      it('should respond with 200 OK', async () => {
        await supertest(server)
          .get(`${baseURL}/1`)
          .set('Authorization', token)
          .expect(200);
      });

      it('should respond with JSON', async () => {
        await supertest(server)
          .get(`${baseURL}/1`)
          .set('Authorization', token)
          .then((res) => {
            expect(res.type).toMatch(/json/i);
          });
      });
    });

    describe('GET /recipes/:id/ingredients', () => {
      beforeEach(async () => {
        await db('recipes').truncate();
        await db('ingredients').truncate();
        await Recipes.add({
          name: 'Honey Chicken Kabobs',
          source: 'Ann Marie',
          category: 'Grill',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
          user_id: 1,
        });
        await Ingredients.add({
          ingredient: '1/4 cup vegetable oil',
          recipe_id: 1,
        });
      });

      it('should return a list of ingredients for the provided recipe', async () => {
        await supertest(server)
          .get(`${baseURL}/1/ingredients`)
          .set('Authorization', token)
          .then((res) => {
            expect(res.body.data).toHaveLength(1);
          });
      });

      it('should respond with 200 OK', async () => {
        await supertest(server)
          .get(`${baseURL}/1/ingredients`)
          .set('Authorization', token)
          .expect(200);
      });

      it('should respond with JSON', async () => {
        await supertest(server)
          .get(`${baseURL}/1/ingredients`)
          .set('Authorization', token)
          .then((res) => {
            expect(res.type).toMatch(/json/i);
          });
      });
    });

    describe('GET /recipes/:id/instructions', () => {
      beforeEach(async () => {
        await db('recipes').truncate();
        await db('instructions').truncate();
        await Recipes.add({
          name: 'Honey Chicken Kabobs',
          source: 'Ann Marie',
          category: 'Grill',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
          user_id: 1,
        });
        await Instructions.add([
          {
            instruction:
              'Whisk together oil, honey, soy sauce, and pepper in a large bowl. Place chicken, garlic, onions, and peppers in the bowl to marinate for at least 2 hrs.',
            recipe_id: 1,
          },
        ]);
      });

      it('should return a list of instructions for the provided recipe', async () => {
        await supertest(server)
          .get(`${baseURL}/1/instructions`)
          .set('Authorization', token)
          .then((res) => {
            expect(res.body.data).toHaveLength(1);
          });
      });

      it('should respond with 200 OK', async () => {
        await supertest(server)
          .get(`${baseURL}/1/instructions`)
          .set('Authorization', token)
          .expect(200);
      });

      it('should respond with JSON', async () => {
        await supertest(server)
          .get(`${baseURL}/1/instructions`)
          .set('Authorization', token)
          .then((res) => {
            expect(res.type).toMatch(/json/i);
          });
      });
    });
  });

  describe('POST requests', () => {
    describe('POST /recipes', () => {
      beforeEach(async () => {
        await db('recipes').truncate();
        await Recipes.add({
          name: 'Honey Chicken Kabobs',
          source: 'Ann Marie',
          category: 'Grill',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
          user_id: 2,
        });
      });

      it('should respond with 201 CREATED', async () => {
        await supertest(server)
          .post(`${baseURL}`)
          .send({
            name: 'Southern-Style Egg Salad',
            source: 'Walter',
            category: 'Sandwich',
            imageURL:
              'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8100470.jpg',
            user_id: 1,
          })
          .set('Authorization', token)
          .expect(201);
      });

      it('should respond with JSON', async () => {
        await supertest(server)
          .post(`${baseURL}`)
          .send({
            name: 'Southern-Style Egg Salad',
            source: 'Walter',
            category: 'Sandwich',
            imageURL:
              'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8100470.jpg',
            user_id: 1,
          })
          .set('Authorization', token)
          .then((res) => {
            expect(res.type).toMatch(/json/i);
          });
      });

      it('should return the added recipe', async () => {
        await supertest(server)
          .post(`${baseURL}`)
          .send({
            name: 'Southern-Style Egg Salad',
            source: 'Walter',
            category: 'Sandwich',
            imageURL:
              'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8100470.jpg',
            user_id: 1,
          })
          .set('Authorization', token)
          .then((res) => {
            expect(res.body.data.source).toBe('Walter');
          });
      });
    });

    describe('POST /recipes/:id/ingredients', () => {
      beforeEach(async () => {
        await db('recipes').truncate();
        await db('ingredients').truncate();
        await Recipes.add({
          name: 'Honey Chicken Kabobs',
          source: 'Ann Marie',
          category: 'Grill',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
          user_id: 1,
        });
      });

      it('should respond with JSON', async () => {
        await supertest(server)
          .post(`${baseURL}/1/ingredients`)
          .send({ ingredients: ['an ingredient'] })
          .set('Authorization', token)
          .then((res) => {
            expect(res.type).toMatch(/json/i);
          });
      });

      it('should respond with 201 CREATED', async () => {
        await supertest(server)
          .post(`${baseURL}/1/ingredients`)
          .send({ ingredients: ['an ingredient'] })
          .set('Authorization', token)
          .expect(201);
      });
    });

    describe('POST /recipes/:id/instructions', () => {
      beforeEach(async () => {
        await db('recipes').truncate();
        await db('instructions').truncate();
        await Recipes.add({
          name: 'Honey Chicken Kabobs',
          source: 'Ann Marie',
          category: 'Grill',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
          user_id: 1,
        });
      });

      it('should respond with JSON', async () => {
        await supertest(server)
          .get(`${baseURL}/1/instructions`)
          .set('Authorization', token)
          .then((res) => {
            expect(res.type).toMatch(/json/i);
          });
      });

      it('should respond with 201 CREATED', async () => {
        await supertest(server)
          .post(`${baseURL}/1/instructions`)
          .send({ instructions: ['an instruction'] })
          .set('Authorization', token)
          .expect(201);
      });
    });
  });

  describe('PUT requests', () => {
    describe('PUT /:id', () => {
      beforeEach(async () => {
        await db('recipes').truncate();
        await Recipes.add({
          name: 'Honey Chicken Kabobs',
          source: 'Ann Marie',
          category: 'Grill',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
          user_id: 1,
        });
      });

      it('should return the updated recipe', async () => {
        await supertest(server)
          .put(`${baseURL}/1`)
          .send({
            name: 'Honey Chicken Kebabs',
            source: 'Annie Marie',
            category: 'Grill',
            imageURL:
              'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
            user_id: 1,
          })
          .set('Authorization', token)
          .then((res) => {
            expect(res.body.data.category).toBe('Grill');
          });
      });

      it('should respond with JSON', async () => {
        await supertest(server)
          .put(`${baseURL}/1`)
          .send({
            name: 'Honey Chicken Kebabs',
            source: 'Annie Marie',
            category: 'Grill',
            imageURL:
              'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
            user_id: 1,
          })
          .set('Authorization', token)
          .then((res) => {
            expect(res.type).toMatch(/json/i);
          });
      });
    });
  });

  describe('DELETE requests', () => {
    describe('DELETE /:id', () => {
      beforeEach(async () => {
        await db('recipes').truncate();
        await Recipes.add({
          name: 'Honey Chicken Kabobs',
          source: 'Ann Marie',
          category: 'Grill',
          imageURL:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
          user_id: 1,
        });
      });

      it('should respond with status 204', async () => {
        await supertest(server)
          .delete(`${baseURL}/1`)
          .set('Authorization', token)
          .then((res) => {
            expect(res.status).toBe(204);
          });
      });

      it('should respond with status 204', async () => {
        await supertest(server)
          .delete(`${baseURL}/1`)
          .then((res) => {
            expect(res.status).toBe(401);
          });
      });
    });
  });
});
