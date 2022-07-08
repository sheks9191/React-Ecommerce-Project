import React, { Component } from 'react'
import { cartActions } from '../../redux/CartSlice';
import { uiActions } from "../../redux/UiSlice";
import { connect } from 'react-redux';
import { Brand, InputLabel, Label, Name, Price, ProductAttr } from '../../component/ProductDetails/ProductDetailsStyle';
import { Attributes, Cart, Total } from '../../component/ModalItems/ModalStyle';
import { CartBtn, CartButton, CartElement, CartTitle, CartTotal, OrderButton, Quantity,Span,Tax } from './CartPageStyle';
import ImageSlider from '../../component/ImageSlider';
import { Container } from '../../generalStyles';
import { withParams } from '../../general';

class CartPage extends Component {
  
  onDecrementHandler = (qty, id) => {
    qty === 1 ? this.props.onItemRemove(id) : this.props.onDecrement(id);
  };

  totalPriceHandler = () => {
    let totalPrice = 0;
    this.props.cart.forEach((item) => {
      const { prices } = item.product;
      prices.forEach((price) => {
        if (this.props.currency.label === price.currency.label) {
          totalPrice += price.amount * item.qty;
        }
      });
    });
    return totalPrice.toFixed(2);
  };

  taxHandler = () => {
    return (this.totalPriceHandler() * 0.21).toFixed(2);
  };



  render() {
    const { cart, currency } = this.props;
    return (
      <Container onClick={() => this.props.onIsCurrencyVisible()}>
        <CartTitle>Cart</CartTitle>
        <section>
          {cart.map((item, index) => (
            <Cart key={index} border="true">
              <CartElement>
                <div>
                  <Brand>{item.product.brand}</Brand>
                  <Name>{item.product.name}</Name>
                  <Price cart="true">
                    {item.product.prices.map(
                      (price) =>
                        price.currency.label === currency.label &&
                        `${price.currency.symbol} ${price.amount}`
                    )}
                  </Price>

                  <ProductAttr>
                    {item.product.attributes.map((attribute) => (
                      <Attributes key={attribute.id}>
                        <Label style={{margin:'10px 0'}}>{attribute.name} :</Label>
                        <div>
                          {attribute.items &&
                            attribute.items.map((attri, index) => (
                              <InputLabel key={index}>
                                <Span
                                  value="true"
                                  selected={
                                    item.selectedAttr.find(
                                      (selectAttr) =>
                                        selectAttr.id === attribute.id
                                    ) &&
                                    item.selectedAttr.find(
                                      (selectAttr) =>
                                        selectAttr.id === attribute.id
                                    ).value === attri.value
                                  }
                                >
                                  {attri.displayValue}
                                </Span>
                              </InputLabel>
                            ))}
                        </div>
                      </Attributes>
                    ))}
                  </ProductAttr>
                </div>
                <CartButton>
                  <CartBtn
                    onClick={() => this.props.onIncrement(item.product.id)}
                  >
                    +
                  </CartBtn>
                  <span>{item.qty}</span>
                  <CartBtn
                    onClick={() =>
                      this.onDecrementHandler(item.qty, item.product.id)
                    }
                  >
                    -
                  </CartBtn>
                </CartButton>
              </CartElement>
              <ImageSlider gallery={item.product.gallery} />
            </Cart>
          ))}
        </section>

        <CartTotal>
          <div>
            <Tax>
              Tax 21%:{" "}
              <span>
                {" "}
                {this.props.currency.symbol}
                {this.taxHandler()}
              </span>
            </Tax>
            <Quantity>
              Quantity: <span>{cart.length}</span>
            </Quantity>
          </div>
          <div>
            <Total cart="true">
              <span>Total: </span>
              {this.props.currency.symbol}
              {this.totalPriceHandler()}
            </Total>
          </div>
          <OrderButton onClick={() => this.props.navigate("/all")}>
            <span>Order</span>
          </OrderButton>
        </CartTotal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.items,
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: (item) => dispatch(cartActions.increment(item)),
    onDecrement: (item) => dispatch(cartActions.decrement(item)),
    onItemRemove: (item) => dispatch(cartActions.removeItemFromCart(item)),
    onIsCurrencyVisible: () => dispatch(uiActions.isCurrencyVisible()),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withParams(CartPage))
