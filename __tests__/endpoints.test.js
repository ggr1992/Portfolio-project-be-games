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


describe('Test that the get/api object', () =>{
    test('test that api categories has the correct information', () => {
        return request(app)
        .get("/api/")
        .expect(200)
        .then((result) => {
            const endoints = result.body;
  
            expect(endoints[ 'GET /api']).toEqual(expect.objectContaining({
                description: expect.any(String),               
              }))          
        })
    })
})
describe('Test that the get/api/categories object', () => {
    test('test that api categories has the correct information', () =>{
        return request(app)
        .get("/api/")
        .expect(200)
        .then((result) => {
            const endoints = result.body;
            const categoriesEndpoint = endoints[ 'GET /api/categories'].exampleResponse.categories[0]
            
                            
              expect(endoints[ 'GET /api/categories']).toEqual(expect.objectContaining({
                description: expect.any(String),  
                queries: expect.any(Array), 
                exampleResponse: expect.any(Object),
              }))  
              expect(endoints[ 'GET /api/categories'].exampleResponse).toEqual(expect.objectContaining({
                categories: expect.any(Array)
              }))  
             
              expect(categoriesEndpoint).toHaveProperty("description")
              expect(categoriesEndpoint).toHaveProperty("slug")  
              expect(typeof categoriesEndpoint.slug).toBe('string')
              expect(typeof categoriesEndpoint.description).toBe('string')        
        })        
    })
    })
})

describe('Test api/get returns the correct properties for reviews' , () => {
    test('that the object matches' , () => {
        return request(app)
        .get("/api/")
        .expect(200)
        .then((result) => {
            const endoints = result.body;
            const reviewEndpoint = endoints[ 'GET /api/reviews'].exampleResponse.reviews[0];
          
              expect(endoints[ 'GET /api/reviews']).toEqual(expect.objectContaining({
                description: expect.any(String),  
                queries: expect.any(Array), 
                exampleResponse: expect.any(Object),
              }))  
              expect(reviewEndpoint).toHaveProperty("title")
              expect(typeof reviewEndpoint.title).toBe('string')

              expect(reviewEndpoint).toHaveProperty("designer")
              expect(typeof reviewEndpoint.designer).toBe('string')

              expect(reviewEndpoint).toHaveProperty("owner")
              expect(typeof reviewEndpoint.owner).toBe('string')

              expect(reviewEndpoint).toHaveProperty("review_img_url")
              expect(typeof reviewEndpoint.review_img_url).toBe('string')

              expect(reviewEndpoint).toHaveProperty("category")
              expect(typeof reviewEndpoint.category).toBe('string')

              expect(reviewEndpoint).toHaveProperty("created_at")
              expect(typeof reviewEndpoint.created_at).toBe('string')

              expect(reviewEndpoint).toHaveProperty("votes")
              expect(typeof reviewEndpoint.votes).toBe('number')

              expect(reviewEndpoint).toHaveProperty("comment_count")
              expect(typeof reviewEndpoint.comment_count).toBe('number')
        })
        })
    })
    