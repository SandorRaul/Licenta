const ProductsClothes = require("./models/productsSchemaClothes");
const produtsdataclothes = require("./constant/productsdataClothes");

const Interface = require("./models/interface");
const elements = require("./constant/frontendElements");

const DefaultData = async () => {
  try {
    await ProductsClothes.deleteMany({});
    await ProductsClothes.insertMany(produtsdataclothes);
    await Interface.deleteMany({});
    await Interface.insertMany(elements);
    // console.log(storeData);
  } catch (error) {
    console.log("error" + error.message);
  }
};

module.exports = DefaultData;
