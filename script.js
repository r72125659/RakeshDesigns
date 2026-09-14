/* =========================================
   RAKESH DESIGNS - MAIN JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       MOBILE MENU
       ===================================== */

    const menuIcon = document.getElementById("menuIcon");
    const navbar = document.querySelector(".navbar");

    if (menuIcon && navbar) {
        menuIcon.addEventListener("click", function () {
            navbar.classList.toggle("active");

            const icon = menuIcon.querySelector("i");

            if (navbar.classList.contains("active")) {
                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-xmark");
            } else {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }
        });
    }


    /* =====================================
       MOBILE DROPDOWN
       ===================================== */

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(function (dropdown) {

        const dropdownLink = dropdown.querySelector(":scope > a");

        if (dropdownLink) {
            dropdownLink.addEventListener("click", function (event) {

                if (window.innerWidth <= 768) {
                    event.preventDefault();

                    dropdown.classList.toggle("active");
                }
            });
        }
    });


    /* =====================================
       SEARCH BOX
       ===================================== */

    const searchIcon = document.getElementById("searchIcon");
    const searchBox = document.getElementById("searchBox");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    if (searchIcon && searchBox) {

        searchIcon.addEventListener("click", function (event) {
            event.stopPropagation();

            searchBox.classList.toggle("active");

            if (searchBox.classList.contains("active") && searchInput) {
                searchInput.focus();
            }
        });
    }


    /* =====================================
       SEARCH FUNCTION
       ===================================== */

    if (searchButton && searchInput) {

        searchButton.addEventListener("click", function () {
            performSearch();
        });

        searchInput.addEventListener("keypress", function (event) {

            if (event.key === "Enter") {
                performSearch();
            }

        });
    }

    function performSearch() {

        const searchValue = searchInput.value.trim().toLowerCase();

        if (searchValue === "") {
            alert("Please enter a product name.");
            return;
        }

        const productCards = document.querySelectorAll(".product-card");

        if (productCards.length > 0) {

            let found = false;

            productCards.forEach(function (card) {

                const productName =
                    card.querySelector("h3")?.textContent.toLowerCase() || "";

                const category =
                    card.querySelector(".product-category")?.textContent.toLowerCase() || "";

                if (
                    productName.includes(searchValue) ||
                    category.includes(searchValue)
                ) {
                    card.style.display = "";
                    found = true;

                    card.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                } else {
                    card.style.display = "none";
                }
            });

            if (!found) {
                alert("No products found for: " + searchValue);

                productCards.forEach(function (card) {
                    card.style.display = "";
                });
            }

        } else {

            alert("Search: " + searchValue);
        }
    }


    /* =====================================
       CLOSE SEARCH BOX
       ===================================== */

    document.addEventListener("click", function (event) {

        if (
            searchBox &&
            searchBox.classList.contains("active") &&
            !searchBox.contains(event.target) &&
            event.target !== searchIcon
        ) {
            searchBox.classList.remove("active");
        }

    });


    /* =====================================
       WISHLIST
       ===================================== */

    const wishlistButtons = document.querySelectorAll(".wishlist");

    wishlistButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const icon = button.querySelector("i");

            if (!icon) {
                return;
            }

            button.classList.toggle("active");

            if (button.classList.contains("active")) {

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

                alert("Product added to wishlist ❤️");

            } else {

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

                alert("Product removed from wishlist.");
            }

        });

    });


    /* =====================================
       SHOPPING CART
       ===================================== */

    let cart = JSON.parse(localStorage.getItem("rakeshCart")) || [];

    const cartButtons = document.querySelectorAll(".add-cart");

    cartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const card = button.closest(".product-card");

            if (!card) {
                return;
            }

            const name =
                card.querySelector("h3")?.textContent.trim() || "Product";

            const priceElement =
                card.querySelector(".price");

            const priceText =
                priceElement?.childNodes[0]?.textContent.trim() || "$0";

            const image =
                card.querySelector("img")?.getAttribute("src") || "";

            const product = {
                id: Date.now(),
                name: name,
                price: priceText,
                image: image
            };

            cart.push(product);

            localStorage.setItem(
                "rakeshCart",
                JSON.stringify(cart)
            );

            button.textContent = "Added ✓";

            setTimeout(function () {
                button.textContent = "Add to Cart";
            }, 1500);

        });

    });


    /* =====================================
       SORT PRODUCTS
       ===================================== */

    const sortSelect = document.querySelector(".filter-right select");

    if (sortSelect) {

        sortSelect.addEventListener("change", function () {

            const value = sortSelect.value;
            const productGrid = document.querySelector(".product-grid");

            if (!productGrid) {
                return;
            }

            const cards = Array.from(
                productGrid.querySelectorAll(".product-card")
            );

            if (value === "price-low") {

                cards.sort(function (a, b) {
                    return getPrice(a) - getPrice(b);
                });

            } else if (value === "price-high") {

                cards.sort(function (a, b) {
                    return getPrice(b) - getPrice(a);
                });

            } else if (value === "name") {

                cards.sort(function (a, b) {

                    const nameA =
                        a.querySelector("h3")?.textContent.toLowerCase() || "";

                    const nameB =
                        b.querySelector("h3")?.textContent.toLowerCase() || "";

                    return nameA.localeCompare(nameB);
                });

            }

            cards.forEach(function (card) {
                productGrid.appendChild(card);
            });

        });

    }


    /* =====================================
       GET PRODUCT PRICE
       ===================================== */

    function getPrice(card) {

        const priceElement = card.querySelector(".price");

        if (!priceElement) {
            return 0;
        }

        const priceText =
            priceElement.childNodes[0]?.textContent || "$0";

        return parseFloat(
            priceText.replace("$", "").replace(",", "")
        ) || 0;
    }


    /* =====================================
       NEWSLETTER
       ===================================== */

    const newsletterForms =
        document.querySelectorAll(".newsletter-form");

    newsletterForms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const emailInput =
                form.querySelector("input[type='email']");

            if (!emailInput) {
                return;
            }

            const email = emailInput.value.trim();

            if (email === "") {
                alert("Please enter your email address.");
                return;
            }

            if (!isValidEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            alert(
                "Thank you for subscribing to Rakesh Designs! 🎉"
            );

            emailInput.value = "";
        });

    });


    /* =====================================
       EMAIL VALIDATION
       ===================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    }


    /* =====================================
       WINDOW RESIZE
       ===================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768 && navbar) {

            navbar.classList.remove("active");

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }

            dropdowns.forEach(function (dropdown) {
                dropdown.classList.remove("active");
            });
        }

    });


    /* =====================================
       CLOSE MOBILE MENU AFTER LINK CLICK
       ===================================== */

    const navLinks =
        document.querySelectorAll(".navbar a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 768) {

                const isDropdownLink =
                    link.parentElement.classList.contains("dropdown");

                if (!isDropdownLink && navbar) {

                    navbar.classList.remove("active");

                    if (menuIcon) {
                        menuIcon.classList.remove("fa-xmark");
                        menuIcon.classList.add("fa-bars");
                    }
                }
            }

        });

    });


    /* =====================================
       SIMPLE PRODUCT HOVER EFFECT
       ===================================== */

    const productCards =
        document.querySelectorAll(".product-card");

    productCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.style.zIndex = "5";
        });

        card.addEventListener("mouseleave", function () {
            card.style.zIndex = "1";
        });

    });


    /* =====================================
       CONSOLE MESSAGE
       ===================================== */

    console.log(
        "Rakesh Designs website loaded successfully."
    );

});