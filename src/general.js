import { ApolloClient, InMemoryCache} from "@apollo/client";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});


export const withParams = (Component) => {
  return (props) => (
    <Component
      {...props}
      location = {useLocation()}
      navigate = {useNavigate()}
      params = {useParams()}
    />
  );
}
