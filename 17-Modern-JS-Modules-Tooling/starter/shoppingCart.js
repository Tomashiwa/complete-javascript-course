console.log('Exporting module');

// Scoped to this module only (ie. private to this module)
const shippingCost = 10;
const cart = [];

// Exporting values
// Choose 1 of the methods below, mixing them is not recommended

// Export method 1 - Named export
// export DECLARATION or export {VARIABLE, ...}
// import {NAME_USED_IN_DECLARATION} from MODULE_NAME
// Export can only be done at top-level code (ie. not in any nesting)
// Usage: Multiple things to export from a module

// Exporting 1 value
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} has been added to cart`);
};
// Exporting >1 values
const totalPrice = 123;
const totalQuantity = 10;
export { totalPrice, totalQuantity, cart };

// Export method 2 - Default export
// Usage: Only 1 thing to export from a module
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} has been added to cart`);
}
