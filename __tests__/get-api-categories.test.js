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
            .then(({body}) => {
                const { categories } = body
                
                expect(categories).toHaveLength(4)
                categories.forEach(category => {                 
                    expect(category).toHaveProperty('slug')
                    expect(category).toHaveProperty('description')
                });
            })
    })
    test('test that the response is formatted correctly', () => {
        return request(app)
        .get("/api/categories")
        .expect(200)
            .then((result) => {
                // console.log(Object.keys(result.body))
               expect(result.body).toHaveProperty('categories')
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

    
      

