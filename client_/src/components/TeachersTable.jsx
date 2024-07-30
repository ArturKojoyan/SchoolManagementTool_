import {
  Button,
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
import { getTeachersSelector } from "../store/slices/teacherSlice";
import { useState } from "react";
import CreateTeacher from "./Modals/CreateTeacher";
import UpdateTeacher from "./Modals/UpdateTeacher";
import DeleteTeacher from "./Modals/DeleteTeacher";
import ActionButtons from "./ActionButtons";

const TeachersTable = () => {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  const teachers = useSelector(getTeachersSelector);

  return (
    <>
      <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
        Teachers Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "600" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>First name</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Last name</TableCell>
              <TableCell align="right" sx={{ fontWeight: "600" }}>
                Subjects
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((row) => (
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
                <TableCell>{row.surname}</TableCell>
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
      />
      <CreateTeacher open={showFirst} setOpen={setShowFirst} />
      <UpdateTeacher open={showSecond} setOpen={setShowSecond} />
      <DeleteTeacher open={showThird} setOpen={setShowThird} />
    </>
  );
};

export default TeachersTable;
