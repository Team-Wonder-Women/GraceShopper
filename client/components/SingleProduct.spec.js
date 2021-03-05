import { expect } from "chai";
import React from "react";
import { Provider } from "react-redux";
import enzyme, { render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SingleProduct } from "./SingleProduct";
import store from "../store";

console.log(SingleProduct);

const adapter = new Adapter();
enzyme.configure({ adapter });

const match = { params: { id: 7 } };

describe("Single Product component", () => {
	let product = {
		id: 7,
		name: "Pretty Candle",
		description: "a pretty candle",
		price: 45.5,
		size: "3 oz"
	};
	let singleProductView;
	beforeEach(() => {
		singleProductView = render(
			<Provider store={store}>
				<SingleProduct match={match} singleProduct={product} />
			</Provider>
		);
	});

	console.log("singleProductView", singleProductView.find("div"));

	it("renders a single product", () => {
		expect(singleProductView.find("div").text().to.include("Pretty Candle"));
		expect(singleProductView.find("div").text().to.include("a pretty candle"));
		expect(
			singleProductView
				.find("div")
				.text()
				.to.include((product.price / 100).toFixed(2))
		);
	});
});
