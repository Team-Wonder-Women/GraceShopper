//Creating a object for the guest cart
module.exports = function GuestCart(prevCart) {
	this.items = prevCart.items || {};
	// this.totalQuantity = prevCart.totalQuantity || 0;
	this.totalPrice = prevCart.totalPrice || 0;

	//function for adding a new item to cart
	this.addItem = function (product, count) {
		let storedItem = this.items[product.id];
		if (!storedItem) {
			storedItem = this.items[product.id] = {
				item: product,
				cartitem: { quantity: 0, price: product.price }
			};
		}
		storedItem.cartitem.quantity += count;
		storedItem.cartitem.price =
			storedItem.item.price * storedItem.cartitem.quantity;
		// this.totalQuantity = this.totalQuantity + count;
		this.totalPrice += storedItem.item.price * count;
	};

	//increment on item of cart
	this.incrementItem = function (productId) {
		let updatedItem = this.items[productId];
		updatedItem.cartitem.quantity++;
		updatedItem.cartitem.price += updatedItem.item.price;
		this.totalPrice += updatedItem.item.price;
	};

	//decrement one item of cart
	this.decrementItem = function (productId) {
		let updatedItem = this.items[productId];
		updatedItem.cartitem.quantity--;
		updatedItem.cartitem.price -= updatedItem.item.price;
		// this.totalQuantity--;
		this.totalPrice -= updatedItem.item.price;

		if (updatedItem.cartitem.quantity <= 0) {
			delete this.items[productId];
		}
	};

	//remove one product entirely
	this.removeProduct = function (productId) {
		// this.totalQuantity -= this.items[productId].quantity;
		this.totalPrice -= this.items[productId].cartitem.price;
		delete this.items[productId];
	};

	//helperfunction to make an array of the whole cart items so that we can make a list
	this.createItemArr = function () {
		let itemArr = [];
		for (let productId in this.items) {
			itemArr.push(this.items[productId]);
		}
		return itemArr;
	};

	this.resetCart = function (prevCart) {
		this.items = {};
		this.totalPrice = 0;
	};
};
