import { getStoreCart } from "../utilities/local";

const productsCartLoader = async () => {
    // getting products
    const productsData = await fetch("http://localhost:5000/products");
    const { products } = await productsData.json();

    // getting cart
    const getCart = getStoreCart();

    const initialCart = [];

    // processing products data
    for (const id in getCart) {
        const addedProduct = products.find(product => product._id === id);
        if (addedProduct) {
            const quantity = getCart[id];
            addedProduct["quantity"] = quantity;
            initialCart.push(addedProduct);
        }

    }

    return { products: products, initialCart: initialCart };
}

export default productsCartLoader;