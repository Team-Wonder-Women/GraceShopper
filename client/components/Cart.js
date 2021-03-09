import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ handleClose, handleCheckout, show, children }) {
	// if show is true, the cart will display
	const showHideClassName = show ? "modal display-block" : "modal display-none";
	return (
		<div className={showHideClassName}>
			<section className="modal-main">
				{children}
				<button className="modal-main-btn" type="button" onClick={handleClose}>
					Keep Shopping
				</button>
				<Link
					onClick={() => {
						handleClose();
						handleCheckout();
					}}
					to="/checkout"
				>
					<button type="button">Checkout</button>
				</Link>
			</section>
		</div>
	);
}
