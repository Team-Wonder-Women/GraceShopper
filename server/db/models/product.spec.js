// const { expect } = require("chai");
// const db = require("../index");
// const Product = require("./Product");

// describe("Product model", () => {
// 	let product1, product2, product3;
// 	beforeEach(async () => {
// 		product1 = await Product.create({
// 			name: "candleOne",
// 			description: "the best candle ever",
// 			quantity: 30,
// 			price: 44,
// 			size: "2 oz"
// 		});
// 		product2 = await Product.create({
// 			name: "candleTwo",
// 			description: "better than ever",
// 			quantity: 387,
// 			price: 57,
// 			size: "9 oz"
// 		});
// 	});
// 	afterEach(() => db.sync({ force: true }));

// 	it("create a new product", () => {
// 		expect(product1.name).to.be.equal("candleOne");
// 		expect(product1.description).to.be.equal("the best candle ever");
// 		expect(product1.quantity).to.be.equal(30);
// 		expect(product1.price).to.be.equal(44);
// 		expect(product1.size).to.be.equal("2 oz");

// 		expect(product2.name).to.be.equal("candleTwo");
// 		expect(product2.description).to.be.equal("better than ever");
// 		expect(product2.quantity).to.be.equal(387);
// 		expect(product2.price).to.be.equal(57);
// 		expect(product2.size).to.be.equal("9 oz");
// 	});

// 	it("has a imageUrl by default", () => {
// 		expect(product1.imageUrl).to.be.equal("placeholder.jpg");
// 	});

// 	it("accepts only a given ENUM sizes ", async () => {
// 		try {
// 			product3 = await Product.create({
// 				name: "candleThree",
// 				description: "the super candle",
// 				quantity: 74,
// 				price: 23,
// 				size: "5 oz"
// 			});
// 		} catch (err) {
// 			expect(product3).to.be.equal(undefined);
// 		}
// 	});
// });
