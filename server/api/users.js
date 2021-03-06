const router = require("express").Router();
const { User } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		try {
			const users = await User.findAll({
				// explicitly select only the id and email fields - even though
				// users' passwords are encrypted, it won't help if we just
				// send everything to anyone who asks!
				attributes: ["id", "firstName", "lastName", "email", "isAdmin"]
			});
			res.json(users);
		} catch (error) {
			next(error);
		}
	} else {
		res.sendStatus(403);
	}
});
