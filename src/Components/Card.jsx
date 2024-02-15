import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blueGrey, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useApi } from '../Context/Context';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Alert } from '@mui/material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ProductCard({id , description, brand , category , images, rating , stock , thumbnail , title, price }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    var value = rating;

    const { setval,val ,numsco , setnumso } = useApi();
    const handlePrice=(price) => {
        setval(val + price);
        setnumso(numsco + 1);

    }
  

    return (
        <Card sx={{ maxWidth: 345, bgcolor:blueGrey[900] }}>
            <CardHeader
       
                sx={
                    {color:'black' , fontWeight:'bold',}
                }
                title={title}
                subheader={rating}
            />
            <Rating name="no-value" value={value} />
            <CardMedia
                component="img"
                height="200"
                image={thumbnail}
                alt="Paejpglla dish"
            />
            <CardContent>
                <Typography >PRICE:&#8377;   {price}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => handlePrice(price)}>
                    <AddShoppingCartIcon sx={{ backgroundColor: 'white ', borderRadius: '10px', padding: 1, fontSize: 40 }} />
                    
                </IconButton>
                
               
            </CardActions>
           
        </Card>
    );
}



