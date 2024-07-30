import { gql } from "@apollo/client";

export const CREATE_SUBJECT = gql`
  mutation createSubject($input: CreateSubjectInput) {
    createSubject(input: $input) {
      id
      name
      grade
      teacherId
    }
  }
`;

export const UPDATE_SUBJECT = gql`
  mutation updateSubject($input: UpdateSubjectInput) {
    updateSubject(input: $input) {
      id
      name
      grade
      teacherId
    }
  }
`;

export const DELETE_SUBJECT = gql`
  mutation deleteSubject($input: ID) {
    deleteSubject(id: $input) {
      id
      name
      grade
      teacherId
    }
  }
`;
