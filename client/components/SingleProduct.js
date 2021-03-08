import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";
export default function SingleProduct() {
	// in lieu of mapState
	const singleProduct = useSelector(state => state.singleProduct);
	const [image, setImage] = useState(
		"https://flevix.com/wp-content/uploads/2019/07/Round-Line-Loading.gif"
	);
	const [count, setCount] = useState(1);
	const [size, setSize] = useState("");
	// in lieu of match.props.params
	let { productId } = useParams();
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
	return (
		<div className="single-product-container">
			<h1>{singleProduct.name}</h1>
			<img src={image} />
			<h1>{singleProduct.description}</h1>
			<h1>${(singleProduct.price / 100).toFixed(2)}</h1>
			<label htmlFor="size">
				<h2>Choose Size:</h2>
			</label>
			<select
				name="size"
				value={size}
				onChange={evt => setSize(evt.target.value)}
			>
				<option value="2 oz">2 oz</option>
				<option value="3 oz">3 oz</option>
				<option value="9 oz">9 oz</option>
			</select>
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
			<button type="button">Add to Cart</button>
		</div>
	);
}
