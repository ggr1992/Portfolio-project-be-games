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
            votes: 10,
            body: 'This game hits me in the feels',
            created_at: new Date(1610964545410)

        }
        return request(app)
        .post("/api/reviews/2/comments")
        .send(newPost)
        .expect(201)
        .then(({body}) => {
            expect(body.comment).toEqual({username: 'bainesface',
        body:'This game hits me in the feels'})
       })
    })
    test('if a user doesn\'t exist return an error', () => {
        const newPost = {
            author: 'JimmySuperchips',
            votes: 10,
            body: 'This game hits me in the feels',
            created_at: new Date(1610964545410)
        }
        return request(app)
        .post("/api/reviews/20/comments")
        .send(newPost)
        .expect(404)
        .then((result) => {
            expect(result.body.msg).toBe('Not Found!')
        })
    })
})
