import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Cart from "./Cart";
import { fetchCartItemsGuest, fetchCartItemsUser } from "../store/cartItem";

export default function Navbar() {
	const cartItems = useSelector(state => state.cartItems);
	const user = useSelector(state => state.user);
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();

	const toggleShow = () => {
		setShow(!show);
	};

	const handleClick = () => {
		dispatch(logout());
	};

	useEffect(() => {
		if (user.id === undefined) {
			dispatch(fetchCartItemsGuest());
		}
	}, [user.id]);

	const cartCount = itemsArr => {
		let count = 0;
		itemsArr.forEach(item => {
			count += item.cartitem.quantity;
		});
		return count;
	};

	return (
		<div className="flex justify-between bg-indigo-50 py-3 px-2">
			<div>
				<Link to="/">
					<div className="flex items-end justify-center">
						<img
							className="w-10"
							src="/lit-collective.png"
							alt="lit collective logo"
						/>
						<h1 className="flex justify-center font-extrabolt text-gray-700 text-xl pl-2">
							litCollective
						</h1>
					</div>
				</Link>
			</div>
			<div className="flex justify-between">
				{user.id ? (
					<div className="flex items-end space-x-10">
						{/* The navbar will show these links after you log in */}
						<div>
							<Link to="/home">Home</Link>
						</div>
						{user.isAdmin && (
							<div>
								<Link to="/admin">Dashboard</Link>
							</div>
						)}
						<div>
							<Link to="/products">All Candles</Link>
						</div>
						<a href="" onClick={handleClick}>
							Logout
						</a>
					</div>
				) : (
					<div className="flex items-end space-x-10">
						{/* The navbar will show these links before you log in */}
						<div>
							<Link to="/login">Login</Link>
						</div>
						<div>
							<Link to="/signup">Sign Up</Link>
						</div>
						<div>
							<Link to="/products">All Candles</Link>
						</div>
					</div>
				)}
				{show && (
					<Cart show={show} toggleShow={toggleShow} cartItems={cartItems} />
				)}
				<div className="flex items-end pl-10 pr-3" onClick={toggleShow}>
					<img className="relative" src="/cart.svg" />
					<div>
						<span className="bg-indigo-200 bg-opacity-50 rounded-lg p-1 text-xs absolute top-8 right-3">
							{cartCount(cartItems.products)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
