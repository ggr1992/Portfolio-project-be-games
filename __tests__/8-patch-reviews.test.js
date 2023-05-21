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


describe('Testing patch api/review_id', () => {
    test('expect to get object back with patched result' , () => {
        const incVotes = {
            inc_votes:200
        }

        const output = {
            title: 'Jenga',
            designer: 'Leslie Scott',
            owner: 'philippaclaire9',
            review_img_url:
              'https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700',
            review_body: 'Fiddly fun for all the family',
            category: 'dexterity',
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 205
          }
        
    
        return request(app)
        .patch("/api/reviews/2")
         .expect(200)
        .send(incVotes)
        .then((result) => {
            
            expect(result.body.review).toEqual(output)
        })
    })
    test('Test that we get all the correct properties back' , () => {
        const incVotes = {
            inc_votes:200
        }

        return request(app)
        .patch("/api/reviews/2")
         .expect(200)
        .send(incVotes)
        .then((result) => {
            const body = result.body.review
            expect(body).toEqual(expect.objectContaining({
                category: expect.any(String),
                designer: expect.any(String),
                owner: expect.any(String),
                review_img_url: expect.any(String),
                review_body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                title: expect.any(String)       
            }))
        })
    })
    test('if there isn\'t a review with that ID return an error', () => {
        const incVotes = {
            inc_votes:200
        }

        return request(app)
        .patch("/api/reviews/300")
        .expect(404)
        .send(incVotes)
        .then((result) => {
            expect(result.body.msg).toBe('Not Found!')
        })
    })
    test('expect to get object back with patched result if given a negative number' , () => {
        const incVotes = {
            inc_votes:-4
        }

        const output = {
            title: 'Jenga',
            designer: 'Leslie Scott',
            owner: 'philippaclaire9',
            review_img_url:
              'https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700',
            review_body: 'Fiddly fun for all the family',
            category: 'dexterity',
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 1
          }
        
    
        return request(app)
        .patch("/api/reviews/2")
         .expect(200)
        .send(incVotes)
        .then((result) => {           
            expect(result.body.review).toEqual(output)
        })
})
})