import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
  top: 4.5rem;
 
`;

export const Modal = styled.div`
  z-index: 100;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;
  gap: 32px;
  position: absolute;
  width: 325px;
  left: 1043px;
`;

export const Text = styled.div`
  width: 165px;
  height: 26px;

  span:nth-of-type(1) {
    font-weight: 700;
    font-size: 16px;
    text-align: right;
    line-height: 25.6px;
    color: var(--textColor);
    font-family: "Raleway", sans-serif;
    margin-right: 5px;
  }

`;

export const PriceText = styled.div`
  width: 165px;
  height: 26px;
  font-weight: 500;
  font-size: 16px;
  line-height: 160%;
`;



export const ModalContent = styled.div`
  width: 293px;
  margin-top: 32px;
 
`;

export const Content = styled.div`
  width: 299px;
  margin-top: 58px;
  max-height:20rem;
  overflow-y: scroll;
`;

export const Cart = styled.div`
  display: flex;
  margin-bottom: 1rem;
  width: 100%;
  justify-content: space-between;
 
  ${({ border }) => {
  if (border) {
    return `
    
     border-top: 1px solid #e5e5e5;
     border-bottom: 1px solid #e5e5e5;
     padding: 1rem 0;
    `;
  }
  }}
`;

export const CartContent = styled.div`
   display:flex;

`;

export const Attributes = styled.div`


`;

export const Name = styled.div`


`;

export const QtyButton = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 5px;

  span {
    text-align: center;
    width: 9px;
    height: 26px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 160%;
    color: var(--textColor);
  }
`;

export const QtyBtn = styled.button`
  cursor: pointer;
  width: 24px;
  height: 24px;
  border: 1px solid var(--textColor);
`;

export const CartImg = styled.button`
  width: 121px;
  height: 190px;
  border:none;
`;

export const CartTotal = styled.div`
  width: 100%;
  display: flex;
  height: 28px;
  align-items: center;
  justify-content: space-between;

  span {
    font-weight: 500;
    font-family: "Roboto";
  }
`;

export const Total = styled.div`
  height: 19px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;

  ${({ cart }) => {
  if (cart) {
    return `
  font-style: normal;
  height:24px;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: right;
  color:var(--textColor);

  span {
    font-weight: 500;
     height:28px;
     margin-right: 5px;
  }
    `;
  }
  }}
`;

export const CartButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 43px;
`;


export const Btn = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  width: 140px;
  height: 43px;
  background: #ffffff;
  border: 1px solid #1d1f22;

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    width: 89px;
    height: 17px;
    text-transform: uppercase;
  }

  ${({ order }) => {
    if (order) {
      return `
     color:#fff;
     border:none;
     background:var(--c-primary);
  
      `
  }}}
`;