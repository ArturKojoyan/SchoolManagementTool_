import { gql } from "@apollo/client";

export const GET_SUBJECTS = gql`
  query {
    getSubjects {
      id
      grade
      name
      teacher {
        id
        name
        surname
      }
      pupils {
        id
        name
      }
    }
  }
`;
