const db = require("./db");

// register models
const { User, Product, Cart, CartItem } = require("./models");

module.exports = { db, User, Product, Cart, CartItem };
