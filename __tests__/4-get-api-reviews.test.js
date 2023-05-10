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
            
            expect(reviewObj).toHaveProperty('review')
            expect(reviewObj.review).toHaveProperty('review_id')
            expect(reviewObj.review).toHaveProperty('title')
            expect(reviewObj.review).toHaveProperty('category')
            expect(reviewObj.review).toHaveProperty('designer')
            expect(reviewObj.review).toHaveProperty('owner')
            expect(reviewObj.review).toHaveProperty('review_body')
            expect(reviewObj.review).toHaveProperty('review_img_url')
            expect(reviewObj.review).toHaveProperty('created_at')
            expect(reviewObj.review).toHaveProperty('votes')
        })
    })
    test('that given a id not with range we return an error', () => {
        return request(app)
        .get("/api/reviews/200")
        .expect(400)
        .then((result) => {
            
            expect(result.body.msg).toBe('invalid review ID')
        })
    })
})