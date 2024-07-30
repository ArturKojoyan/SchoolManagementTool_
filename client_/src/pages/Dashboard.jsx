import { useDispatch } from "react-redux";
import SubjectsTable from "../components/SubjectsTable";
import TeachersTable from "../components/TeachersTable";
import { useQuery } from "@apollo/client";
import { GET_TEACHERS } from "../graphql/query/teacher";
import { GET_SUBJECTS } from "../graphql/query/subject";
import PupilsTable from "../components/PupilsTable";
import { GET_PUPILS } from "../graphql/query/pupil";
import { useEffect } from "react";
import { setTeachers } from "../store/slices/teacherSlice";
import { setSubjects } from "../store/slices/subjectSlice";
import { setPupils } from "../store/slices/pupilSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { data: teachersData, loading } = useQuery(GET_TEACHERS);
  const { data: subjectsData, loading: subjectsLoading } =
    useQuery(GET_SUBJECTS);
  const { data: pupilsData, loading: pupilsLoading } = useQuery(GET_PUPILS);

  useEffect(() => {
    if (!loading) {
      dispatch(setTeachers({ teachers: teachersData?.getTeachers }));
    }
  }, [teachersData?.getTeachers, dispatch, loading]);

  useEffect(() => {
    if (!subjectsLoading) {
      dispatch(setSubjects({ subjects: subjectsData?.getSubjects }));
    }
  }, [dispatch, subjectsData?.getSubjects, subjectsLoading]);

  useEffect(() => {
    if (!pupilsLoading) {
      dispatch(setPupils({ pupils: pupilsData?.getPupils }));
    }
  }, [dispatch, pupilsData?.getPupils, pupilsLoading]);

  if (loading || subjectsLoading || pupilsLoading) {
    return <div>isLoading</div>;
  }

  return (
    <div>
      <TeachersTable />
      <SubjectsTable />
      <PupilsTable />
    </div>
  );
};

export default Dashboard;
