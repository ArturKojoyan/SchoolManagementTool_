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
import { UPDATE_TEACHER } from "../../graphql/mutation/teacher";
import { useDispatch, useSelector } from "react-redux";
import {
  editTeacher,
  getCurrentTeacher,
  getTeachersSelector,
  setTeacherId,
  setTeacherName,
  setTeacherSurname,
} from "../../store/slices/teacherSlice";
import { style } from "./style";

const UpdateTeacher = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const currentTeacher = useSelector(getCurrentTeacher);
  const { id, name, surname } = currentTeacher || {};
  const teachers = useSelector(getTeachersSelector);
  const [updateTeacher] = useMutation(UPDATE_TEACHER);

  const updateAction = () => {
    updateTeacher({
      variables: {
        input: { id, name, surname },
      },
    })
      .then(({ data }) => {
        dispatch(editTeacher({ newTeacher: data.updateTeacher }));
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
          Update teacher by ID
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">ID</InputLabel>
            <Select
              labelId="select-label"
              id="teacher-select"
              value={id}
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
            id="name-input"
            placeholder="New name"
            value={name}
            onChange={(e) => dispatch(setTeacherName({ name: e.target.value }))}
          />
          <Input
            id="surname-input"
            placeholder="New surname"
            value={surname}
            onChange={(e) =>
              dispatch(setTeacherSurname({ surname: e.target.value }))
            }
          />
          <Button variant="outlined" onClick={updateAction}>
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateTeacher;
