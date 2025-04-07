import axios from "axios";

const axiosinstance = axios.create({
  //local baseURL
  baseURL: "https://amazon-backend-qa1u.onrender.com/",

  // Deployed baseURL deployed on render
  // baseURL: "http://localhost:5000/",
});

export { axiosinstance };
