import React, { useState } from "react";
import { Link } from "react-router-dom";
import InsideCart from "./InsideCart";

export default function Cart({ toggleShow }) {
	// if show is true, the cart will display
	const [hasItems, setHasItems] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [total, setTotal] = useState(0);
	return (
		<div className="min-w-screen h-screen overflow-x-hidden overflow-y-auto fixed  my-auto inset-0 z-50 outline-none focus:outline-none  items-center flex justify-center">
			<div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-indigo-50 opacity-95">
				<button
					className="mb-2 md:mb-0 float-right px-3 py-1 text-sm font-bold tracking-wider rounded-full hover:text-gray-800"
					type="button"
					onClick={toggleShow}
				>
					x
				</button>
				<div className="text-center p-5 flex-auto justify-center">
					<h1 className="text-xl font-bold py-4 mb-5">Your Cart</h1>
					<InsideCart
						setHasItems={setHasItems}
						setCartItems={setCartItems}
						setTotal={setTotal}
					/>
				</div>
				{hasItems ? (
					<button
						className="w-full mb-2 md:mb-0 bg-indigo-400 border border-indigo-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-indigo-500"
						type="button"
					>
						<Link
							onClick={toggleShow}
							to={{
								pathname: "/checkout",
								state: { cartItems: cartItems, total: total }
							}}
						>
							Checkout
						</Link>
					</button>
				) : (
					<button
						className="w-full mb-2 md:mb-0 bg-indigo-400 border border-indigo-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-indigo-500"
						type="button"
					>
						<Link onClick={toggleShow} to="/products">
							Shop Products
						</Link>
					</button>
				)}
			</div>
		</div>
	);
}
