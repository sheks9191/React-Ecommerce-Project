import React, { Component } from 'react'
import { withParams } from '../../general';
import { connect } from 'react-redux';
import { uiActions } from '../../redux/UiSlice';
import ProductImg from '../../component/ProductDetails/ProductImg';
import ProductAttributes from '../../component/ProductDetails/ProductAttributes';


class ProductPage extends Component {
  state = {
    selectedImg: '',
  };

  selectedImgHandler = (e) => {
    this.setState({selectedImg:e.target.src})
  }
   render() {
    
     const { location } = this.props;
    //  console.log(location)
    return (
      <div className='productPage' onClick={() => this.props.onIsCurrencyVisible()}>
        <ProductImg
          productImgs={location.state.product.gallery}
          updateSelectedImgs={this.selectedImgHandler}
          selectedImg={this.state.selectedImg} />
        <ProductAttributes product={location.state.product} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIsCurrencyVisible: () => dispatch(uiActions.isCurrencyVisible()),
  };
};

export default connect(null,mapDispatchToProps)(withParams(ProductPage));
