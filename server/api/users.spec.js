/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const { db } = require("../db");
const app = require("../index");
const User = db.model("user");

describe("User routes", () => {
	beforeEach(() => {
		console.log(request.agent);
		return db.sync({ force: true });
	});

	describe("/api/users/", () => {
		const codysEmail = "cody@puppybook.com";
		const firstName = "cody";
		const lastName = "thunks";

		beforeEach(() => {
			return User.create({
				firstName,
				lastName,
				email: codysEmail
			});
		});

		it("GET /api/users", async () => {
			await request(app).get("/api/users").expect(403);
		});
	}); // end describe('/api/users')
}); // end describe('User routes')
