const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./Product");

const CartItem = db.define("cartitem", {
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	priceAtPurchase: {
		type: Sequelize.INTEGER,
		deafaultValue: Product.price
	}
});

module.exports = CartItem;

//function for adding a new item to cart
// this.addItem = function (product, productId) {
// 	let storedItem = this.items[productId];
// 	if (!storedItem) {
// 		storedItem = this.items[productId] = { item: product, qty: 0, price: 0 };
// 	}
// 	storedItem.qty++;
// 	storedItem.price = storedItem.item.price * storedItem.qty;
// 	this.totalQty++;
// 	this.totalPrice = this.totalPrice + storedItem.item.price;
// };

// //remove one item from cart
// this.reduceItem = function (productId) {
// 	let deletedItem = this.items[productId];
// 	deletedItem.qty--;
// 	deletedItem.price -= deletedItem.item.price;
// 	this.totalQty--;
// 	this.totalPrice -= deletedItem.item.price;

// 	if (this.items[productId] <= 0) {
// 		delete this.items[productId];
// 	}
// };

// //remove all from one product
// this.removeProduct = function (productId) {
// 	this.totalQty -= this.items[productId].qty;
// 	this.totalPrice -= this.items[productId].price;
// 	delete this.items[productId];
// };

// //helperfunction to make an array of the whole cart items so that we can make a list
// this.createItemArr = function () {
// 	let itemArr = [];
// 	for (let productId in this.items) {
// 		itemArr.push(this.items[productId]);
// 	}
// 	return itemArr;
// };
