const router = require("express").Router();
const { Cart, Product } = require("../db/models");
module.exports = router;

//GET api/cart/id
router.get("/:id", async (req, res, next) => {
	try {
		const cart = await Cart.findOrCreate({ where: { userId: req.params.id } });
		if (cart[0].orderStatus === "incomplete") {
			const incompleteCart = await Cart.findByPk(cart[0].id, {
				include: { model: Product }
			});
			res.json(incompleteCart);
		} else {
			res.send("There's nothing in this cart!");
		}
	} catch (err) {
		next(err);
	}
});
