const router = require("express").Router();
const { Product } = require("../db");
module.exports = router;

// GET /api/products
router.get("/", async (req, res, next) => {
	try {
		const products = await Product.findAll();
		res.json(products);
	} catch (err) {
		next(err);
	}
});

// GET /api/products/:productId
router.get("/:productId", async (req, res, next) => {
	try {
		const singleProduct = await Product.findByPk(req.params.productId);
		res.json(singleProduct);
	} catch (err) {
		next(err);
	}
});

// POST /api/products/add
router.post("/add", async (req, res, next) => {
	try {
		const name = req.body.name;
		const description = req.body.description;
		const price = req.body.price;
		const size = req.body.size;
		const quantity = req.body.quantity;
		const [newProduct, wasCreated] = await Product.findOrCreate({
			where: {
				name: name,
				description: description,
				price: price,
				size: size,
				quantity: quantity
			}
		});
		if (!wasCreated) {
			res.status(409).json("Product was not created..");
		} else {
			res.status(201).json(newProduct);
		}
	} catch (err) {
		next(err);
	}
});
