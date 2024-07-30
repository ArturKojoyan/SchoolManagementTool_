import { gql } from "@apollo/client";

export const CREATE_PUPIL = gql`
  mutation createPupil($input: CreatePupilInput) {
    createPupil(input: $input) {
      id
      name
      grade
    }
  }
`;

export const UPDATE_PUPIL = gql`
  mutation updatePupil($input: UpdatePupilInput) {
    updatePupil(input: $input) {
      id
      name
      grade
    }
  }
`;

export const DELETE_PUPIL = gql`
  mutation deletePupil($input: ID) {
    deletePupil(input: $input) {
      id
      name
      grade
    }
  }
`;
