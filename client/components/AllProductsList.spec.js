// // /* global describe beforeEach it */

// import { expect } from "chai";
// import React from "react";
// import { Router } from "react-router-dom";
// import enzyme, { shallow, mount } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// import Products from "./Products";
// import AllProductsList from "./AllProductsList";

// const adapter = new Adapter();
// enzyme.configure({ adapter });

// describe("Products component", () => {
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

// 	it("renders a list of products", () => {
// 		const wrapper = shallow(
// 			<Router>
// 				<Products products={products} />
// 			</Router>
// 		);
// 		console.log(typeof wrapper);
// 		expect(wrapper.html()).to.include("oneCanlde");
// 		// expect(wrapper).to.include.text('twoCanlde');
// 		// expect(wrapper).to.include.text('threeCanlde');
// 	});
// });

// // describe('UserHome', () => {
// //   let userHome

// //   beforeEach(() => {
// //     userHome = shallow(<UserHome email="cody@email.com" />)
// //   })

// //   it('renders the email in an h3', () => {
// //     expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
// //   })
// // })
