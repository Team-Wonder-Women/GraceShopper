import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";
import { addItemUser, addItemGuest } from "../store/cartItem";
import { useToasts } from "react-toast-notifications";

export default function NewSingleProduct() {
	const { addToast } = useToasts();
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
		addToast("Added!", { appearance: "success", autoDismiss: true });
		if (id) {
			dispatch(addItemUser(productId, count));
		} else {
			dispatch(addItemGuest(productId, count));
		}
		setCount(1);
	};

	return (
		<div className="flex justify-center my-20">
			<div className="flex lg:flex-row flex-col lg:w-1/2 sm:w-2/5">
				<img
					className="lg:w-1/2 border-2 border-indigo-50 lg:mr-1 lg:mb-0 sm:mb-1"
					src={image}
					alt={`picture of ${singleProduct.name}`}
				/>
				<div className="flex pb-3 border-2 border-indigo-50">
					<div className="flex flex-col justify-between object-fill">
						<h1 className="text-2xl text-center font-extrabold my-6">
							{singleProduct.name}
						</h1>
						<p className="text-lg text-center">{singleProduct.description}</p>
						<p className="my-6 font-bold text-center">
							{singleProduct.size}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
							{(singleProduct.price / 100).toFixed(2)}
						</p>
						<div className="flex justify-center">
							<button
								className="w-6 h-6 bg-indigo-50 hover:bg-indigo-200"
								type="button"
								onClick={() => setCount(count > 1 ? count - 1 : count)}
							>
								-
							</button>
							<h2 className="w-6 h-6 text-center">{count}</h2>
							<button
								className="w-6 h-6 bg-indigo-50 hover:bg-indigo-200"
								type="button"
								onClick={() => setCount(count + 1)}
							>
								+
							</button>
							<button
								className="h-6 mx-2 text-lg hover:text-indigo-200"
								type="button"
								onClick={handleAdd}
							>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
