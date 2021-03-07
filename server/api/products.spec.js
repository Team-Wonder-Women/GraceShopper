/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const { db } = require("../db");
const app = require("../index");
const Product = db.model("product");

describe("Product routes", () => {
	beforeEach(() => {
		return db.sync({ force: true });
	});

	describe("/api/products/", () => {
		const name = "Candle";
		const description = "super cool";
		const quantity = 2;
		const price = 1030;
		const size = "2 oz";

		beforeEach(() => {
			return Product.create({
				name,
				description,
				quantity,
				price,
				size
			});
		});

		it("GET /api/products", async () => {
			const res = await request(app).get("/api/products").expect(200);

			expect(res.body).to.be.an("array");
			expect(res.body[0].name).to.be.equal(name);
		});
	}); // end describe('/api/products')
}); // end describe('Product routes')