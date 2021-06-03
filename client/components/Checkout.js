import React, { useState } from "react";
import { markUserCartComplete, markGuestCartComplete } from "../store/cartItem";
import { connect } from "react-redux";
import { useLocation } from "react-router";

function Checkout(props) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [formState, setFormState] = useState("");
	const [zipCode, setZipCode] = useState("");
	const location = useLocation();
	const { cartItems, total } = location.state;

	const handleCheckout = () => {
		if (props.user.id) props.checkoutUser();
		else props.checkoutGuest();
	};

	const handleSubmit = evt => {
		evt.preventDefault();
		handleCheckout();
		props.history.push("/confirmation");
	};

	return (
		<div className="grid grid-flow-col grid-cols-2 gap-x-1 mx-6 my-6">
			<div className="inline p-4 border-2 border-indigo-50">
				<h1 className="font-bold text-3xl m-4 flex items-center text-indigo-400">
					Checkout
				</h1>
				<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
					<div className="flex content-evenly ">
						<input
							className="px-4 py-2 mx-4 flex-grow rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
							name="firstName"
							placeholder="first name"
							type="text"
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
							required
						/>
						<input
							className="px-4 py-2 mr-4 flex-grow rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
							name="lastName"
							placeholder="last name"
							type="text"
							value={lastName}
							onChange={e => setLastName(e.target.value)}
							required
						/>
					</div>
					<input
						className="px-4 py-2 mx-4 rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
						name="address"
						placeholder="address"
						type="text"
						value={address}
						onChange={e => setAddress(e.target.value)}
						required
					/>
					<input
						className="px-4 py-2 mx-4 rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
						name="city"
						placeholder="city"
						type="text"
						value={city}
						onChange={e => setCity(e.target.value)}
						required
					/>
					<input
						className="px-4 py-2 mx-4 rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
						name="state"
						placeholder="state"
						type="text"
						value={formState}
						onChange={e => setFormState(e.target.value)}
						required
					/>
					<input
						className="px-4 py-2 mx-4 rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
						type="text"
						name="zipcode"
						placeholder="zip code"
						inputMode="numeric"
						pattern="[0-9]{5}"
						value={zipCode}
						onChange={e => setZipCode(e.target.value)}
						required
					/>
					<button
						className="mx-4 mb-2 md:mb-0 bg-indigo-400 border border-indigo-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-indigo-500"
						type="submit"
					>
						Checkout!
					</button>
				</form>
			</div>
			<div className="inline p-4 border-2 border-indigo-50">
				<h2 className="m-4 font-bold text-3xl text-indigo-400">Your Cart</h2>
				{cartItems.length ? (
					<div>
						{" "}
						{cartItems.map(cartItem => (
							<div
								className="flex justify-between items-center"
								key={cartItem.id ? cartItem.id : cartItem.item.id}
							>
								<div className="w-20 h-20">
									<img
										className="object-scale-down rounded focus:ring"
										src={
											cartItem.imageUrl
												? cartItem.imageUrl
												: cartItem.item.imageUrl
										}
									/>
								</div>
								<div className="flex-grow-2">
									<p>
										<b>{cartItem.name ? cartItem.name : cartItem.item.name}</b>
									</p>
									<p>Qty: {cartItem.cartitem.quantity}</p>
									<p>
										Price: $
										{cartItem.price
											? (cartItem.price / 100).toFixed(2)
											: (cartItem.item.price / 100).toFixed(2)}
									</p>
								</div>
							</div>
						))}
						<div>
							<h2>Total:</h2>
							<h1>${(total / 100).toFixed(2)}</h1>
						</div>{" "}
					</div>
				) : (
					<h2>You have no items in your cart.</h2>
				)}
			</div>
		</div>
	);
}

const mapState = state => {
	return {
		user: state.user
	};
};

const mapDispatch = dispatch => ({
	checkoutUser: () => dispatch(markUserCartComplete()),
	checkoutGuest: () => dispatch(markGuestCartComplete())
});

export default connect(mapState, mapDispatch)(Checkout);
