import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProdcutCard from "../../components/Products/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/Currency";
import { Link } from "react-router-dom";
import style from "./cart.module.css";
import { Type } from "../../Utility/action.type";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
function Cart() {
  const [{ cart }, dispatch] = useContext(DataContext);
  /*console.log(state)*/
  const totalprice = cart.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );
  // console.log(totalprice)
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_CART,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_CART,
      id,
    });
  };
  return (
    <LayOut>
      <section className={style.cart_container}>
        <div className={style.item_container}>
          <h2>Hello</h2>
          <h3>Your Shoping Cart</h3>
          <hr />
          {cart?.lenght === 0 ? (
            <p>Oh! Your basket is empty, pls add item!</p>
          ) : (
            cart?.map((item, i) => {
              return (
                <section className={style.cart_product}>
                  <ProdcutCard
                    key={i}
                    data={item}
                    flex={true}
                    renderDesc={true}
                    renderADD={false}
                  />
                  <div className={style.cart_addsub}>
                    <button
                      className={style.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={35} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={style.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={35} />
                    </button>
                  </div>
                  {}
                </section>
              );
            })
          )}
        </div>
        {cart?.length !== 0 && (
          <div className={style.checkout_container}>
            <div>
              <p>SubTotal({cart?.length} items)</p>
              <CurrencyFormat amount={totalprice} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contain a gift</small>
            </span>
            <Link to="/payments">Proceed to Checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
