import React from "react";

export default function User({ firstName, lastName, email, isAdmin }) {
	return (
		<div className={`user-container ${isAdmin ? "admin" : ""} `}>
			<h3>{`${firstName} ${lastName}`}</h3>
			{isAdmin ? <sub className="admin-label">Admin</sub> : ""}
			<p>{email}</p>
		</div>
	);
}
