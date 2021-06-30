import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";

/**
 * COMPONENT
 */
const AuthForm = props => {
	const { name, displayName, handleSubmit, error } = props;
	return (
		<div className="h-screen w-full flex justify-center items-center">
			<div className="bg-image w-full sm:w-1/2 md:w-9/12 lg:w-1/2 mx-3 md:mx-5 lg:mx-0 shadow-md flex flex-col md:flex-row items-center rounded z-10 overflow-hidden bg-center bg-cover bg-indigo-50">
				<div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-opacity-25 bg-indigo-400 backdrop">
					<h1 className="text-3xl pt-3 md:text-4xl font-extrabold text-white my-2 md:my-0">
						litCollective
					</h1>
					{displayName === "Sign Up" ? (
						<p className="mb-2 text-white hidden md:block">join the gang</p>
					) : (
						<p className="mb-2 text-white hidden md:block">
							not a member?{" "}
							<Link className="text-indigo-400" to="/signup">
								join the gang
							</Link>
						</p>
					)}
				</div>
				<form
					className="w-full md:w-1/2 flex flex-col items-center bg-white py-5 md:py-8 px-4"
					onSubmit={handleSubmit}
					name={name}
				>
					<h1 className="mb-4 font-bold text-3xl flex items-center text-indigo-400">
						{displayName}
					</h1>
					{displayName === "Sign Up" && (
						<div>
							<div className="mb-3">
								<input
									className="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
									name="firstName"
									placeholder="first name"
									type="text"
									required
								/>
							</div>
							<div className="mb-3">
								<input
									className="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
									name="lastName"
									placeholder="last name"
									type="text"
									required
								/>
							</div>
						</div>
					)}
					<div className="mb-3">
						<input
							className="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
							id="email"
							name="email"
							placeholder="email"
							type="text"
							required
						/>
					</div>
					<div className="mb-3">
						<input
							className="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
							id="password"
							name="password"
							placeholder="password"
							type="password"
							required
						/>
					</div>
					<div className="mb-3">
						<button
							className="flex justify-center items-center bg-indigo-200 hover:bg-indigo-400 text-white focus:outline-none focus:ring rounded px-3 py-1"
							type="submit"
						>
							{displayName}
						</button>
					</div>
					{error && error.response && <div> {error.response.data} </div>}
					<a href="/auth/google">{displayName} with Google</a>
				</form>
			</div>
		</div>
	);
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
	return {
		name: "login",
		displayName: "Login",
		error: state.user.error
	};
};

const mapSignup = state => {
	return {
		name: "signup",
		displayName: "Sign Up",
		error: state.user.error
	};
};

const mapDispatch = dispatch => {
	return {
		handleSubmit(evt) {
			evt.preventDefault();
			const formName = evt.target.name;
			const email = evt.target.email.value;
			const password = evt.target.password.value;
			if (formName === "signup") {
				const firstName = evt.target.firstName.value;
				const lastName = evt.target.lastName.value;
				dispatch(auth(email, password, formName, firstName, lastName));
			} else {
				dispatch(auth(email, password, formName));
			}
		}
	};
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
	name: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	error: PropTypes.object
};
