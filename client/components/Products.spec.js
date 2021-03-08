import chai, { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import chaiEnzyme from "chai-enzyme";
import React from "react";
import Products from "./Products";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());

describe("Products Component", () => {
	const products = [
		{
			id: 1,
			name: "oneCandle",
			description: "a pretty candle",
			price: 45,
			size: "3 oz"
		},
		{
			id: 2,
			name: "twoCandle",
			description: "a sick candle",
			price: 3475,
			size: "3 oz"
		},
		{
			id: 3,
			name: "threeCandle",
			description: "a superb candle",
			price: 574,
			size: "3 oz"
		}
	];

	it("renders a product name and price when passed in as a prop", () => {
		products.forEach(product => {
			const wrapper = shallow(<Products {...product} />);

			expect(wrapper.text()).to.include(product.name);
			expect(wrapper.text()).to.include((product.price / 100).toFixed(2));
		});
	});

	it("renders an 'Add to Cart' button", () => {
		products.forEach(product => {
			const wrapper = shallow(<Products {...product} />);

			expect(wrapper).to.have.descendants("button");
			expect(wrapper.text()).to.include("Add to Cart");
		});
	});
}); // end describe('User model')
