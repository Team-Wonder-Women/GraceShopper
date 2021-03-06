const { green, red } = require("chalk");
const { db } = require("../server/db");
const { Product, User, Cart, CartItem } = require("../server/db/models");

const products = [
	{
		name: "B-Shizzle",
		description:
			"Get these 100% beeswax candles to cleanse the air in your home. Comes in bundles of three.",
		imageUrl: "b-shizzle.jpg",
		quantity: 500,
		price: 4750,
		size: "2 oz",
		cartId: 2
	},
	{
		name: "Lit & Company",
		description:
			"This warming scent begins with a citrus blend of orange and grapefruit, making way for the main earthy, Cedarwood theme.",
		imageUrl: "lit-company.jpg",
		quantity: 500,
		price: 4999,
		size: "9 oz"
	},
	{
		name: "JOMO Dip",
		description:
			"Hand-dipped candles made from a bee-wax blend and colored with natural dyes. Comes in sets of two.",
		imageUrl: "jomo-dip.jpg",
		quantity: 500,
		price: 3320,
		size: "2 oz"
	},
	{
		name: "Not Today",
		description:
			"Let this blend of black currant, bergamot, rose, and black pepper comfort you and soothe your case of Mondays.",
		imageUrl: "nottoday.jpg",
		quantity: 500,
		price: 3495,
		size: "9 oz"
	},
	{
		name: "You Know The Vibes",
		description:
			"Life is good with this earthy, calming scent. With notes of driftwood and orchid cactus, get swept away in the fantasy of soft breezes and chill lo-fi music serenading the air around you.",
		imageUrl: "yktv.jpg",
		quantity: 500,
		price: 9130,
		size: "3 oz"
	},
	{
		name: "Stay Woke",
		description:
			"There’s nothing like a fresly brewed dark roast coffee aroma to jump start your day. With a splash of sweet coconut milk and undertones of premium eucalpytus, skip the coffee runs and fill your room with a vitalizing scent bound to jolt you with that caffeinated buzz.",
		imageUrl: "staywoke.jpg",
		quantity: 500,
		price: 980,
		size: "9 oz"
	},
	{
		name: "TBeeH",
		description:
			"This pair of 100% beeswax candles will have you wondering if maybe you really should have your friends over, if only to admire your new and beautiful dinner table set up. A kind gesture, or a sick burn? Maybe a little of both, TBH.",
		imageUrl: "tbeeh.jpg",
		quantity: 500,
		price: 5050,
		size: "2 oz"
	},
	{
		name: "Bye Firlicia",
		description:
			"Friends can be flakes, but this candle will never let you down. This Friday, we invite you to turn your phone to do not disturb and let notes of sandalwood, eucalyptus, and fir be your posse. Bye humans, hello bliss.",
		imageUrl: "byefirlicia.jpg",
		quantity: 500,
		price: 6060,
		size: "9 oz"
	},
	{
		name: "Spilt Tea",
		description:
			"Steep yourself in the intoxicating aroma of bergamot, chamomile and the latest hot goss. With this candle by your side, at least you know you’re not the one getting burned.",
		imageUrl: "splittea.jpg",
		quantity: 500,
		price: 7575,
		size: "9 oz"
	}
];

const users = [
	{
		firstName: "Olivia",
		lastName: "Wong",
		email: "olivia@litcollective.com",
		password: "password",
		isAdmin: true
	},
	{
		firstName: "Isa",
		lastName: "Stettler",
		email: "isa@litcollective.com",
		password: "password",
		isAdmin: true
	},
	{
		firstName: "Sandy",
		lastName: "Dai",
		email: "sandy@litcollective.com",
		password: "password",
		isAdmin: true
	},
	{
		firstName: "Siray",
		lastName: "Wali",
		email: "siray@litcollective.com",
		password: "password",
		isAdmin: true
	},
	{
		firstName: "Alice",
		lastName: "Ryan-Riley",
		email: "alice@gmail.com",
		password: "password"
	},
	{
		firstName: "Mary",
		lastName: "Gaudet",
		email: "mary@gmail.com",
		password: "password"
	},
	{
		firstName: "Sam",
		lastName: "Clement",
		email: "sam@gmail.com",
		password: "password"
	},
	{
		firstName: "Bri",
		lastName: "Hanan",
		email: "bri@gmail.com",
		password: "password"
	},
	{
		firstName: "Kelly",
		lastName: "Quinn",
		email: "kelly@gmail.com",
		password: "password"
	},
	{
		firstName: "Drew",
		lastName: "Kroculick",
		email: "drew@gmail.com",
		password: "password"
	},
	{
		firstName: "Sarah",
		lastName: "Furhman",
		email: "sarah@gmail.com",
		password: "password"
	}
];

const carts = [
	{
		orderStatus: "complete",
		userId: 1
	},
	{
		orderStatus: "incomplete",
		userId: 2
	},
	{
		orderStatus: "incomplete",
		userId: 3
	},
	{
		orderStatus: "incomplete",
		userId: 4
	},
	{
		orderStatus: "incomplete",
		userId: 5
	},
	{
		orderStatus: "incomplete",
		userId: 6
	},
	{
		orderStatus: "incomplete",
		userId: 7
	},
	{
		orderStatus: "incomplete",
		userId: 8
	},
	{
		orderStatus: "incomplete",
		userId: 9
	},
	{
		orderStatus: "incomplete",
		userId: 10
	},
	{
		orderStatus: "incomplete",
		userId: 11
	}
];

const cartItems = [
	{
		quantity: 1,
		cartId: 1,
		productId: 1
	},
	{
		quantity: 1,
		cartId: 2,
		productId: 2
	},
	{
		quantity: 1,
		cartId: 3,
		productId: 3
	},
	{
		quantity: 1,
		cartId: 4,
		productId: 4
	},
	{
		quantity: 1,
		cartId: 5,
		productId: 5
	},
	{
		quantity: 1,
		cartId: 6,
		productId: 6
	},
	{
		quantity: 1,
		cartId: 7,
		productId: 7
	},
	{
		quantity: 1,
		cartId: 8,
		productId: 8
	},
	{
		quantity: 1,
		cartId: 9,
		productId: 9
	},
	{
		quantity: 1,
		cartId: 10,
		productId: 7
	},
	{
		quantity: 1,
		cartId: 11,
		productId: 8
	},
	{
		quantity: 1,
		cartId: 10,
		productId: 9
	}
];

const seed = async () => {
	try {
		await db.sync({ force: true });

		// const [
		// 	bShizzle,
		// 	litAndCompany,
		// 	jomoDip,
		// 	notToday,
		// 	youKnowTheVibes,
		// 	stayWoke,
		// 	tBeeH,
		// 	byeFirlicia,
		// 	spiltTea
		// ] =

		const createdProducts = await Product.bulkCreate(products);
		console.log(green("Seeded products!"));

		const createdUsers = await User.bulkCreate(users);
		console.log(green("Seeded users!"));

		const createdCarts = await Cart.bulkCreate(carts);
		console.log(green("Seeded carts!"));

		const createdCartItems = await CartItem.bulkCreate(cartItems);
		console.log(green("Seeded cart items!"));
	} catch (err) {
		console.log(red(err));
	}
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
	seed()
		.then(() => {
			console.log(green("Seeding success!"));
			db.close();
		})
		.catch(err => {
			console.error(red("Oh no! Something went wrong!"));
			console.error(err);
			db.close();
		});
}
