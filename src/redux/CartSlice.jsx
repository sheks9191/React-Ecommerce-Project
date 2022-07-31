import { createSlice} from "@reduxjs/toolkit";
// ...................................................................................


const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
    return a === b;
  if (a.prototype !== b.prototype) return false;
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
    return keys.every((k) => equals(a[k], b[k]));
    
};

// Reference
// https://sonikamaheshwari067.medium.com/compare-2-nested-objects-in-javascript-imp-42fa6a1fea14
// ......................................................................................

const initialCartState = {
    items: [],
    totalQty: 0,
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initialCartState,
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload

        //    console.log(newItem.selectedAttr);
               
            const existingItem = state.items.find(
                (item) =>     
                    equals(item.selectedAttr, newItem.selectedAttr)
            );

        
            state.totalQty++

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    product: newItem.product,
                    selectedAttr: newItem.selectedAttr,
                    qty:newItem.qty,
                })
            } else {
                existingItem.qty++

            }

        },
         
        removeItemFromCart(state, action) {
            const { payload } = action
            // console.log(payload)

             const existingItem = state.items.find(
               (item) =>
                 equals(item.selectedAttr, payload.selectedAttr)
             );
            state.totalQty--;
            if (existingItem.qty === 1) {
                state.items = state.items.filter((item) =>
                  !equals(item.selectedAttr, payload.selectedAttr)
                );
            } else {
                existingItem.qty--
            }
        },

        clearItemsFromCart(state) {
            return {
                ...state,
                items: [],
                totalQty:0,
            }
        }
    }}
)


export const cartActions = cartSlice.actions;
export default cartSlice;


