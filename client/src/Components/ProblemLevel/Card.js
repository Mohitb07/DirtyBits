import React , {useEffect, memo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import style from './CardStyle.css'
import AOS from 'aos';
import "aos/dist/aos.css";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginRight:'2.0em',
    background:'#edf7ed',
    marginBottom:'30px',
    boxShadow: '1px 16px 60px -12px rgba(0,0,0,0.81)',
    width:'800px',
    height: '300px',
  },
});

 function ImgMediaCard(props) {
  const classes = useStyles();

  useEffect(() => {
    console.log('card re-render')
    AOS.init({
      duration : 1000
    });
  }, []);

  return (
    <Card data-aos="fade-right" id='customCard' style={style} className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={props.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={{
            pathname:'/problemlist',
            state:props.value
          }}>Solve</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default memo(ImgMediaCard);