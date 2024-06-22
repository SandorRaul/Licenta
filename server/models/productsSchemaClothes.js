const mongoose = require("mongoose");

const productsSchemaclothes = new mongoose.Schema({
    id:String,
    code:String,
    url:String,
    detailUrl:String,
    title:Object,
    price:Number,
    description:String,
    discount:Number,
    category:String,
    color: String,
    material : String,
    size : Object,
    gender:String
});

const ProductsClothes = new mongoose.model("productsclothes",productsSchemaclothes);

module.exports = ProductsClothes;