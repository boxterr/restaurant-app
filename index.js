import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
const cart = document.getElementById("cart")
const modal = document.getElementById("modal")
const cartItems = document.getElementById('cart-items')
let cartItemsHtml = ''
let totalPrice = document.getElementById('cart-total')
const custName = document.getElementById('customer-name')

document.addEventListener('click', function(e){
    console.log(e.target.id)
    
    if (e.target.id === "add-to-cart-btn" && cart.classList.contains("hidden")){
        cart.classList.toggle("hidden")
        renderCartItems(e.target.dataset.id)
    } else if (e.target.id === "add-to-cart-btn" && !cart.classList.contains("hidden")){
        renderCartItems(e.target.dataset.id)
    } else if (e.target.dataset.remove) {
        removeFromCart(e.target.id, e.target.dataset.remove)
    } else if (e.target.id === 'complete-order-btn') {
        modal.classList.toggle('hidden')
    } else if (e.target.id === 'close-btn') {
        modal.classList.toggle('hidden')
    } else if (e.target.id === "pay-btn") {
        e.preventDefault()
        let name = custName.value.split(/(\s+)/)
        renderAfterPay(name[0])
    }
})

function renderAfterPay(name) {
    let orderConfirmationHtml = `
        <div id="after-order">
            <p>Thanks, ${name}! Your order is on its way.</p>
        </div>
    `
    cart.innerHTML = orderConfirmationHtml
    modal.classList.toggle('hidden')
    
}

function getCartItemsHtml(foodEye) {
    let uuid = uuidv4()
    cartItemsHtml += `
                        <div id="${uuid}" class="added-items">
                            <div class="food-orders">
                                <h2>${menuArray[foodEye].name}</h2>
                                <p data-remove="${menuArray[foodEye].id}" id="${uuid}" class="remove">remove</p>
                            </div>
                            <div>
                                <h3>${menuArray[foodEye].price}</h3>
                            </div>
                        </div>
    `
    
    totalPrice.textContent = Number(totalPrice.textContent) + menuArray[foodEye].price
    return cartItemsHtml
}

function removeFromCart(id, arrayId) {
    totalPrice.textContent = Number(totalPrice.textContent) - menuArray[arrayId].price   
    if (Number(totalPrice.textContent) === 0) {
        cart.classList.toggle('hidden')
    } else {
        const element = document.getElementById(id);
        element.remove();
    }
}

function getMenuHtml() {
    let menuHtml = ''
    
    menuArray.forEach(function(foodItem){
        menuHtml += `
            <section class="food-list">
                <div class="food-item">
                    <div>
                    <p class="food-icon" data-id="${foodItem.id}">${foodItem.emoji}</p>
                    </div>
                    <div>
                        <h2 id="food-name" data-id="${foodItem.id}">${foodItem.name}</h2>
                        <p id="ingredients" data-id="${foodItem.id}">${foodItem.ingredients}</p>
                        <p id="price" data-id="${foodItem.id}">$${foodItem.price}</p>
                    </div>
                </div>
                <div>
                    <button id="add-to-cart-btn" data-id="${foodItem.id}">+</button>
                </div>
            </section>
        `
    })
    return menuHtml
}

function renderMenu() {
    const menu = document.getElementById('menu')
    menu.innerHTML = getMenuHtml()
}

function renderCartItems(foodIdx) {
    const cartItems = document.getElementById('cart-items')
    cartItems.innerHTML = getCartItemsHtml(foodIdx)
}

renderMenu()