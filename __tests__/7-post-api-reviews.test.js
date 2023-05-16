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
            author: 'Jimmy Superchips',
            body: 'This game hits me in the feels'
        }
        return request(app)
        .post("/api/reviews/2/comments")
        .send(newPost)
        .expect(201)
        .then(({body}) => {
            
            expect(body.comments).toEqual(newPost)
       })
    })
})
