const request = require("supertest");
const app = require("../app/server");

describe("GET /status", () => {
    it("should return API status", async () => {
        return request(app)
            .get("/status")
            .expect('Content-Type', /json/)
            .expect(200)
            // .then((res) => {
            //     expect(res.json).toBe(200);
            // })
    });
});