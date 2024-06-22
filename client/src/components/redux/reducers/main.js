import { combineReducers } from "redux";
import { getProductsreducerclothes } from "./Productsreducerclothes";

const roootreducers = combineReducers({
  clothes: getProductsreducerclothes,
});

export default roootreducers;
