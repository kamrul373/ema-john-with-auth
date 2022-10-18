import React from 'react';
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
const Product = (props) => {
    const { id, img, name, price, quantity, stock, seller, ratings } = props.data;
    return (
        <div className='single-product'>
            <img src={img} alt={name} />
            <div className="product-info">
                <h3>{name}</h3>
                <p className='price'>Price: $<span>{price}</span> </p>
            </div>
            <div className="extra-info">
                <p className=''><small>Manufacturer : {seller}</small></p>
                <p><small>Rating : {ratings}</small></p>
                <button onClick={() => props.addToCart(props.data)}>Add to Cart  <FontAwesomeIcon icon={faCartPlus} /></button>
            </div>
        </div>
    );
};

export default Product;