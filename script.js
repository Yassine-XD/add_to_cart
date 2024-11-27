//let start
console.log("i am in charge now");

//prepare all variable we need
// let controlers = document.querySelectorAll(".quantity-controls");
// let addToCardButtons = document.querySelectorAll(".add-to-cart");
// let orders = [];

// //hide element with css class
// const hideElement = (element) => {
//   element.classList.add("hide");
//   console.log("we hide the element");
// };

// //appear quantity plus and minus button
// const appearQuantityControlers = (element) => {
//   element.classList.add("show");
//   console.log("controles showed");
// };

// addToCardButtons.forEach((button) => {
//   button.addEventListener("click", function (event) {
//     //get all products cards
//     const productElement = event.target.closest(".product-card");

//     //get controlers element and activate them
//     const cardControlers = event.target.querySelector(".quantity-controls");
//     console.log(cardControlers);

//     //get information of products
//     const productId = productElement.dataset.productId;
//     const productName = productElement.dataset.productName;
//     const productPrice = parseFloat(productElement.dataset.productPrice);

//     //check if the orders already exist
//     const existingProductIndex = orders.findIndex(
//       (item) => item.id === productId
//     );

//     //verify the order and add it or skip it
//     if (existingProductIndex === -1) {
//       orders.push({
//         id: productId,
//         name: productName,
//         price: productPrice,
//         quantity: 1,
//       });

//       //check
//       console.log(`The product ${productName} added to cart.`);
//     } else {
//       // Product already in cart, increase its quantity
//       orders[existingProductIndex].quantity += 1;
//       console.log(`Increased quantity of ${productName}.`);
//     }
//     console.log("Current Cart:", orders);
//     renderCart();
//   });
// });

// const renderCart = () => {
//   //get the cart section/order conatiner and clean it before start use it
//   const ordersContainer = document.querySelector(".cart-section");
//   ordersContainer.innerHTML = "";

//   //check if it's clean and add empty text
//   if (orders.length === 0) {
//     ordersContainer.innerHTML = `<h2>Your Cart (<span id="cart-count">0</span>)</h2>`;
//     return;
//   }

//   orders.forEach((item) => {
//     const order = document.createElement("li");
//     order.textContent = `${item.id} | ${item.name} - ${item.price} x ${item.quantity}`;

//     ordersContainer.appendChild(order);
//   });
// };

//prepare elements DOM Cash
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const controlers = document.querySelectorAll(".quantity-controls");
const quentityProduct = document.querySelectorAll("qty");
const minusButton = document.querySelectorAll("minus");
const plusButton = document.querySelectorAll("plus");
const products = document.querySelectorAll(".product-card");

//prepare variables
let orders = [];
let totalPrice = 0;

//add to cart event listner
for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", () => {
    createOrder(
      products[i].dataset.productId,
      products[i].dataset.productName,
      products[i].dataset.productPrice,
      1
    );
    console.log(orders);
    update();
  });
}

//create order
const createOrder = (id, name, price, quantity) => {
  orders.push({ id, name, price, quantity });
};

//update cart by re-render it with orders array
const update = () => {
  // get the cart section/order conatiner and clean it before start use it
  const ordersContainer = document.querySelector(".cart-section");
  ordersContainer.innerHTML = "";

  //check if it's clean and add empty text
  if (orders.length === 0) {
    ordersContainer.innerHTML = `<h2>Your Cart (<span id="cart-count">0</span>)</h2>`;
    return;
  }

  orders.forEach((item) => {
    const order = document.createElement("li");
    order.textContent = `${item.name} - ${item.price} x ${item.quantity}`;

    ordersContainer.appendChild(order);
  });
};

update();
