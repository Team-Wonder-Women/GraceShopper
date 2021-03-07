const User = require("./user");
const Cart = require("./Cart");
const Product = require("./Product");
const CartItem = require("./CartItem");
const GuestCart = require("./GuestCart");

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('')
 */
module.exports = {
	User,
	Cart,
	Product,
	CartItem,
	GuestCart
};
