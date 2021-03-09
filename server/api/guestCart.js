const router = require("express").Router();
const { Product, GuestCart } = require("../db");
module.exports = router;

// GET api/guestCart
router.get("/", (req, res, next) => {
	if (!req.session.cart) {
		res.status(200).json({ products: null });
	} else {
		let cart = new GuestCart(req.session.cart);
		let cartArr = cart.createItemArr();
		res.json({ products: cartArr, total: cart.totalPrice });
	}
});

//GET api/guestCart/productId --> add-to-cart
router.get("/:productId/:count", async (req, res, next) => {
	try {
		let id = req.params.productId;
		let cart = new GuestCart(req.session.cart ? req.session.cart : {});
		let product = await Product.findByPk(id);
		if (!product) res.status(401).json("this candle is not so lit");
		else {
			cart.addItem(product.dataValues, Number(req.params.count));
			req.session.cart = cart;
			let cartArr = cart.createItemArr();
			res.json({ products: cartArr, total: cart.totalPrice });
		}
	} catch (err) {
		next(err);
	}
});

//GET api/guestCart/reduce/productId --> decrement product quantity in cart
router.get("/reduce/:productId/", (req, res, next) => {
	let id = req.params.productId;
	let cart = new GuestCart(req.session.cart ? req.session.cart : {});

	cart.reduceItem(id);
	req.session.cart = cart;
	res.redirect("/");
});

//GET api/guestCart/remove/productId --> delete item from cart
router.delete("/:productId", (req, res, next) => {
	let id = Number(req.params.productId);
	let cart = new GuestCart(req.session.cart ? req.session.cart : {});

	cart.removeProduct(id);
	req.session.cart = cart;
	res.sendStatus(204);
});
