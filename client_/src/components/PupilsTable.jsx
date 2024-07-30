import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getPupilsSelector } from "../store/slices/pupilSlice";
import ActionButtons from "./ActionButtons";
import CreatePupil from "./Modals/CreatePupil";

const PupilsTable = () => {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const pupils = useSelector(getPupilsSelector);

  return (
    <>
      <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
        Pupils Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "600" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>First name</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Grade</TableCell>
              <TableCell align="right" sx={{ fontWeight: "600" }}>
                Subjects
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pupils.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.grade}</TableCell>
                <TableCell align="right">
                  {row.subjects?.map((subject) => (
                    <Typography key={subject?.id}>{subject?.name} </Typography>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ActionButtons
        setShowFirst={setShowFirst}
        setShowSecond={setShowSecond}
        setShowThird={setShowThird}
        updateDisable
        deleteDisable
      />
      <CreatePupil open={showFirst} setOpen={setShowFirst} />
    </>
  );
};

export default PupilsTable;
