
import React from "react";
import style from "./header.module.css";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from "./LowerHeader";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {DataContext} from '../DataProvider/DataProvider'
import {auth} from '../../Utility/firebase'
function Header() {
  const [{cart,user}, dispatch] = useContext(DataContext);
  const totalproduct=cart.reduce((sum,item)=>sum+item.amount,0)
  /*console.log(cart);*/
  
  return (
    <>
      <div className={style.fixed_Header}>
        <div className={style.header_container}>
          <div className={style.logo_container}>
            <Link to="/">
              <img
                src="https://www.pngplay.com/wp-content/uploads/3/White-Amazon-Logo-PNG-HD-Quality.png"
                alt=""
              />
            </Link>

            <div className={style.delivery}>
              <span>
                <SlLocationPin size={15} />
                {/*  <FaLocationDot />*/}
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={style.search}>
            <select name="" id="">
              <option value="">ALL</option>
              <option value="">Computer</option>
              <option value="">Book</option>
              <option value="">Electronics</option>
            </select>
            <input type="text" name="" id="" placeholder="Search Amazon" />
            <BsSearch size={37} />
          </div>
          <div className={style.order_container}>
            <a href="" className={style.language}>
              <div className={style.lang2}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                  alt=""
                />
                <select name="" id="">
                  <option value="en">EN</option>
                  <option value="am">አማ</option>
                </select>
              </div>
            </a>
            <Link to={ !user &&   "/Auth"}>
              <div className="">
               
                {
                  user ? (
                    <>       
                      <p>Hello  {user?.email?.split("@")[0]}</p>
                      <span onClick={()=>auth.signOut()} >Sign Out</span>
                    </>
                  ) : (
                    <>
                      <p>Hello, Sign In</p>
                      <span>Account & Lists</span>
                    </>
                  )
                }
              </div>
            </Link>
            <Link to="/Orders">
              <p>Returns</p>
              <span>&Orders</span>
            </Link>
            <Link to="/Cart" className={style.cart}>
              <BiCart size={35} />
              <span>{totalproduct}</span>
            </Link>
          </div>
        </div>
        <LowerHeader />
      </div>
    </>
  );
}

export default Header; 





