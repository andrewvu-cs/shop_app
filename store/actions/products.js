import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    // any async code you want!
    try {
      const response = await fetch(
        "https://rn-shop-app-3dc69.firebaseio.com/products.json/"
      );

      // if we get 400 or 500 status codes
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].uid,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.uid === userId)
      });
    } catch (err) {
      //send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = pid => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shop-app-3dc69.firebaseio.com/products/${pid}.json?auth=${token}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Something wet wrong");
    }

    dispatch({ type: DELETE_PRODUCT, pid: pid });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // any async code you want!
    const response = await fetch(
      `https://rn-shop-app-3dc69.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          uid: userId
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        uid: userId
      }
    });
  };
};

export const updateProduct = (title, description, imageUrl, pid) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shop-app-3dc69.firebaseio.com/products/${pid}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      }
    );

    if (!response.ok) {
      throw new Error("Something wet wrong");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: pid,
      productData: {
        title,
        description,
        imageUrl
      }
    });
  };
};
