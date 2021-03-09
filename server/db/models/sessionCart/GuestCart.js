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

	//decrement one item from cart
	this.reduceItem = function (productId) {
		let deletedItem = this.items[productId];
		deletedItem.cartitem.quantity--;
		deletedItem.cartitem.price -= deletedItem.item.price;
		// this.totalQuantity--;
		this.totalPrice -= deletedItem.item.price;

		if (deletedItem.cartitem.quantity <= 0) {
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
};
