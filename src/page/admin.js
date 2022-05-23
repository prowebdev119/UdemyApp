import React from "react";
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";

import CourseCard from "../components/course";

function AdminPage(props) {
  const [CourseDate, setCourseDate] = React.useState([]);

  React.useEffect(() => {
    console.log("Ssss");
    fetch("http://localhost:3000/courses/data.json")
      .then((date) => date.json())
      .then((data) => setCourseDate(data));
  }, []);

  return (
    <Container maxWidth="lg" mt={4}>
      <AppBar>
        <Toolbar>
          <Typography variant="h5">Course Admin</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Toolbar />
      <Grid container spacing={4}>
        {CourseDate.map((item, index) => {
          let completed = 0;
          for (let i = 0; i < item.status.length; i++)
            if (item.status[i]) completed++;
          return (
            <Grid item md={4} lg={4} sm={6} xs={12} xl={3}>
              <CourseCard
                title={item["name"]}
                id={index}
                percent={(completed * 100) / item.status.length}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default AdminPage;
