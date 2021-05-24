import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { addItemUser, addItemGuest } from "../store/cartItem";

import { deleteSingleProduct } from "../store/products";

export default function Products(props) {
	const [count, setCount] = useState(props.count);
	const { addToast } = useToasts();
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	function handleAdd() {
		addToast("Added!", { appearance: "success", autoDismiss: true });
		if (user.id) {
			dispatch(addItemUser(props.id, count));
		} else {
			dispatch(addItemGuest(props.id, count));
		}
		setCount(1);
	}

	function handleDeleteProduct() {
		dispatch(deleteSingleProduct(props.id));
	}

	return (
		<div className="flex border-2 border-indigo-50">
			{/* <Link to={`products/${props.id}`} className="flex-shrink-2"> */}
			<img src={props.imageUrl} className="w-2/4 mr-0" />
			{/* </Link> */}
			<div className="flex-grow flex-col text-center ml-px">
				<div className="text-xl font-extrabold">{props.name}</div>
				<button className="hover:text-indigo-200" type="button">
					see details
				</button>
				<p>${(props.price / 100).toFixed(2)}</p>
				<div className="flex justify-evenly">
					<button
						className="bg-indigo-50 w-6 h-6 hover:bg-indigo-200"
						type="button"
						onClick={() => setCount(count > 1 ? count - 1 : count)}
					>
						-
					</button>
					<div className="w-6 h-6">{count}</div>
					<button
						className="bg-indigo-50 w-6 h-6 hover:bg-indigo-200"
						type="button"
						onClick={() => setCount(count + 1)}
					>
						+
					</button>
					<button
						type="button"
						className="text-s h-6 px-2 hover:text-indigo-200"
						onClick={handleAdd}
					>
						Add to Cart
					</button>
				</div>
				{user.isAdmin ? (
					<button
						type="button"
						className="delete button-item"
						onClick={handleDeleteProduct}
					>
						Delete Product
					</button>
				) : (
					""
				)}
			</div>
		</div>
	);
}
