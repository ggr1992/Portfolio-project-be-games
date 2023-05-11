const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed")
const connection = require("../db/connection");
const testData = require("../db/data/test-data/index")
const endPointData = require('../endpoints.json');
const { application } = require("express");
const categories = require("../db/data/test-data/categories");

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
            expect(endpoints).toEqual(endPointData);           
        })
    })
    test('returns object containing relevent endpoints', () => {
        return request(app)
        .get("/api/")
        .expect(200)
        .then(({body}) => {
            expect(body).toHaveProperty('GET /api')
            expect(body).toHaveProperty('GET /api/categories')
            expect(body).toHaveProperty('GET /api/reviews')
            
        })
    })
    })
    