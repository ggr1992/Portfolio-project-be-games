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
            const getApiEndpoints = {"description": "serves up a json representation of all the available endpoints of the api"}

            expect(endoints[ 'GET /api']).toEqual(expect.objectContaining(getApiEndpoints));
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
            
            const getApiCategoriesEndpoints = {
                "description": "serves an array of all categories",
                "queries": [],
                "exampleResponse": {
                  "categories": [
                    {
                      "description": "Players attempt to uncover each other's hidden role",
                      "slug": "Social deduction"
                    }
                  ]
                }
              }
                       
            expect(endoints[ 'GET /api/categories']).toEqual(expect.objectContaining(getApiCategoriesEndpoints));
                 
              expect(endoints[ 'GET /api/categories']).toEqual(expect.objectContaining({
                description: expect.any(String),  
                queries: expect.any(Array), 
                exampleResponse: expect.any(Object),
              }))  
              expect(endoints[ 'GET /api/categories'].exampleResponse).toEqual(expect.objectContaining({
                categories: expect.any(Array)
              }))  
             
              expect(endoints[ 'GET /api/categories'].exampleResponse.categories[0]).toHaveProperty("description")
              expect(endoints[ 'GET /api/categories'].exampleResponse.categories[0]).toHaveProperty("slug")
                     
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
            const getApiReviewEndpoints = {
                "description": "serves an array of all reviews",
                "queries": ["category", "sort_by", "order"],
                "exampleResponse": {
                  "reviews": [
                    {
                      "title": "One Night Ultimate Werewolf",
                      "designer": "Akihisa Okui",
                      "owner": "happyamy2016",
                      "review_img_url": "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                      "category": "hidden-roles",
                      "created_at": "2018-05-30T15:59:13.341Z",
                      "votes": 0,
                      "comment_count": 6
                    }
                  ]
                }
              }
              expect(endoints[ 'GET /api/reviews']).toEqual(expect.objectContaining(getApiReviewEndpoints));

              expect(endoints[ 'GET /api/reviews']).toEqual(expect.objectContaining({
                description: expect.any(String),  
                queries: expect.any(Array), 
                exampleResponse: expect.any(Object),
              }))  
              expect(endoints[ 'GET /api/reviews'].exampleResponse.reviews[0]).toHaveProperty("title")
              expect(endoints[ 'GET /api/reviews'].exampleResponse.reviews[0]).toHaveProperty("designer")
              expect(endoints[ 'GET /api/reviews'].exampleResponse.reviews[0]).toHaveProperty("owner")
              expect(endoints[ 'GET /api/reviews'].exampleResponse.reviews[0]).toHaveProperty("review_img_url")
              expect(endoints[ 'GET /api/reviews'].exampleResponse.reviews[0]).toHaveProperty("category")
              expect(endoints[ 'GET /api/reviews'].exampleResponse.reviews[0]).toHaveProperty("created_at")
              expect(endoints[ 'GET /api/reviews'].exampleResponse.reviews[0]).toHaveProperty("votes")
              expect(endoints[ 'GET /api/reviews'].exampleResponse.reviews[0]).toHaveProperty("comment_count")

                 

        })
        })
    })
    