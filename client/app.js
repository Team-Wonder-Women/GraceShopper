import React from "react";
import { ToastProvider } from "react-toast-notifications";

import { Navbar } from "./components";
import Routes from "./routes";

const App = () => {
	return (
		<div className="bg-gradient-to-b from-indigo-50 via-indigo-100 to-indigo-200">
			<ToastProvider>
				<Navbar />
				<Routes />
			</ToastProvider>
		</div>
	);
};

export default App;
