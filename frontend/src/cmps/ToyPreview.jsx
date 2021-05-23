

import React from 'react';
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
        backgroundSize: "contain"
    },
});

export function ToyPreview({ toy, setSelectedToy }) {
    const classes = useStyles();

    return (
        <Card className={`card ${classes.root}`}>
            <CardActionArea>
                <Link to={`/toy/details/${toy._id}`}>
                    <CardMedia
                        className={`${classes.media}`}
                        image={toy.img}
                        title={toy.name}
                    />
                </Link>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        <Link className="card-btn" to={`/toy/details/${toy._id}`}>{toy.name}</Link>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link className="card-btn" to={`/toy/details/${toy._id}`}>
                    Learn More
                </Link>
            </CardActions>
        </Card>
    );
}