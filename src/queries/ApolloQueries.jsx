import { gql } from "@apollo/client";

export const FETCH_CATEGORY = (productsName) => gql`
  query {
    category(input: {title: "${productsName}"}) {
        name
        products {
            id
            brand
            name
            inStock
            gallery
            category
            description
            attributes {
                id
                name
                type
                items {
                    id
                    value
                    displayValue
                }
            }
            prices {
                currency {
                    label
                    symbol
                }
                amount
            }
        }
    }
  }

`;
export const FETCH_CURRENCIES = gql`
  query {
    currencies {
        label
        symbol
    }
  }

`