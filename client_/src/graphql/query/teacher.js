import { gql } from "@apollo/client";

export const GET_TEACHERS = gql`
  query {
    getTeachers {
      id
      name
      surname
      subjects {
        id
        name
      }
    }
  }
`;
