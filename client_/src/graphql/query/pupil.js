import { gql } from "@apollo/client";

export const GET_PUPILS = gql`
  query {
    getPupils {
      id
      name
      grade
      subjects {
        id
        name
      }
    }
  }
`;
