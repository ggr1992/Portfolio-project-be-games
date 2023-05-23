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

describe('Tests for post api/reviews/review_id/comments', () => {
    test('That given data we can post it and return a status code of 201', () => {
        const newPost = {
            author: 'bainesface',
            body: 'This game hits me in the feels',         
        }
        return request(app)
        .post("/api/reviews/2/comments")
        .send(newPost)
        .expect(201)
        .then(({body}) => {
            expect(body.comment).toEqual(expect.objectContaining({
                author: expect.any(String),
                body: expect.any(String),
                votes: expect.any(Number),
                review_id: expect.any(Number),
                created_at: expect.any(String)
            }))
        })
    })
    test('if a user doesn\'t exist return an error', () => {
        const newPost = {
            author: 'JimmySuperchips',        
            body: 'This game hits me in the feels',
        }
        return request(app)
        .post("/api/reviews/20/comments")
        .send(newPost)
        .expect(404)
        .then((result) => {
            expect(result.body.msg).toBe('Not Found!')
        })
    })
    test('if the review id is not a number', () => {
        const newPost = {
            author: 'JimmySuperchips',        
            body: 'This game hits me in the feels',
        }
        return request(app)
        .post("/api/reviews/nonsense/comments")
        .send(newPost)
        .expect(400)
        .then((result) => {
            expect(result.body.msg).toBe('Bad request!')
        })
    })
    test.only('if information is missing return a status error 400', () => {
        const newPost = {
            author: 'JimmySuperchips',        
        }
        return request(app)
        .post("/api/reviews/2/comments")
        .send(newPost)
        .expect(400)
        .then((result) => {
            expect(result.body.msg).toBe('Bad Request!')
        })
    })
})
