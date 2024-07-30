import { gql } from "@apollo/client";

export const CREATE_TEACHER = gql`
  mutation createTeacher($input: CreateTeacherInput) {
    createTeacher(input: $input) {
      id
      name
      surname
    }
  }
`;

export const UPDATE_TEACHER = gql`
  mutation updateTeacher($input: UpdateTeacherInput) {
    updateTeacher(input: $input) {
      id
      name
      surname
    }
  }
`;

export const DELETE_TEACHER = gql`
  mutation deleteTeacher($input: ID) {
    deleteTeacher(input: $input) {
      id
      name
      surname
    }
  }
`;
