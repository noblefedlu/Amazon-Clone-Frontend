import React, { useContext, useState } from "react";
import style from "./payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../components/Products/ProductCard";
import product from "../../components/Products/Products";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/Currency";
import { axiosinstance } from "../../API/axios";
import { ClockLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [{ user, cart }, dispatch] = useContext(DataContext);
  //console.log("user",user);
  //console.log("cart",cart);

  const totalamount = cart.reduce((amount, item) => item.amount + amount, 0);

  const total = cart.reduce((sum, item) => sum + item.price * item.amount, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handlpayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1
      //      backend  || function-------> contact to clint secret key
      const response = await axiosinstance({
        method: "post",
        url: `/payment/create?total=${total * 100}`,
      });

      //console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      console.log(clientSecret);

      // 2    clint side (react side conformation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // 3
      //    after confermation  ---------> order firestore database save,clear cart,redirect to order page

      await db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          cart: cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // empty the cart
      dispatch({ type: "EMPTY_CART" });

      setProcessing(false);
      navigate("/orders", { state: { msg: "order placed successfully" } });
    } catch (err) {
      //console.log(err);
      setProcessing(false);
    }
  };

  const handlchange = async (e) => {
    console.log(e);
    if (e.error) {
      setCardError(e.error.message);
    } else {
      setCardError(null);
    }
  };
  //console.log("payment");

  return (
    <LayOut>
      {/*Header*/}
      <div className={style.payment_header}>Chack out {totalamount} items</div>
      {/*payment method*/}
      <section className={style.payment_method}>
        {/* addres*/}
        <div className={style.address_flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>Zak@gmail.com </div>
            <div>Addis Ababa </div>
            <div>Ethiopia </div>
          </div>
        </div>
        <hr />

        {/*products */}
        <div className={style.address_flex}>
          <h3>Review items and Delivery</h3>
        </div>

        <div>
          {cart?.map((item) => (
            <ProductCard data={item} flex={true} />
          ))}
        </div>
        <hr />

        {/*card form */}
        <div className={style.address_flex}>
          <h3>payment method</h3>
          <div className={style.payment_card_container}>
            <div className={style.payment_details}>
              <form onSubmit={handlpayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "#fff" }}>{cardError}</small>
                )}
                {/* card */}
                <CardElement onChange={handlchange} />

                {/* price */}
                <div className={style.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "15px" }}>
                      Total Order | <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={style.loading_processing}>
                        <ClockLoader color={"#fff"} size={20} />
                        <p>please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}
export default Payment;
