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

describe('testing the get api/reviews/ endpoint', () => {
    test('testing that get api/reviews/ returns the right information and returns status 200', () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((result) => {     
            const review = result.body.reviews
            review.forEach((review) => {
                expect(review).not.toHaveProperty('review_body')
                expect(review).toHaveProperty('comment_count')
                expect(review).toEqual(expect.objectContaining({
                    owner: expect.any(String),
                    title: expect.any(String),
                    review_id: expect.any(Number),
                    category: expect.any(String),
                    review_img_url: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    designer: expect.any(String),
                    comment_count: expect.any(String)
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

            expect(review).toBeSortedBy('created_at', {
                descending: true,
            });
        })
    })
    test('.get/api/review shows up a 404 error', () => {
        return request(app)
        .get("/api/review")
        .expect(404)
        .then((result) => {            
            expect(result.body.msg).toBe('Not Found!')
        })
    })
   
})