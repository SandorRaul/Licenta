export const getProductsclothes = () => async (dispatch) => {
  try {
    const data = await fetch("http://localhost:8005/getproductsclothes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    console.log(res);
    dispatch({ type: "SUCCESS_GET_PRODUCTS_CLOTHES", payload: res });
  } catch (error) {
    dispatch({ type: "FAIL_GET_PRODUCTS_CLOTHES", payload: error.response });
  }
};
