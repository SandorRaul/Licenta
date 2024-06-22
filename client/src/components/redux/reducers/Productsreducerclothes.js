const productsclothes = [];

export const getProductsreducerclothes = (
  state = { productsclothes },
  action
) => {
  switch (action.type) {
    case "SUCCESS_GET_PRODUCTS_CLOTHES":
      return { productsclothes: action.payload };
    case "FAIL_GET_PRODUCTS_CLOTHES":
      return { productsclothes: action.payload };
    default:
      return state;
  }
};
