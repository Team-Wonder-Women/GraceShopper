/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from "./navbar";
export { default as UserHome } from "./user-home";
export { Login, Signup } from "./auth-form";
export { default as AllProductsList } from "./AllProductsList";
export { default as SingleProduct } from "./SingleProduct";
export { default as Confirmation } from "./Confirmation";
export { default as InsideCart } from "./InsideCart";
export { default as LandingPage } from "./LandingPage";
export { default as AdminDash } from "./AdminDash";
export { default as AddProduct } from "./AddProduct";
export { default as Checkout } from "./Checkout";
export { default as NewNavbar } from "./newNavbar";
