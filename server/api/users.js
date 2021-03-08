const router = require("express").Router();
const { User } = require("../db/models");
module.exports = router;

router.get("/:id", async (req, res, next) => {
	try {
		if (req.user.isAdmin) {
			const users = await User.findAll({
				// explicitly select only the id and email fields - even though
				// users' passwords are encrypted, it won't help if we just
				// send everything to anyone who asks!
				attributes: ["id", "firstName", "lastName", "email", "isAdmin"]
			});
			res.json(users);
		} else {
			res.sendStatus(403);
		}
	} catch (err) {
		next(err);
	}
});
