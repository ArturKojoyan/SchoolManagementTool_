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
import { getSubjectsSelector } from "../store/slices/subjectSlice";
import ActionButtons from "./ActionButtons";
import { useState } from "react";
import CreateSubject from "./Modals/CreateSubject";
import UpdateSubject from "./Modals/UpdateSubject";
import DeleteSubject from "./Modals/DeleteSubject";

const SubjectsTable = () => {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const subjects = useSelector(getSubjectsSelector);

  return (
    <>
      <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
        Subjects Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "600" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Grade</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Teacher</TableCell>
              <TableCell align="right" sx={{ fontWeight: "600" }}>
                Pupils
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((row) => (
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
                <TableCell>
                  {row.teacher?.name} {row.teacher?.surname}
                </TableCell>
                <TableCell align="right">
                  {row.pupils?.map((pupil) => (
                    <Typography key={pupil?.id}>{pupil?.name} </Typography>
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
        deleteDisable
      />
      <CreateSubject open={showFirst} setOpen={setShowFirst} />
      <UpdateSubject open={showSecond} setOpen={setShowSecond} />
      <DeleteSubject open={showThird} setOpen={setShowThird} />
    </>
  );
};

export default SubjectsTable;
