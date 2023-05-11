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

describe('testing the get api/reviews/:review_id endpoint', () => {
    test('testing that get api/reviews/:review_id returns the right information and returns status 200', () => {
        return request(app)
        .get("/api/reviews/1")
        .expect(200)
        .then((result) => {
          const reviewObj = result.body
                       
            expect(reviewObj.review).toEqual(expect.objectContaining({
                review_id: expect.any(Number),
                    title: expect.any(String),
                    category: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_body: expect.any(String),
                    review_img_url: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number)
              }))  
         })
    })
    test('that given a id not with range we return an error', () => {
        return request(app)
        .get("/api/reviews/200")
        .expect(404)
        .then((result) => {            
            expect(result.body.msg).toBe('Not Found!')
        })
    })
    test('that given a string instead of a review ID return an error', () => {
        return request(app)
        .get("/api/reviews/nonsense")
        .expect(400)
        .then((result) => {         
            expect(result.body.msg).toBe('Bad request!')
        })
    })
})