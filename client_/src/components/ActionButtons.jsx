import { Button } from "@mui/material";

const ActionButtons = ({
  setShowFirst,
  setShowSecond,
  setShowThird,
  updateDisable,
  deleteDisable,
}) => {
  return (
    <>
      <Button
        variant="contained"
        sx={{ mt: 1, mr: 1 }}
        onClick={() => setShowFirst(true)}
      >
        Create
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 1, mr: 1 }}
        onClick={() => setShowSecond(true)}
        disabled={updateDisable}
      >
        Update
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 1 }}
        onClick={() => setShowThird(true)}
        disabled={deleteDisable}
      >
        Delete
      </Button>
    </>
  );
};

export default ActionButtons;
