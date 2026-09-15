document.addEventListener("DOMContentLoaded", () => {
    let count = 0;
    const cartCountElement = document.getElementById("cartCount");
    const cartButtons = document.querySelectorAll(".add-to-cart");

    cartButtons.forEach(button => {
        button.addEventListener("click", () => {
            count++;
            cartCountElement.textContent = count;
            alert("Item added to your cart!");
        });
    });
});