import React, { Component } from 'react'
import { connect } from 'react-redux'
import { cartActions } from '../../redux/CartSlice'
import { withParams } from '../../general'
import { Attributes, Btn, Cart, CartButton, CartContent, CartImg, CartTotal, Content, Modal, ModalContainer, ModalContent, Name, PriceText, QtyBtn, QtyButton, Text, Total } from './ModalStyle'
import { InputLabel, ProductAttr, SpanText } from '../ProductDetails/ProductDetailsStyle'
import { uiActions } from '../../redux/UiSlice'

class ModalItems extends Component {
  
  onDecrementHandler = (qty, id) => {
    qty === 1 ? this.props.onItemRemove(id) : this.props.onDecrement(id)
  }
  
  totalPriceHandler = () => {
    let totalPrice = 0;
    this.props.cart.forEach(item => {
      const { prices } = item.product
      prices.forEach(price => {
       if( this.props.currency.label === price.currency.label )
         { totalPrice += price.amount * item.qty}
      })
    })
    return totalPrice.toFixed(2);
  }

  viewBagHandler = () => {
   this.props.onIsShowCartVisible();
   this.props.navigate('/cart')
  }

  checkOutHandler = () => {
    this.props.onIsShowCartVisible();
    this.props.navigate("/all");
    
  }

  
     render() {
       const { cart, currency} = this.props;
       

    return (
      <ModalContainer>
        <Modal>
          <ModalContent>
            <Text>
              <span>My Bag,</span>
              <span>
                {cart.length} {cart.length === 1 ? " item" : " items"}
              </span>
            </Text>

            <Content>
              {cart.map((item, index) => (
                <Cart key={index}>
                  <CartContent>
                    <div>
                      <Text>{item.product.brand}</Text>
                      <Text>{item.product.name}</Text>
                      <PriceText>
                        {item.product.prices.map(
                          (price) =>
                            price.currency.label === currency.label &&
                            `${price.currency.symbol} ${price.amount}`
                        )}
                      </PriceText>

                      <ProductAttr>
                        {item.product.attributes.map((attribute) => (
                          <Attributes key={attribute.id}>
                            <Name>{attribute.name} :</Name>
                            <div>
                              {attribute.items &&
                                attribute.items.map((attri, index) => (
                                  <InputLabel key={index}>
                                    <SpanText
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
                                    </SpanText>
                                  </InputLabel>
                                ))}
                            </div>
                          </Attributes>
                        ))}
                      </ProductAttr>
                    </div>
                    <QtyButton>
                      <QtyBtn
                        onClick={() => this.props.onIncrement(item.product.id)}
                      >
                        +
                      </QtyBtn>
                      <span>{item.qty}</span>
                      <QtyBtn
                        onClick={() =>
                          this.onDecrementHandler(item.qty, item.product.id)
                        }
                      >
                        -
                      </QtyBtn>
                    </QtyButton>
                  </CartContent>
                  <CartImg>
                    <img
                      src={item.product.gallery[0]}
                      alt={item.product.name}
                    />
                  </CartImg>
                </Cart>
              ))}
            </Content>
            <CartTotal>
              <span>Total</span>
              <Total>
                {this.props.currency.symbol}
                {this.totalPriceHandler()}
              </Total>
            </CartTotal>
          </ModalContent>
          <CartButton>
            <Btn onClick={this.viewBagHandler}>
              <span>View Bag</span>
            </Btn>
            <Btn order="true" onClick={this.checkOutHandler}>
              <span>Check Out</span>
            </Btn>
          </CartButton>
        </Modal>
      </ModalContainer>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        cart: state.cart.items,
        currency: state.currency,
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onIncrement: (item) => dispatch(cartActions.increment(item)),
      onDecrement: (item) => dispatch(cartActions.decrement(item)),
      onItemRemove: (item) => dispatch(cartActions.removeItemFromCart(item)),
      onIsShowCartVisible: () => dispatch(uiActions.isShowCartVisible()),
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(withParams(ModalItems))
