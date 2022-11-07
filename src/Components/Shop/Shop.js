import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import { clearfullCart, getStoreCart, setCartDetailsLocally } from '../../utilities/local';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css";
const Shop = () => {
    // product state
    //const { products, count } = useLoaderData();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);

    const [productsPerPage, setProductsPerPage] = useState(10);
    const numberOfPage = Math.ceil(count / productsPerPage);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&size=${productsPerPage}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                setCount(data.count);
            })
    }, [currentPage, productsPerPage])

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
        const ids = Object.keys(storeCart);
        //console.log(ids);
        fetch("http://localhost:5000/productsById", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(ids)

        })
            .then(response => response.json())
            .then(data => {
                const savedCart = [];
                for (const id in storeCart) {
                    const addedProduct = data.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storeCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                        //console.log(addedProduct)
                    }
                }
                setCart(savedCart);
            })

    }, [products])
    // add to cart event handler
    const addToCart = (product) => {
        let newCart = [];
        // checking initally if product in cart or not to update quanity
        const isProductExistInCart = cart.find(item => item._id === product._id)
        if (!isProductExistInCart) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            const restProducts = cart.filter(item => item._id !== product._id);
            product.quantity = product.quantity + 1;
            newCart = [...restProducts, product];
        }

        setCart(newCart);
        setCartDetailsLocally(product._id);
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product data={product} key={product._id} addToCart={addToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                    <button className='review-order-btn'>
                        <Link to="/orders">Review Order</Link>
                    </button>
                </Cart>
            </div>
            <div className='pagination-container'>
                <p>Currnetly selected page : {currentPage}</p>
                {
                    [...Array(numberOfPage).keys()].map(number => <button
                        onClick={() => setCurrentPage(number)}
                        className={`${currentPage === number && "active"}`}
                        key={number}>{number + 1}
                    </button>)
                }
                <select onChange={(e) => {

                    setProductsPerPage(e.target.value)
                }
                }>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;