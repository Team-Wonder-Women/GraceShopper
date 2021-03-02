const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
	orderStatus: {
		type: Sequelize.ENUM("complete", "incomplete"),
		defaultValue: "incomplete"
	}
});

module.exports = Cart;
