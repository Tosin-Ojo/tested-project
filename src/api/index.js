import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

export const fetchProducts = () => API.get("/unreliable_products");
export const checkoutProducts = (basket) => API.post("/checkout", basket);
