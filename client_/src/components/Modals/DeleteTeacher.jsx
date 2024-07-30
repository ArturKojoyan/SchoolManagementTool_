import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { DELETE_TEACHER } from "../../graphql/mutation/teacher";
import {
  getCurrentTeacher,
  getTeachersSelector,
  setTeacherId,
} from "../../store/slices/teacherSlice";
import { deleteTeacher } from "../../store/slices/teacherSlice";
import { style } from "./style";

const DeleteTeacher = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const teachers = useSelector(getTeachersSelector);
  const currentTeacher = useSelector(getCurrentTeacher);

  const [deleteMutation] = useMutation(DELETE_TEACHER);

  const deleteAction = () => {
    deleteMutation({
      variables: {
        input: currentTeacher?.id,
      },
    })
      .then((data) => {
        dispatch(deleteTeacher({ id: currentTeacher?.id }));
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
          Delete teacher by ID
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">ID</InputLabel>
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
          <Button variant="outlined" onClick={deleteAction}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteTeacher;
