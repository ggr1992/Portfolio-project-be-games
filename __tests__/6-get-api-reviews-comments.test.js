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
        .get("/api/reviews/3/comments")
        .expect(200)
        .then((result) => {     
            const comment = result.body.comments
            comment.forEach((comment) => {
            expect(comment).toEqual(expect.objectContaining({
                comment_id: expect.any(Number),
                review_id: expect.any(Number),
                created_at: expect.any(String),
                votes: expect.any(Number),
                author: expect.any(String),
                body: expect.any(String)         
            }))
        })
    })
    })
    test('that the comments are returned in the correct order' , () => {
        return request(app)
        .get("/api/reviews/3/comments")
        .expect(200)
        .then((result) => {
            const comments = result.body.comments
            expect(comments).toBeSortedBy('created_at', {
                descending: true,
            })
        })
    })
    test('Will respond with an error 404 if given an invalid id', () => {
        return request(app)
        .get("/api/reviews/10000/comments")
        .expect(404)
        .then((result) => {            
            expect(result.body.msg).toBe('Not Found!')
        })
    })
    test('Will respond with an error status 400 if given an invalid review_id', () => {
        return request(app)
        .get("/api/reviews/nonsense/comments")
        .expect(400)
        .then((result) => {         
            expect(result.body.msg).toBe('Bad request!')
        })
    })
})
