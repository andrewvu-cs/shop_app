export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = pid => {
  return { type: DELETE_PRODUCT, pid: pid };
};

export const createProduct = (title, description, imageUrl, price) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      description,
      imageUrl,
      price
    }
  };
};

export const updateProduct = (title, description, imageUrl, pid) => {
  return {
    type: UPDATE_PRODUCT,
    pid,
    productData: {
      title,
      description,
      imageUrl,
    }
  };
};
