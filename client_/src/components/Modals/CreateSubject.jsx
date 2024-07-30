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
import { CREATE_SUBJECT } from "../../graphql/mutation/subject";
import {
  addSubject,
  getCurrentSubject,
  setSubjectGrade,
  setSubjectName,
} from "../../store/slices/subjectSlice";

const CreateSubject = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const currentTeacher = useSelector(getCurrentTeacher);
  const teachers = useSelector(getTeachersSelector);
  const { id: teacherId } = currentTeacher || {};

  const currentSubject = useSelector(getCurrentSubject);
  const { name, grade } = currentSubject || {};

  const [createSubject] = useMutation(CREATE_SUBJECT);

  const createAction = () => {
    createSubject({
      variables: {
        input: { name, grade, teacherId },
      },
    })
      .then(({ data }) => {
        dispatch(addSubject({ subject: data.createSubject }));
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
          Create new subject
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Select teacher id</InputLabel>
            <Select
              labelId="select-label"
              id="teacher-select"
              value={currentTeacher?.id}
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
          <Input
            placeholder="Enter name"
            value={name}
            onChange={(e) => dispatch(setSubjectName({ name: e.target.value }))}
          />
          <Input
            placeholder="Enter grade"
            type="number"
            value={grade}
            onChange={(e) =>
              dispatch(setSubjectGrade({ grade: Number(e.target.value) }))
            }
          />

          <Button variant="outlined" onClick={createAction}>
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateSubject;
