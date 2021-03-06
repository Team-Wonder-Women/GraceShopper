import React from "react";

export default function CartItem(props) {
	const { name, price, imageUrl } = props;

	return (
		<div>
			<h1>{name}</h1>
			<h1>${(price / 100).toFixed(2)}</h1>
		</div>
	);
}
