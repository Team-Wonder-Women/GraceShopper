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
			res.json({ products: cartArr, total: 0 });
		} else {
			res.status(200).json({ products: null });
		}
	} catch (err) {
		next(err);
	}
});

//POST api/userCart/userId/productId --> add-to-cart
router.post("/:userId/:productId", async (req, res, next) => {
	try {
		const cart = await Cart.findOrCreate({
			where: {
				userId: req.params.userId,
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
			where: { cartId: cart[0].id, productId: req.params.productId }
		});
		const cartArr = await cart[0].getProducts();
		res.json({ products: cartArr, total: 0 });
	} catch (err) {
		next(err);
	}
});

//GET api/userCart/reduce/productId --> decrement product quantity in cart
router.put("/:cartId/:productId", async (req, res, next) => {
	try {
		const item = await CartItem.findOne({
			where: { cartId: req.params.cartId, productId: req.params.productId }
		});
		if (item.quantity > 1) {
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

		res.status(202).json({ products: cartArr, total: 0 });
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
