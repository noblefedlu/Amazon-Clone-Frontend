import React, { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import LayOut from "../../Components/LayOut/LayOut";
import style from "./Auth.module.css";
import { auth } from "../../Utility/firebase";
import {DataContext} from '../../components/DataProvider/DataProvider'
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import {ClockLoader } from "react-spinners";
import {Type} from '../../Utility/action.type'
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[error, setError] =useState("");
  const [user, dispatch] = useContext(DataContext)
  //console.log(user)
  const [loading, setLoading] = useState({signIn:false,signUp:false});
  const navigate = useNavigate();
  const navStateData = { state: { msg: "" } }; // Define navStateData
  
  
 // console.log(email, password);
 //const handleLogin = async (e) => {}
  const authHandler = async (e) => {
    e.preventDefault();
    if(e.target.name==="SignIn")  {
      setLoading({...loading, signIn:true})
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    //console.log(userCredential);
    dispatch({
      type: Type.SET_USER,
      user: userCredential.user,
    })
    
    setLoading({ ...loading, signIn: false })
    setError("")
    navigate(navStateData?.state?.redirect || "/");
  })
  .catch((error) => {
    //console.log(error)
    setError(error.message)
    setLoading({ ...loading, signIn: false })
    
  });
} else {
  setLoading({...loading, signUp:true})
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      dispatch({
type:Type.SET_USER,
user: userCredential.user,
      })
       
      setLoading({ ...loading, signUp: false })
      setError("")
       navigate(navStateData?.state?.redirect || "/");
    })
    .catch((error) => {
      //console.log(error);
      setError(error.message);
      setLoading({ ...loading, signUp: false })
     
    });
}
};
return (
  <section className={style.login}>
    {/* Logo */}
    <Link>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Logo"
      />
    </Link>

    {/*from */}
    <div className={style.login_container}>
      <h1>sign in</h1>
      {navStateData?.state?.msg && (
<small style={{
  color: 'red',
  padding: '10px',
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'center',
}}>{navStateData?.state?.msg}
</small>
)}

      <form action="">
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
          />
        </div>
        <button
          type="submit"
          onClick={authHandler}
          name="SignIn"
          className={style.loginSignIn_button}
        >
          {loading.signIn && <ClockLoader color={"#fff"} size={20} />}
          sign in
        </button>
      </form>
      <div className={style.form_footer}>
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>

        <button
          type="submit"
          onClick={authHandler}
          name="SignUp"
          className={style.login_registerButton}
        >
          {loading.signUp ? (
            <ClockLoader color={"#fff"} size={20} />
          ) : (
            "Create your Amazon account"
          )}
        </button>
       {/* {error && <small>{error}</small>}*/}
       {error &&
        (<small style={{color: 'red'}}>{error}</small>)}
      </div>
    </div>
  </section>
);
 }

export default Auth;
