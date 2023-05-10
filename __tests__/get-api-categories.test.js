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
describe('test get/categories ', () => {
    test('test that get/categories returns the correct outcome', () => {
        return request(app)
        .get("/api/categories")
        .expect(200)
        .then((result) => {
            const {categories} = result.body
            expect(categories).toBeInstanceOf(Array)
            const output = {
                "categories":[
                {
                  slug: 'euro game',
                  description: 'Abstact games that involve little luck'
                },
                {
                  slug: 'social deduction',
                  description: "Players attempt to uncover each other's hidden role"
                },
                {
                  slug: 'dexterity',
                  description: 'Games involving physical skill'
                },
                {
                  slug: "children's games",
                  description: 'Games suitable for children'
                }
              ]
            }
              
              expect(result.body).toEqual(output);
        })
    })
})
    
      

