import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FETCH_CURRENCIES } from '../../queries/ApolloQueries';
import { currencyActions } from '../../redux/currencySlice';
import { uiActions } from '../../redux/UiSlice';
import navLogo from '../../assets/navLogo.svg'
import downIcon from '../../assets/downIcon.svg'
import cartIcon from '../../assets/cartIcon.svg'
import { ArrowIcon, CartBadge, CartButton, CartIcon, CurrencyButton, CurrencyContent, CurrencyDisplay, NavActions, NavContainer, NavIcon, Navigation, NavLink } from './NavStyles';
import { client } from '../../general';
import ModalItems from '../ModalItems/ModalItems';


class NavBar extends Component {
  
  state = {
    currencyData: [],
  };

  fetchCurrencies = async () => {
    await client
      .query({
        query: FETCH_CURRENCIES,
      })
      .then((res) => this.setState({ currencyData: res.data.currencies }));
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  updateCurrencyHandler = (currency) => {
    const { label, symbol } = currency;
    this.props.onUpdateCurrency({
      label,
      symbol,
    });

    this.props.onIsCurrencyVisible();
  };

  toggleCurrencyHandler = () => {
    this.props.onToggleCurrency();
    this.props.onIsShowCartVisible();
  };

  navHandler = () => {
    this.props.onIsCurrencyVisible();
    this.props.onIsShowCartVisible()
  }
  render() {
   
    const { currencyIsVisible, cartIsVisible } = this.props.ui;
    const { cartItems, currency } = this.props;
    const { currencyData } = this.state;
    return (
      <>
        <NavContainer>
          <Navigation onClick={this.navHandler}>
            <NavLink to="/all">ALL</NavLink>
            <NavLink to="/clothes">CLOTHES</NavLink>
            <NavLink to="/tech">TECH</NavLink>
          </Navigation>

          <NavIcon src={navLogo} alt="nav logo" />

          <NavActions>
            <CurrencyButton>
              <span>{currency.symbol}</span>
              <ArrowIcon
                src={downIcon}
                alt="dowm button"
                onClick={this.toggleCurrencyHandler}
              />
            </CurrencyButton>

            {currencyIsVisible && (
              <CurrencyDisplay>
                {currencyData.map((currency, index) => (
                  <CurrencyContent
                    key={index}
                    id={currency.label}
                    onClick={() => this.updateCurrencyHandler(currency)}
                  >
                    <span>{currency.symbol}</span>
                    <span>{currency.label}</span>
                  </CurrencyContent>
                ))}
              </CurrencyDisplay>
            )}

            <CartButton>
              <div onClick={() => this.props.onToggleCart()}>
                <CartIcon src={cartIcon} alt="cart icon" />
                {cartItems.length > 0 && (
                  <CartBadge>{cartItems.length}</CartBadge>
                )}
              </div>

              {cartIsVisible && <ModalItems />}
            </CartButton>
          </NavActions>
        </NavContainer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currency: state.currency,
    cartItems: state.cart.items,
    ui:state.ui
   }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateCurrency: (currency) => dispatch(currencyActions.updateCurrency(currency)),
    onToggleCurrency: () => dispatch(uiActions.toggleCurrency()),
    onToggleCart: () => dispatch(uiActions.toggleCart()),
    onIsShowCartVisible: () => dispatch(uiActions.isShowCartVisible()),
    onIsCurrencyVisible: () => dispatch(uiActions.isCurrencyVisible())
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);
