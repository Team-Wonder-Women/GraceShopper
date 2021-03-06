//Creating a object for the guest cart

module.exports = function GuestCart(prevCart) {
	this.items = prevCart.items || {};
	this.totalQty = prevCart.totalQty || 0;
	this.totalPrice = prevCart.totalQty || 0;

	//function for adding a new item to cart
	this.addItem = function (product, productId) {
		let storedItem = this.items[productId];
		if (!storedItem) {
			storedItem = this.items[productId] = { item: product, qty: 0, price: 0 };
		}
		storedItem.qty++;
		storedItem.price = storedItem.item.price;
		this.totalQty++;
		this.totalPrice += storedItem.item.price * storedItem.qty;
	};

	this.removeItem = function (cart, productId) {
		console.log("this is the cart", cart);
		let deletedItem = this.items[productId];
		if (deletedItem.qty < 2) {
			//remove the key of that object
			console.log(this.items);
		} else {
			deletedItem.qty--;
		}
		this.totalQty--;
		this.totalPrice -= deletedItem.price;

		return cart;
	};
	//helperfunction to make an array of the whole cart items so that we can make a list
	this.createItemArr = function () {
		let itemArr = [];
		for (let productId in this.items) {
			itemArr.push(this.items[productId]);
		}
		return itemArr;
	};
};
