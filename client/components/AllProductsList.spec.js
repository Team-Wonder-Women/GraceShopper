// import chai, { expect } from "chai";
// import Enzyme, { mount, shallow } from "enzyme";
// import chaiEnzyme from "chai-enzyme";
// import sinonChai from "sinon-chai";
// import React from "react";
// import AllProductsList from "./AllProductsList";
// import { Provider } from "react-redux";
// import Adapter from "enzyme-adapter-react-16";
// import store from "../store";

// Enzyme.configure({ adapter: new Adapter() });

// chai.use(sinonChai);
// chai.use(chaiEnzyme());

// describe("AllProductsList Component", () => {
// 	const products = [
// 		{
// 			id: 1,
// 			name: "oneCandle",
// 			description: "a pretty candle",
// 			price: 45,
// 			size: "3 oz"
// 		},
// 		{
// 			id: 2,
// 			name: "twoCandle",
// 			description: "a sick candle",
// 			price: 3475,
// 			size: "3 oz"
// 		},
// 		{
// 			id: 3,
// 			name: "threeCandle",
// 			description: "a superb candle",
// 			price: 574,
// 			size: "3 oz"
// 		}
// 	];

// 	it("renders a Products component for every product we have in state", () => {
// 		const wrapper = shallow(
// 			<Provider store={store}>
// 				<AllProductsList />
// 			</Provider>
// 		);

// 		expect(wrapper).to.have.descendants("Products");
// 	});
// }); // end describe('User model')
