import React, { Component } from 'react'
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import { CartImage, Left, LeftArrow, Right, RightArrow } from '../pages/CartPage/CartPageStyle';

class ImageSlider extends Component {
  state = {
    index: 0,
  };

    sliderHandler = (number) => {
      

    if (number < 0) {
      return this.props.gallery.length - 1;
    }
    if (number > this.props.gallery.length - 1) {
      return 0;
    }

    return number;
  };

  buttonRightHandler = () => {
    let rightSlider = this.state.index + 1;
    this.setState({ index: this.sliderHandler(rightSlider) });
  };

  buttonLeftHandler = () => {
    let leftSlider = this.state.index - 1;
    this.setState({ index: this.sliderHandler(leftSlider) });
  };

   
  render() {

    const { gallery } = this.props
    
    return (
      <CartImage url={gallery[this.state.index]}>
        <Right
          onClick={this.buttonRightHandler}
          className={gallery.length === 1 && "controlIcon"}
        >
          <RightArrow src={rightArrow} alt="right arrow" />
        </Right>
        <Left
          onClick={this.buttonLeftHandler}
          className={gallery.length === 1 && "controlIcon"}
        >
          <LeftArrow src={leftArrow} alt="left arrow" />
        </Left>
      </CartImage>
    );
  }
}


export default ImageSlider
