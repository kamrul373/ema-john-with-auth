import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import { clearfullCart, removeCartItem } from '../../utilities/local';
import Cart from '../Cart/Cart';
import OrderItem from '../OrderItem/OrderItem';
import "./Orders.css";
const Orders = () => {
    const { products, initialCart } = useLoaderData();
    const [cart, setCart] = useState(initialCart);

    // delete button handler
    const handleDeleteCartItem = (id) => {
        const newCart = cart.filter(item => item._id !== id);
        setCart(newCart);
        // removing from localstorage
        removeCartItem(id);
    }
    // caler full cart

    const clearCart = () => {
        setCart([]);
        clearfullCart()
    }
    return (
        <div>
            <div className='shop-container'>
                <div className="order-container">
                    {
                        cart.map(product => <OrderItem
                            key={product._id}
                            product={product}
                            handleDeleteCartItem={handleDeleteCartItem}
                        ></OrderItem>)
                    }
                    {
                        cart.length === 0 && <h1>You have no item in your cart , Please continue <Link to="/shop">Shopping</Link> </h1>
                    }
                </div>
                <div className="cart-container">
                    <Cart clearCart={clearCart} cart={cart}>
                        <button className='review-order-btn'>
                            <Link to="/shipping">Prooceed to shipping</Link>
                        </button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Orders;