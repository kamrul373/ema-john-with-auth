const setCartDetailsLocally = (id) => {
    let shoppingCart = localStorage.getItem("shopping-cart");

    if (shoppingCart) {
        shoppingCart = JSON.parse(shoppingCart);
    } else {
        shoppingCart = {}
    }

    const quantity = shoppingCart[id];

    if (id in shoppingCart) {
        const newQuantity = quantity + 1;
        shoppingCart[id] = newQuantity;
    } else {
        shoppingCart[id] = 1;
    }

    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));

}
const getStoreCart = () => {
    let shoppingCart = localStorage.getItem("shopping-cart");

    if (shoppingCart) {
        shoppingCart = JSON.parse(shoppingCart);
    }
    return shoppingCart;
}

const removeCartItem = (id) => {
    let shoppingCart = localStorage.getItem("shopping-cart");
    if (shoppingCart) {
        shoppingCart = JSON.parse(shoppingCart);
        if (id in shoppingCart) {
            delete shoppingCart[id];
            localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
        }
    }
}

const clearfullCart = () => {
    localStorage.removeItem("shopping-cart");
}


export { setCartDetailsLocally, getStoreCart, removeCartItem, clearfullCart };