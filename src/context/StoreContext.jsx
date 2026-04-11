import React, { createContext, useContext, useReducer, useEffect } from 'react';

const StoreContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
  activePanel: null, // "cart" | "wishlist" | null
  searchQuery: "",
  cartAddedPulse: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(i => i.id === action.payload.id);
      let newCart;
      // Default to adding 1 quantity if undefined
      const addQty = action.payload.quantity || 1;
      
      if (existing) {
        newCart = state.cart.map(i => 
          i.id === action.payload.id ? { ...i, quantity: i.quantity + addQty } : i
        );
      } else {
        newCart = [...state.cart, { ...action.payload, quantity: addQty }];
      }
      return { ...state, cart: newCart, cartAddedPulse: true };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(i => 
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        )
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlist.some(i => i.id === action.payload.id);
      if (exists) {
        return { ...state, wishlist: state.wishlist.filter(i => i.id !== action.payload.id) };
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    }
    case 'CLEAR_WISHLIST':
      return { ...state, wishlist: [] };
    case 'SET_PANEL':
      return { ...state, activePanel: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'RESET_PULSE':
      return { ...state, cartAddedPulse: false };
    case 'REHYDRATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('fs_cart');
      const storedWishlist = localStorage.getItem('fs_wish');
      const hydratedData = {};
      if (storedCart) hydratedData.cart = JSON.parse(storedCart);
      if (storedWishlist) hydratedData.wishlist = JSON.parse(storedWishlist);
      
      if (Object.keys(hydratedData).length > 0) {
        dispatch({ type: 'REHYDRATE', payload: hydratedData });
      }
    } catch (e) {
      console.error("Failed to rehydrate state", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fs_cart', JSON.stringify(state.cart));
    localStorage.setItem('fs_wish', JSON.stringify(state.wishlist));
  }, [state.cart, state.wishlist]);

  useEffect(() => {
    if (state.cartAddedPulse) {
      const t = setTimeout(() => {
        dispatch({ type: 'RESET_PULSE' });
      }, 400); // match bounce sequence duration
      return () => clearTimeout(t);
    }
  }, [state.cartAddedPulse]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
