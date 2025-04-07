import { Type } from "./action.type";

export const initialState = { cart: [] ,user :{}};
export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_CART:
      // is current item from user exist in basket? 10
      const isexist = state.cart.find((item) => item.id === action.item.id);
      if (!isexist) {
        return {
          ...state,
          cart: [...state.cart, { ...action.item, amount: 1 }],
        };
      } else {
        //basket={item1, amount=1} {item2,amount=2} {item3,amount=3}
        const updatedItems = state.cart.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
        return {
          ...state,
          cart: updatedItems,
        };
      }

    case Type.REMOVE_FROM_CART:
      const index = state.cart.findIndex((item) => item.id === action.id);

      let newCart = [...state.cart];
      if (index >= 0) {
        if (newCart[index].amount > 1) {
          newCart[index] = {
            ...newCart[index],
            amount: newCart[index].amount - 1,
          };
        } else {
          //let arr1=[1,2,7,8]
          //arr1.splice(2,1)
          newCart.splice(index, 1);
        }
      }
      return {
        ...state,
        cart: newCart,
      };
      case Type.EMPTY_CART:
        return {
          ...state,
          cart: [],
        };
      case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
