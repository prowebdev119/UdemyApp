import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function CourseCard(props) {
  return (
    <Card>
      <CardHeader
        title={
          <Typography color="primary" variant="h6">
            {props.title.toUpperCase()}
          </Typography>
        }
        subheader={
          <Typography color="secondary">{`${props.percent}% course completed`}</Typography>
        }
        avatar={<Avatar>{props.title.toUpperCase().charAt(0)}</Avatar>}
      />
      <CardActionArea>
        <CardMedia
          src={`http://localhost:3000/courses/data/${props.title}/course.png`}
          component="img"
          height={300}
        />
      </CardActionArea>
      <CardContent>
        <Button
          variant="outlined"
          href={`/course/${props.id}`}
          color="primary"
          endIcon={<ChevronRightIcon />}
          fullWidth
        >
          Go to Course
        </Button>
      </CardContent>
    </Card>
  );
}
