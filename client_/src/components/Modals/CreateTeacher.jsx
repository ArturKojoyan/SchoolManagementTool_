import { useMutation } from "@apollo/client";
import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { CREATE_TEACHER } from "../../graphql/mutation/teacher";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeacher,
  getCurrentTeacher,
  setTeacherName,
  setTeacherSurname,
} from "../../store/slices/teacherSlice";
import { style } from "./style";

const CreateTeacher = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const currentTeacher = useSelector(getCurrentTeacher);
  const { name, surname } = currentTeacher || {};
  const [createTeacher] = useMutation(CREATE_TEACHER);

  const createAction = () => {
    createTeacher({
      variables: {
        input: { name, surname },
      },
    })
      .then(({ data }) => {
        dispatch(addTeacher({ teacher: data.createTeacher }));
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
          Create new teacher
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
          <Input
            placeholder="Enter name"
            value={name}
            onChange={(e) => dispatch(setTeacherName({ name: e.target.value }))}
          />
          <Input
            placeholder="Enter surname"
            value={surname}
            onChange={(e) =>
              dispatch(setTeacherSurname({ surname: e.target.value }))
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

export default CreateTeacher;
