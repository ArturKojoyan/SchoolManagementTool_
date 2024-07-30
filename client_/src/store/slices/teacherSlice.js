import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [],
  currentTeacher: { id: "", name: "", surname: "" },
};

export const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeacherId: (state, action) => {
      const { id } = action.payload;
      state.currentTeacher = state.teachers.find((item) => item.id === id);
    },
    setTeacherName: (state, action) => {
      const { name } = action.payload;
      state.currentTeacher.name = name;
    },
    setTeacherSurname: (state, action) => {
      const { surname } = action.payload;
      state.currentTeacher.surname = surname;
    },

    setTeachers: (state, action) => {
      const { teachers } = action.payload;
      state.teachers = teachers;
    },
    addTeacher: (state, action) => {
      const { teacher } = action.payload;
      state.teachers.push(teacher);
    },
    editTeacher: (state, action) => {
      const { newTeacher } = action.payload;
      state.teachers = state.teachers.map((item) => {
        if (item.id === newTeacher.id) {
          return newTeacher;
        }
        return item;
      });
    },
    deleteTeacher: (state, action) => {
      const { id } = action.payload;
      state.teachers = state.teachers.filter((item) => item.id !== id);
    },
  },
});

export const getTeachersSelector = (state) => state.teacher.teachers;
export const getCurrentTeacher = (state) => state.teacher.currentTeacher;

export const {
  addTeacher,
  editTeacher,
  deleteTeacher,
  setTeachers,
  setTeacherId,
  setTeacherName,
  setTeacherSurname,
} = teacherSlice.actions;
export default teacherSlice.reducer;
