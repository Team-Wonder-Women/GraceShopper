import { expect } from "chai";
import React from "react";
import { Provider } from "react-redux";
import enzyme, { shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SingleProduct from "./SingleProduct";
import store from "../store";

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

	it("renders a single product", () => {
		expect(singleProductView.find("div").text().to.include("Pretty Candle"));
		expect(singleProductView.find("div").text().to.include("a pretty candle"));
		expect(
			singleProductView
				.find("div")
				.text()
				.to.include((product.price / 100).toFixed(2))
		);
		expect(product.imageUrl).to.be.a("string");
		expect(product.imageUrl.length).to.be.greaterThan(1);
	});
});
