import { createSlice} from "@reduxjs/toolkit";


const initialCartState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initialCartState,
    reducers: {
        addItemToCart(state, action) {
            const { product, selectedAttr, qty } = action.payload;
        // console.log(selectedAttr)
            const newItem = {
                product,
                selectedAttr,
                qty,
            };

            const existingItem = state.items.find((item) => item.id === newItem.product.id);

            if (!existingItem) {
                state.items.push(newItem);
            } else {
                existingItem.qty += newItem.qty;
            }
        },
        
        increment(state, action) { 
            return {
                ...state,
                items: state.items.map(item => item.product.id === action.payload ?
                    { ...item, qty: item.qty + 1 } : item)
          }
        },

        decrement(state, action) { 
              return {
                ...state,
                items: state.items.map((item) =>
                  item.product.id === action.payload
                    ? { ...item, qty: item.qty - 1 }
                    : item
                ),
              };
        },
        removeItemFromCart(state, action) {

         return {
                ...state,
                items: state.items.filter(item => item.product.id !== action.payload),
            }
         },
    }
})


export const cartActions = cartSlice.actions;
export default cartSlice;


