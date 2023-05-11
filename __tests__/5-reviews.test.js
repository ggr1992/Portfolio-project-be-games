const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed")
const connection = require("../db/connection");
const testData = require("../db/data/test-data/index")
const sorted = require('jest-sorted');

beforeEach(() => {
    return seed(testData);
})

afterAll(() => {
    return connection.end()
})

describe('testing the get api/reviews/ endpoint', () => {
    test('testing that get api/reviews/ returns the right information and returns status 200', () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((result) => {     
            const review = result.body.reviews
            review.forEach((review) => {
                expect(review).toHaveProperty('comment_count')
                expect(review).not.toHaveProperty('review_body')
                expect(review).toEqual(expect.objectContaining({
                    owner: expect.any(String),
                    title: expect.any(String),
                    review_id: expect.any(Number),
                    category: expect.any(String),
                    review_img_url: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    designer: expect.any(String),
                })) 
            })
        })
    })
    test('that the result returns in the right order', () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((result) => {
           
            const review = result.body.reviews
            console.log(review)
            expect([review]).toBeSortedBy('crefgfdd_at');
        })
    })
})