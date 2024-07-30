import { useMutation } from "@apollo/client";
import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {} from "../../store/slices/teacherSlice";
import { style } from "./style";
import { CREATE_PUPIL } from "../../graphql/mutation/pupil";
import {
  addPupil,
  getCurrentPupil,
  setPupilGrade,
  setPupilName,
} from "../../store/slices/pupilSlice";

const CreatePupil = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const currentPupil = useSelector(getCurrentPupil);
  const { name, grade } = currentPupil || {};

  const [createPupil] = useMutation(CREATE_PUPIL);

  const createAction = () => {
    createPupil({
      variables: {
        input: { name, grade },
      },
    })
      .then(({ data }) => {
        dispatch(addPupil({ pupil: data.createPupil }));
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
          Create new pupil
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
          <Input
            placeholder="Enter name"
            value={name}
            onChange={(e) => dispatch(setPupilName({ name: e.target.value }))}
          />
          <Input
            placeholder="Enter grade"
            type="number"
            value={grade}
            onChange={(e) =>
              dispatch(setPupilGrade({ grade: Number(e.target.value) }))
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

export default CreatePupil;
