const router = require("express").Router();
const { Product, GuestCart, Cart } = require("../db");
module.exports = router;

router.get("/add-to-cart/:productId", async (req, res, next) => {
	try {
		let id = req.params.productId;
		let cart = new GuestCart(req.session.cart ? req.session.cart : {});
		let product = await Product.findByPk(id);
		if (!product) res.status(401).json("this candle is not so lit");
		else {
			cart.addItem(product, id);
			console.log("this is the cart after adding a item", cart);
			req.session.cart = cart;
			res.redirect("/products");
		}
	} catch (err) {
		next(err);
	}
});

router.get("/cart", (req, res, next) => {
	if (!req.session.cart) {
		res.render("/cart", { products: null });
	}
	let cart = new GuestCart(req.session.cart);
	console.log("this is the total of the cart", cart.totalPrice);
	let cartArr = cart.createItemArr();
	res.json({ products: cartArr, total: cart.totalPrice });
});

router.put("/remove-item", (req, res, next) => {
	let productId = req.body.id;
	let cart = new GuestCart(req.session.cart);
	let updatedCart = cart.removeItem(cart, productId);
	req.session.cart = updatedCart;
	console.log("this is the req.session", req.session);
	res.send("OK");
});
