const offers = [
    { weight: "100 г",  sku: "01306", price: "326.40",  oldPrice: "349.20",  stock: "Много" },
    { weight: "500 г",  sku: "01307", price: "1432.00", oldPrice: "1646.00", stock: "Много" },
    { weight: "1000 г", sku: "01308", price: "2064.00", oldPrice: "2592.00", stock: "Много" },
    { weight: "5000 г", sku: "01309", price: "6320.00", oldPrice: "8710.00", stock: "Много" },
];

const template = document.getElementById("offer-template");
const offersList = document.getElementById("offers");
const cartButton = document.getElementById("cart-button");
const cartText = document.getElementById("cart-text");

let selectedIndex = 0;

function renderOffer(offer) {
    const li = template.content.cloneNode(true);

    li.querySelector(".product-card__weight").textContent = offer.weight;
    li.querySelector(".product-card__sku").textContent = `арт: ${offer.sku}`;
    li.querySelector(".product-card__price").textContent = `${offer.price} ₽`;
    li.querySelector(".product-card__price-old").textContent = `${offer.oldPrice} ₽`;
    li.querySelector(".product-card__stock-value").textContent = offer.stock;

    return li;
}

function renderOffers() {
    offersList.innerHTML = "";
    offers.forEach((offer) => offersList.appendChild(renderOffer(offer)));
    updateSelection();
}

function updateSelection() {
    const items = offersList.querySelectorAll(".product-card__offer-item");

    items.forEach((item, index) => {
        const isSelected = index === selectedIndex;
        item.classList.toggle("product-card__offer-item--selected", isSelected);
        item.setAttribute("aria-checked", String(isSelected));
    });
}

function selectOffer(index) {
    if (index < 0 || index >= offers.length || index === selectedIndex) return;
    selectedIndex = index;
    updateSelection();
}

function handleOffersClick(event) {
    const item = event.target.closest(".product-card__offer-item");
    if (!item) return;
    selectOffer([...offersList.children].indexOf(item));
}

function handleOffersKeydown(event) {
    const item = event.target.closest(".product-card__offer-item");
    if (!item) return;

    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectOffer([...offersList.children].indexOf(item));
    }
}

let cartResetTimer = null;

function handleAddToCart() {
    const offer = offers[selectedIndex];

    cartButton.classList.add("product-card__cart--added");
    cartText.textContent = `Добавлено: ${offer.weight}`;

    clearTimeout(cartResetTimer);
    cartResetTimer = setTimeout(() => {
        cartButton.classList.remove("product-card__cart--added");
        cartText.textContent = "В корзину";
    }, 1600);
}

renderOffers();

offersList.addEventListener("click", handleOffersClick);
offersList.addEventListener("keydown", handleOffersKeydown);
cartButton.addEventListener("click", handleAddToCart);
