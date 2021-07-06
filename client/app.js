import React from "react";
import { ToastProvider } from "react-toast-notifications";

import { Navbar, NewNavbar } from "./components";
import Routes from "./routes";

const App = () => {
	return (
		<div className="font-body">
			<ToastProvider>
				<NewNavbar />
				<Routes />
			</ToastProvider>
		</div>
	);
};

export default App;
