import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartProduct, getUserCart, updateCartProduct } from "../features/user/userSlice";
import { base_url,config } from "../utils/axiosConfig";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from "react-toastify";
import axios from "axios";
const Cart = () => {
  const stripePromise = loadStripe('pk_test_51PLbOjRx1MID7VUPEYdxUvLTSBWMjTjoIfG8pEU6FP93a2Os19t7DAAtYcp3E0KKLYspyqhZUzNdwYQeHoOtojwO00e56rZMMj');

  const dispatch = useDispatch();
  const [prodctUpdateDetail, setProdctUpdateDetail] = useState(null)
  const [totalAmount, setTotalAmount] = useState(null)
  const userCartState = useSelector(state => state.auth.cartProducts)
  useEffect(() => {
    dispatch(getUserCart())
  }, [])
  useEffect(() => {
    if (prodctUpdateDetail !== null) {
      dispatch(updateCartProduct({ cartItemId: prodctUpdateDetail?.cartItemId, quantity: prodctUpdateDetail?.quantity }))
      setTimeout(() => {
        dispatch(getUserCart())
      }, 200)
    }
  }, [prodctUpdateDetail])
  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id))
    setTimeout(() => {
      dispatch(getUserCart())
    }, 200)
  }
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum = sum + (Number(userCartState[index].quantity) * userCartState[index].price)
      setTotalAmount(sum)

    }
  }, [userCartState])

  console.log(prodctUpdateDetail)

  const handleCheckout = async () => {
    // Prepare the data to send to the backend

    const cartItems =userCartState.map((item)=> {
      return{
        productId: item?.productId._id,
        quantity: item?.quantity,
      }
    })
    
    
    
    
  

    try {
      // Create Checkout Session by calling your backend
      const response = await axios.post(
        `${base_url}payments/create-checkout-session`,
        { products: cartItems },
        config // Pass your config object here
      );
    
      const { sessionId } = response.data;

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Stripe Checkout Error:', error);
        toast.error('Unable to redirect to Stripe Checkout.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Payment initiation failed. Please try again.');
    }
  };

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {
              userCartState && userCartState?.map((item, index) => {
                return (<div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                  <div className="cart-col-1 gap-15 d-flex align-items-center">
                    <div className="w-25">
                      <img src={item?.productId?.images[0]?.url} className="img-fluid" alt="product image" />
                    </div>
                    <div className="w-75">
                      <p>{item?.productId?.title}</p>

                      <p className="d-flex gap-3">Color:
                         <ul className="colors ps-0">
                        <li style={{ backgroundColor: item?.color.title }}></li>
                      </ul>
                      </p>
                      <p>
                      <span
                     className={`badge border border-1 cursor-pointer ${
                       'bg-white text-dark border-secondary'
                     }`}
                   >
                     {item?.diskSize}
                   </span>
                      </p>
                    </div>
                  </div>
                  <div className="cart-col-2">
                    <h5 className="price">$ {item?.price}</h5>
                  </div>
                  <div className="cart-col-3 d-flex align-items-center gap-15">
                    <div>
                      <input
                        className="form-control"
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        id=""
                        value={prodctUpdateDetail?.quantity ? prodctUpdateDetail?.quantity : item?.quantity}
                        onChange={(e) => { setProdctUpdateDetail({ cartItemId: item?._id, quantity: e.target.value }) }}
                      />
                    </div>
                    <div>
                      <AiFillDelete onClick={() => { deleteACartProduct(item?._id) }} className="text-danger " />
                    </div>
                  </div>
                  <div className="cart-col-4">
                    <h5 className="price">$ {item?.price * item?.quantity}</h5>
                  </div>
                </div>)
              })
            }

          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/" className="button">
                Continue To Shopping
              </Link>
              {
                (totalAmount !== null || totalAmount !== 0) &&
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: $ {totalAmount}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <div onClick={handleCheckout} className="button">
                    Checkout
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
