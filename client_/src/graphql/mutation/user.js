import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($input: UserInput) {
    register(input: $input) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: UserInput) {
    login(input: $input) {
      token
    }
  }
`;
