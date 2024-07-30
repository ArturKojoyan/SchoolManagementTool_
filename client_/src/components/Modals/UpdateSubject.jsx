import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentTeacher,
  getTeachersSelector,
  setTeacherId,
} from "../../store/slices/teacherSlice";
import { style } from "./style";
import {
  editSubject,
  getCurrentSubject,
  getSubjectsSelector,
  setSubjectId,
  setSubjectName,
} from "../../store/slices/subjectSlice";
import { UPDATE_SUBJECT } from "../../graphql/mutation/subject";

const UpdateSubject = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const currentSubject = useSelector(getCurrentSubject);
  const currentTeacher = useSelector(getCurrentTeacher);
  const { id, name } = currentSubject || {};
  const { id: teacherId } = currentTeacher || {};
  const teachers = useSelector(getTeachersSelector);
  const subjects = useSelector(getSubjectsSelector);

  const [updateSubject] = useMutation(UPDATE_SUBJECT);

  const updateAction = () => {
    updateSubject({
      variables: {
        input: { id, name, teacherId },
      },
    })
      .then(({ data }) => {
        dispatch(editSubject({ newSubject: data.updateSubject }));
        handleClose();
      })
      .catch((err) => alert(`Please try again!`));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 1 }}
        >
          Update Subject by ID
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
          <FormControl fullWidth>
            <InputLabel id="select-label-1">Subject ID</InputLabel>
            <Select
              labelId="select-label-1"
              id="subject-select"
              value={id}
              label="ID"
              onChange={(e) => dispatch(setSubjectId({ id: e.target.value }))}
            >
              {subjects.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Input
            id="name-input"
            placeholder="New name"
            value={name}
            onChange={(e) => dispatch(setSubjectName({ name: e.target.value }))}
          />
          <FormControl fullWidth>
            <InputLabel id="select-label-2">Select new teacher id</InputLabel>
            <Select
              labelId="select-label-2"
              id="teacher-select"
              value={teacherId}
              label="ID"
              onChange={(e) => dispatch(setTeacherId({ id: e.target.value }))}
            >
              {teachers.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={updateAction}>
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateSubject;
