import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjects: [],
  currentSubject: { id: "", name: "", grade: undefined },
};

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    setSubjectId: (state, action) => {
      const { id } = action.payload;
      state.currentSubject = state.subjects.find((item) => item.id === id);
    },
    setSubjectName: (state, action) => {
      const { name } = action.payload;
      state.currentSubject.name = name;
    },
    setSubjectGrade: (state, action) => {
      const { grade } = action.payload;
      state.currentSubject.grade = grade;
    },
    setSubjects: (state, action) => {
      const { subjects } = action.payload;
      state.subjects = subjects;
    },
    addSubject: (state, action) => {
      const { subject } = action.payload;
      state.subjects.push(subject);
    },
    editSubject: (state, action) => {
      const { newSubject } = action.payload;
      state.teachers = state.teachers.map((item) => {
        if (item.id === newSubject.id) {
          return newSubject;
        }
        return item;
      });
    },
    deleteSubject: (state, action) => {
      const { id } = action.payload;
      state.subjects = state.subjects.filter((item) => item.id !== id);
    },
  },
});

export const getSubjectsSelector = (state) => state.subject.subjects;
export const getCurrentSubject = (state) => state.subject.currentSubject;

export const {
  addSubject,
  setSubjects,
  deleteSubject,
  setSubjectId,
  setSubjectGrade,
  setSubjectName,
  editSubject,
} = subjectSlice.actions;
export default subjectSlice.reducer;
