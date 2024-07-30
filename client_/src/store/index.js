import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import teacherReducer from "./slices/teacherSlice";
import subjectReducer from "./slices/subjectSlice";
import pupilReducer from "./slices/pupilSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    teacher: teacherReducer,
    subject: subjectReducer,
    pupil: pupilReducer,
  },
});
