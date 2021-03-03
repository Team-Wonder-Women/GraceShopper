/* global describe beforeEach it */

const { expect } = require("chai");
const db = require("../index");
const User = require("./user");

describe("User model", () => {
	let user1, user2;
	beforeEach(async () => {
		user1 = await User.create({
			firstName: "Sally",
			lastName: "Ride",
			email: "sallyride@nasa.gov",
			password: "password"
		});
		user2 = await User.create({
			firstName: "Mae",
			lastName: "Jemison",
			email: "maejemison@nasa.gov",
			password: "anotherPassword",
			isAdmin: true
		});
	});
	afterEach(() => db.sync({ force: true }));

	it("creates a new user", () => {
		expect(user1.firstName).to.be.equal("Sally");
		expect(user1.lastName).to.be.equal("Ride");
		expect(user1.email).to.be.equal("sallyride@nasa.gov");

		expect(user2.firstName).to.be.equal("Mae");
		expect(user2.lastName).to.be.equal("Jemison");
		expect(user2.email).to.be.equal("maejemison@nasa.gov");
		expect(user2.isAdmin).to.be.equal(true);
	});

	it("defaults isAdmin to false", () => {
		expect(user1.isAdmin).to.be.equal(false);
	});

	it("does not store password as plain text", () => {
		expect(user1.password).to.not.be.equal("password");
	});

	describe("instanceMethods", () => {
		describe("correctPassword", () => {
			// if user has a password, check to see if that password has been changed by our hash functions
			it("returns true if the password is correct", () => {
				expect(user1.correctPassword("password")).to.be.equal(true);
			});

			it("returns false if the password is incorrect", () => {
				expect(user1.correctPassword("bonez")).to.be.equal(false);
			});
		}); // end describe('correctPassword')
	}); // end describe('instanceMethods')
}); // end describe('User model')
