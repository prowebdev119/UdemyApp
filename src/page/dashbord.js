import React, { useState } from "react";
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
} from "@material-ui/core";
import ReactAwesomePlayer from "react-awesome-player";
import Checkbox from "@material-ui/core/Checkbox";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VideoPlayerMake = (props) => {
  return (
    <>
      <ReactAwesomePlayer
        options={{
          sources: [
            {
              type: "video/mp4",
              src: `http://localhost:3000/courses/data/${props.name}/video/${props.video}`,
            },
          ],
          subtitles: [
            {
              language: "en",
              url: `http://localhost:3000/courses/data/${props.name}/video/${props.subtitle}`,
              label: "EN",
            },
          ],
          defaultSubtitle: "en",
        }}
      />
    </>
  );
};

function DashbordPage(props) {
  const [CourseDate, setCourseDate] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/courses/data.json")
      .then((date) => date.json())
      .then((data) => setCourseDate(data));
  }, []);

  const [index, setIndex] = useState(0);
  let { id } = useParams();

  let navigate = useNavigate();
  return CourseDate.length === 0 ? (
    <></>
  ) : (
    <Container maxWidth="lg" mt={4}>
      <AppBar>
        <Toolbar>
          <IconButton onClick={() => navigate("/")}>
            <Typography style={{ color: "white" }}>Back</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Toolbar />
      <Grid container justifyContent="space-between" spacing={4}>
        <Grid item md={8}>
          <Box>
            {CourseDate !== [] &&
              CourseDate[id]["video"].map((item, inx) => {
                if (inx % 2 === 0)
                  return (
                    <div
                      style={{
                        display: `${inx === index ? "block" : "none"}`,
                        width: "100%",
                      }}
                    >
                      <VideoPlayerMake
                        name={CourseDate[id]["name"]}
                        video={CourseDate[id]["video"][inx]}
                        subtitle={CourseDate[id]["video"][inx + 1]}
                      />
                    </div>
                  );
                else return <></>;
              })}
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box>
            <List>
              {CourseDate !== [] &&
                CourseDate[id]["video"].map((item, inx) => {
                  if (inx % 2 === 0)
                    return (
                      <Grid container direction="row" alignItems="center">
                        <Grid item sm={2} md={2} lg={2}>
                          <Checkbox
                            checked={CourseDate[id]["status"][inx / 2]}
                            onChange={async () => {
                              fetch("http://localhost:4000/course", {
                                headers: {
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                },
                                method: "POST",
                                body: JSON.stringify({
                                  id: parseInt(id),
                                  video: inx / 2,
                                }),
                              });
                            }}
                          />
                        </Grid>
                        <Grid item sm={8} md={8} lg={8}>
                          <ListItem
                            button
                            onClick={async () => {
                              setIndex(inx);
                            }}
                          >
                            <ListItemText primary={`${item}`} />
                          </ListItem>
                        </Grid>
                        <Grid item sm={12} md={12} lg={12}>
                          <Divider />
                        </Grid>
                      </Grid>
                    );
                  else return <></>;
                })}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashbordPage;
