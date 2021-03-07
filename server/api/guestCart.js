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
		res.status(200).json({ products: null });
	} else {
		let cart = new GuestCart(req.session.cart);
		let cartArr = cart.createItemArr();
		res.json({ products: cartArr, total: cart.totalPrice });
	}
});

router.get("/reduce/:productId", (req, res, next) => {
	let id = req.params.productId;
	let cart = new GuestCart(req.session.cart ? req.session.cart : {});

	cart.reduceItem(id);
	console.log("this is the cart after reducing items", cart);
	req.session.cart = cart;
	res.redirect("/cart");
});

router.get("/remove/:productId", (req, res, next) => {
	let id = req.params.productId;
	let cart = new GuestCart(req.session.cart ? req.session.cart : {});

	cart.removeProduct(id);
	console.log("this is cart after removing product", cart);
	req.session.cart = cart;
	res.redirect("/cart");
});
