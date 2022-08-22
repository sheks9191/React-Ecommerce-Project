import React, { Component } from 'react'
import { withParams } from '../../general';
import { connect } from 'react-redux';
import { uiActions } from '../../redux/UiSlice';
import ProductImg from '../../component/ProductDetails/ProductImg';
import ProductAttributes from '../../component/ProductDetails/ProductAttributes';
import { FETCH_PRODUCT_BY_ID } from '../../queries/ApolloQueries';
import { Query } from "react-apollo";
import { Error, Loading } from '../CategoryPage/CategoryPageStyle';




class ProductPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImg: "",
    };
  }
  

  selectedImgHandler = (e) => {
    this.setState({selectedImg:e.target.src})
  }
  render() {
     const { params } = this.props;
    //  console.log(params.productId);
    
    return (
      <Query query={FETCH_PRODUCT_BY_ID(params.productId)}>
        {({ loading, error, data }) => {
          if (loading) return <Loading>Loading...</Loading>;
          if (error) return <Error>Something went wrong...</Error>;

          if (!loading && !error) return (
            <div
              className="productPage"
              onClick={() => this.props.onIsCurrencyVisible()}
            >
              <ProductImg
                productImgs={data.product.gallery}
                updateSelectedImgs={this.selectedImgHandler}
                selectedImg={this.state.selectedImg}
              />
              <ProductAttributes product={data.product} />
            </div>
          );
        }}
      </Query>
    );
  }
}




const mapDispatchToProps = (dispatch) => {
  return {
    onIsCurrencyVisible: () => dispatch(uiActions.isCurrencyVisible()),
  };
};

export default connect(null,mapDispatchToProps)(withParams(ProductPage));
