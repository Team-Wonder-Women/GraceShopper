import React from "react";
import { ToastProvider } from "react-toast-notifications";

import { Navbar } from "./components";
import Routes from "./routes";

const App = () => {
	return (
		<div className="font-body">
			<ToastProvider>
				<Navbar />
				<Routes />
			</ToastProvider>
		</div>
	);
};

export default App;
