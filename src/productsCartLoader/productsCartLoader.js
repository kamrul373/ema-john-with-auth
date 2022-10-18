import { getStoreCart } from "../utilities/local";

const productsCartLoader = async () => {
    // getting products
    const productsData = await fetch("products.json");
    const products = await productsData.json();

    // getting cart
    const getCart = getStoreCart();

    const initialCart = [];

    // processing products data
    for (const id in getCart) {
        const addedProduct = products.find(product => product.id === id);
        if (addedProduct) {
            const quantity = getCart[id];
            addedProduct["quantity"] = quantity;
            initialCart.push(addedProduct);
        }

    }

    return { products: products, initialCart: initialCart };
}

export default productsCartLoader;