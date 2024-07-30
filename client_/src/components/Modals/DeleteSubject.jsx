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
import { style } from "./style";
import {
  deleteSubject,
  getCurrentSubject,
  getSubjectsSelector,
  setSubjectId,
} from "../../store/slices/subjectSlice";
import { DELETE_SUBJECT } from "../../graphql/mutation/subject";

const DeleteSubject = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const subjects = useSelector(getSubjectsSelector);
  const currentSubject = useSelector(getCurrentSubject);

  const [deleteMutation] = useMutation(DELETE_SUBJECT);

  const deleteAction = () => {
    deleteMutation({
      variables: {
        id: currentSubject?.id,
      },
    })
      .then((data) => {
        dispatch(deleteSubject({ id: currentSubject?.id }));
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
          Delete subject by ID
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">ID</InputLabel>
            <Select
              labelId="select-label"
              id="teacher-select"
              value={currentSubject?.id}
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
          <Button variant="outlined" onClick={deleteAction}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteSubject;
