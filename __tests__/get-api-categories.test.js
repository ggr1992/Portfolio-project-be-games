const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed")
const connection = require("../db/connection");
const testData = require("../db/data/test-data/index")

beforeEach(() => {
    return seed(testData);
})

afterAll(() => {
    return connection.end()
})


describe('Testing the /api/categories', () => {
    test('testing that get api/categories returns the right information and returns status 200', () => {
        return request(app)
        .get("/api/categories")
        .expect(200)
            .then((result) => {
                const categories = result.body.categories
                expect(categories.length).toBe(4)
                
                expect(categories[0]).toHaveProperty('slug')
                expect(categories[0]).toHaveProperty('description')
            })
    })
    test('test that given an invalid route return an error', () => {
        return request(app)
        .get("/api/category")
        .expect(404)
            .then((result) => {
                expect(result.body.msg).toBe('Not Found!')
            })

    })
})

    
      

