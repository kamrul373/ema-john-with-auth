import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import "./OrderItem.css";

const OrderItem = ({ product, handleDeleteCartItem }) => {
    //console.log(product);
    const { id, name, price, img, quantity } = product;
    return (
        <div className='order-item-container'>
            <img src={img} alt={name} />
            <div className="order-details">
                <div className="description">
                    <p className='title'>{name}</p>
                    <p>Price: <span className='price'>${price}</span></p>
                    <p>Quantity: <small className='quanity'>{quantity}</small></p>
                </div>
                <div className="btn-container">
                    <button onClick={() => handleDeleteCartItem(id)}>
                        <FontAwesomeIcon icon={faTrashAlt} className="deleteicon" ></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;