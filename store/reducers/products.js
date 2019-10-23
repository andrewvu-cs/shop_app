import PRODUCTS from '../../data/product-data';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.uid === 'u1')
};

export default(state = initialState, action) => {
    return state;
};