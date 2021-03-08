## code review 3/8/21

### Tier 1

_cart_

- add product to cart
- only the logged in user should be able to edit their cart
- edit quantity of product inside of cart

  _checkout_

- make appropriate db changes when checkout (change cart status to complete, edit product quantities)

  _create an account_

- add appropriate form with frontend validations (there is an auth/signup route already)

  _protect backend routes_

- add 'gatekeeper' function as middleware to express routes
- only admin should be able to see all users, put/post/delete products
- only user should be able to get/post/put/delete their cart

### Tier 2

_in progress_

- guest cart (check out local storage)
- admish dashboard

  _new_

- user profile with order history
- look into payment method options (Stripe for example)

### Other Notes

**Components**

- inconsistent use of state with React Hooks - choose one style to implement throughout

**General**

- delete all console.log statements
- delete commented out code
- delete unused code (such as unused imports)
- make commenting style consistent (in terms of formatting and how much files are commented)

**Models**

- is GuestCart a sequelize model? if not, I wouldn't store that file in db/models

**Routes**

- userCart: get("/:userId") why sending back {products:null} ?
- userCart: could write a utility fuction for calculating the cart total price to modularize the code

**Deployed Bugs/ Notes**

- cart icon change quantity without refresh
- notification (toast) for when successfully added to cart
