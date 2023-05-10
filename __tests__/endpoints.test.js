const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed")
const connection = require("../db/connection");
const testData = require("../db/data/test-data/index")
const endPointData = require('../endpoints.json')

beforeEach(() => {
    return seed(testData);
})

afterAll(() => {
    return connection.end()
})

describe('test get/api ', () => {
    test('test that get/api returns the correct outcome', () => {
        return request(app)
        .get("/api/")
        .expect(200)
        .then((result) => {
            const endpoints = result.body
                 console.log(endpoints)
            expect(endpoints).toEqual(endPointData);
        })
    })
})
