const Sequelize = require("sequelize");
const db = require("../db");

const CartItem = db.define("cartitem", {
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	priceAtPurchase: {
		type: Sequelize.INTEGER
	}
});

module.exports = CartItem;
