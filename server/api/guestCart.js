const router = require("express").Router();
const { Product, GuestCart } = require("../db");
module.exports = router;

// GET api/guestCart
router.get("/", (req, res, next) => {
	if (!req.session.cart) {
		let cart = new GuestCart();
		req.session.cart = cart;
		res.status(200).json({ products: null, total: 0 });
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

//GET api/guestCart/productId --> decrement/increment product quantity in cart
router.put("/:productId/", (req, res, next) => {
	let id = req.params.productId;
	let cart = new GuestCart(req.session.cart ? req.session.cart : {});
	if (req.body.update === "decrement") {
		cart.decrementItem(id);
	} else if (req.body.update === "increment") {
		cart.incrementItem(id);
	}
	req.session.cart = cart;
	let cartArr = cart.createItemArr();
	res.json({ products: cartArr, total: cart.totalPrice });
});

//GET api/guestCart/remove/productId --> delete item from cart
router.delete("/:productId", (req, res, next) => {
	let id = Number(req.params.productId);
	let cart = new GuestCart(req.session.cart ? req.session.cart : {});

	cart.removeProduct(id);
	req.session.cart = cart;
	res.sendStatus(204);
});

router.put("/", (req, res, next) => {
	let cart = new GuestCart({});
	req.session.cart = cart;
	res.sendStatus(204);
});
