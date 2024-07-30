import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pupils: [],
  currentPupil: { id: "", name: "", grade: undefined },
};

export const pupilsSlice = createSlice({
  name: "pupil",
  initialState,
  reducers: {
    setPupilId: (state, action) => {
      const { id } = action.payload;
      state.currentPupil = state.pupils.find((item) => item.id === id);
    },
    setPupilName: (state, action) => {
      const { name } = action.payload;
      state.currentPupil.name = name;
    },
    setPupilGrade: (state, action) => {
      const { grade } = action.payload;
      state.currentPupil.grade = grade;
    },
    setPupils: (state, action) => {
      const { pupils } = action.payload;
      state.pupils = pupils;
    },
    addPupil: (state, action) => {
      const { pupil } = action.payload;
      state.pupils.push(pupil);
    },
    editPupil: (state, action) => {
      const { newPupil } = action.payload;
      state.pupils = state.teachers.map((item) => {
        if (item.id === newPupil.id) {
          return newPupil;
        }
        return item;
      });
    },
    deletePupil: (state, action) => {
      const { id } = action.payload;
      state.pupils = state.pupils.filter((item) => item.id !== id);
    },
  },
});

export const getPupilsSelector = (state) => state.pupil.pupils;
export const getCurrentPupil = (state) => state.pupil.currentPupil;

export const {
  addPupil,
  setPupils,
  deletePupil,
  setPupilId,
  editPupil,
  setPupilGrade,
  setPupilName,
} = pupilsSlice.actions;
export default pupilsSlice.reducer;
