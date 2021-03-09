const router = require("express").Router();
const { Cart, Product, CartItem } = require("../db/models");
module.exports = router;

//GET api/userCart/id
router.get("/:userId", async (req, res, next) => {
	try {
		const cart = await Cart.findOrCreate({
			where: {
				userId: req.params.userId,
				orderStatus: "incomplete"
			}
		});
		const cartArr = await cart[0].getProducts();
		if (cartArr.length) {
			let totalPrice = 0;
			cartArr.forEach(item => {
				totalPrice = totalPrice + item.price * item.cartitem.quantity;
			});
			res.json({ products: cartArr, total: totalPrice });
		} else {
			res.status(200).json({ products: null });
		}
	} catch (err) {
		next(err);
	}
});

//POST api/userCart/userId/productId --> add-to-cart
router.post("/:productId", async (req, res, next) => {
	console.log("count -->", req.body.count);

	try {
		const cart = await Cart.findOrCreate({
			where: {
				userId: req.user.id,
				orderStatus: "incomplete"
			}
		});
		if (!(await cart[0].hasProduct(req.params.productId))) {
			const newItem = await Product.findByPk(req.params.productId);
			await cart[0].addProduct(newItem);
			CartItem.update(
				{ priceAtPurchase: newItem.price },
				{ where: { cartId: cart[0].id, productId: req.params.productId } }
			);
		}
		await CartItem.increment("quantity", {
			by: req.body.count,
			where: { cartId: cart[0].id, productId: req.params.productId }
		});
		const cartArr = await cart[0].getProducts();
		let totalPrice = 0;
		cartArr.forEach(item => {
			totalPrice = totalPrice + item.price * item.cartitem.quantity;
		});
		res.json({ products: cartArr, total: totalPrice });
	} catch (err) {
		next(err);
	}
});

//GET api/userCart/reduce/productId --> decrement product quantity in cart
router.put("/:cartId/:productId", async (req, res, next) => {
	try {
		const updateItem = await CartItem.findOne({
			where: { cartId: req.params.cartId, productId: req.params.productId }
		});
		if (updateItem.quantity > 1) {
			await CartItem.decrement("quantity", {
				where: { cartId: req.params.cartId, productId: req.params.productId }
			});
		} else {
			await CartItem.destroy({
				where: { cartId: req.params.cartId, productId: req.params.productId }
			});
		}
		const cart = await Cart.findByPk(req.params.cartId);
		const cartArr = await cart.getProducts();
		let totalPrice = 0;
		cartArr.forEach(item => {
			totalPrice = totalPrice + item.price * item.cartitem.quantity;
		});

		res.status(202).json({ products: cartArr, total: totalPrice });
	} catch (err) {
		next(err);
	}
});

//PUT api/userCart/userId --> mark cart complete
router.put("/", async (req, res, next) => {
	try {
		const cart = await Cart.update(
			{ orderStatus: "complete" },
			{
				where: {
					userId: req.user.id,
					orderStatus: "incomplete"
				}
			}
		);

		console.log(cart);

		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
});

//DELETE api/userCart/cartId/productId ---> delete item from cart
router.delete("/:cartId/:productId", async (req, res, next) => {
	try {
		await CartItem.destroy({
			where: { cartId: req.params.cartId, productId: req.params.productId }
		});
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
});
