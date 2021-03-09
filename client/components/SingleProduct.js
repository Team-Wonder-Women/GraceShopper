import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";
import { addItemUser, addItemGuest } from "../store/cartItem";
export default function SingleProduct() {
	// in lieu of mapState
	const singleProduct = useSelector(state => state.singleProduct);
	const { id } = useSelector(state => state.user);
	const [image, setImage] = useState(
		"https://flevix.com/wp-content/uploads/2019/07/Round-Line-Loading.gif"
	);
	const [count, setCount] = useState(1);
	// in lieu of match.props.params
	const { productId } = useParams();
	// in lieu of mapDispatch
	const dispatch = useDispatch();
	// in lieu of componentDidMount
	useEffect(() => {
		dispatch(fetchSingleProduct(productId));
	}, {});
	// in lieu of componentDidUpdate
	useEffect(() => {
		setImage(`/${singleProduct.imageUrl}`);
	});

	const handleAdd = () => {
		if (id) {
			dispatch(addItemUser(productId, count));
		} else {
			dispatch(addItemGuest(productId, count));
		}
		setCount(1);
	};

	return (
		<div className="single-product-container">
			<h1>{singleProduct.name}</h1>
			<img src={image} />
			<h1>{singleProduct.description}</h1>
			<h2>{singleProduct.size}</h2>
			<h1>${(singleProduct.price / 100).toFixed(2)}</h1>
			<div className="quantity-buttons">
				<button
					className="quantity-button"
					type="button"
					onClick={() => setCount(count > 1 ? count - 1 : count)}
				>
					-
				</button>
				<h2 id="quantity-counter">{count}</h2>
				<button
					className="quantity-button"
					type="button"
					onClick={() => setCount(count + 1)}
				>
					+
				</button>
			</div>
			<button type="button" onClick={handleAdd}>
				Add to Cart
			</button>
		</div>
	);
}
