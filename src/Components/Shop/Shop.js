import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import { clearfullCart, getStoreCart, setCartDetailsLocally } from '../../utilities/local';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css";
const Shop = () => {
    // product state
    const products = useLoaderData();
    // cart state
    const [cart, setCart] = useState([]);
    // fetcing products
    // useEffect(() => {
    //     fetch("products.json")
    //         .then(response => response.json())
    //         .then(products => setProducts(products));
    // }, []);
    // state for localstorage

    // clear cart
    const clearCart = () => {
        setCart([]);
        clearfullCart()
    }

    useEffect(() => {
        const storeCart = getStoreCart();
        const savedCart = [];
        for (const id in storeCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storeCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
                //console.log(addedProduct)
            }
        }
        setCart(savedCart);
    }, [products])
    // add to cart event handler
    const addToCart = (product) => {
        let newCart = [];
        // checking initally if product in cart or not to update quanity
        const isProductExistInCart = cart.find(item => item.id === product.id)
        if (!isProductExistInCart) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            const restProducts = cart.filter(item => item.id !== product.id);
            product.quantity = product.quantity + 1;
            newCart = [...restProducts, product];
        }

        setCart(newCart);
        setCartDetailsLocally(product.id);
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product data={product} key={product.id} addToCart={addToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                    <button className='review-order-btn'>
                        <Link to="/orders">Review Order</Link>
                    </button>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;