

// // Function to add an item to the cart and update the table
// function addItemToCart(medicineName, price, quantityInputId) {
//     // Get the quantity from the input field
//     const quantity = parseInt(document.getElementById(quantityInputId).value);
  
//     // Retrieve the current cart data from localStorage
//     let cart = JSON.parse(localStorage.getItem("cartData")) || [];
  
//     // Check if the item already exists in the cart
//     const existingItemIndex = cart.findIndex(item => item.name === medicineName);
  
//     if (existingItemIndex !== -1) {
//       // Update the quantity of the existing item
//       cart[existingItemIndex].quantity += quantity;
//       cart[existingItemIndex].totalPrice = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
//     } else {
//       // Add new item to the cart
//       cart.push({
//         name: medicineName,
//         price: price,
//         quantity: quantity,
//         totalPrice: price * quantity
//       });
//     }
  
//     // Save the updated cart in localStorage
//     localStorage.setItem("cartData", JSON.stringify(cart));
  
//     // Update the cart table with the new data
//     updateCartTable();
//   }
  
//   // Function to update the cart table based on localStorage
//   function updateCartTable() {
//     // Get the table body element
//     const cartTableBody = document.querySelector("#cartTable tbody");
//     cartTableBody.innerHTML = ""; // Clear the table before appending new rows
  
//     // Retrieve cart data from localStorage
//     const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  
//     // Loop through the cart data and append each item as a new row in the table
//     cartData.forEach(item => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${item.name}</td>
//         <td>LKR ${item.price}</td>
//         <td>${item.quantity}</td>
//         <td>LKR ${item.totalPrice}</td>
//       `;
//       cartTableBody.appendChild(row);
//     });
  
//     // Calculate and display the total price
//     const totalPrice = cartData.reduce((sum, item) => sum + item.totalPrice, 0);
//     document.getElementById("totalPrice").textContent = `Total: LKR ${totalPrice.toFixed(2)}`;
//   }
  
//   // Update the table when the page loads
//   document.addEventListener("DOMContentLoaded", updateCartTable);
  
// Array to store cart items
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// Retrieve favorites data from localStorage or initialize empty array
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to scroll to the cart section
function scrollToCart() {
    const cartSection = document.getElementById('cart-section');
    cartSection.scrollIntoView({ behavior: 'smooth' }); 
}


// Add items to cart
function addToCart(name, price, qtyId) {
    const quantity = parseInt(document.getElementById(qtyId).value);
    if (quantity > 0) {
        // Check if the item already exists in the cart
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }

    
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart display
        displayCart();

        alert(`${name} added to the cart.`);
    } else {
        alert("Please enter a valid quantity.");
    }
}
function displayCart() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    // Clear existing cart table rows
    cartTableBody.innerHTML = '';

 
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>LKR ${item.price}</td>
            <td>${item.quantity}</td>
            <td>LKR ${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;

        cartTableBody.appendChild(row);
    });


    cartTotal.textContent = `LKR ${total.toFixed(2)}`;
}
// Remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCart(); // Re-render the cart table
}