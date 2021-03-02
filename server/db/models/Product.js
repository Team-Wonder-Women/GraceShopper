const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	imageUrl: {
		type: Sequelize.TEXT,
		defaultValue: "../../public/image.png",
		validate: {
			notEmpty: true
		}
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	price: {
		type: Sequelize.DECIMAL(10, 2),
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	size: {
		type: Sequelize.ENUM(["2 oz", "3 oz", "9 oz"])
	}
});

module.exports = Product;
