import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FETCH_NAV_DATA } from '../../queries/ApolloQueries';
import { currencyActions } from '../../redux/currencySlice';
import { uiActions } from '../../redux/UiSlice';
import navLogo from '../../assets/navLogo.svg'
import downIcon from '../../assets/downIcon.svg'
import cartIcon from '../../assets/cartIcon.svg'
import { ArrowIcon, CartBadge, CartButton, CartIcon, CurrencyButton, CurrencyContent, CurrencyDisplay, NavActions, NavContainer, NavIcon, Navigation, NavLink } from './NavStyles';
import { client } from '../../general';
import ModalItems from '../ModalItems/ModalItems';



class NavBar extends Component {
  constructor(props) {
    super(props);
    this.nav = React.createRef();
     this.state = {
       navData: [],
     };
  }
 

  fetchNavData = async () => {
    await client
      .query({
        query: FETCH_NAV_DATA,
      })
      .then((res) => this.setState({ navData: res.data }));
  };

  componentDidMount() {
    this.fetchNavData();
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

  navHandler = (e) => {

    if (e.target === this.nav.current) {
      this.props.onIsCurrencyVisible();
      this.props.onIsShowCartVisible();
    }
    
  };

  render() {
    const { currencyIsVisible, cartIsVisible } = this.props.ui;
    const { cartItems, currency , cartQty} = this.props;
    const {categories, currencies} = this.state.navData;
    // console.log(categories, currencies)
    return (
      <>
        <NavContainer ref={this.nav} onClick={this.navHandler}>
          <Navigation>
            {categories && categories.map((category, index ) => (
              
              <NavLink to={`/${category.name}`} key={index}>{category.name}</NavLink>
            ))}
          </Navigation>

          <NavIcon src={navLogo} alt="nav logo" />

          <NavActions>
            <CurrencyButton onClick={this.toggleCurrencyHandler}>
              <span>{currency.symbol}</span>
              <ArrowIcon src={downIcon} alt="dowm button" />
            </CurrencyButton>

            {currencyIsVisible && (
              <CurrencyDisplay>
                {currencies.map((currency, index) => (
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
                  <CartBadge>{cartQty}</CartBadge>
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
    cartQty: state.cart.totalQty,
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
