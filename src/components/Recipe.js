import React, { useEffect, useState } from 'react';
import Sidebar from "./Sidebar";

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    
    root: {
      borderRadius: 12,
      background: 'linear-gradient(#FFFFFF 30%, #D2B48C 90%)',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
function Recipe() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
        useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/recipes');
        const items = await data.json();
        setItems(items);
    };

  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
        <section>
            <div class="recipes">
                <h1 class="mt-5">Recipes</h1>
                <h5 class="mt-5"> Browse our recipes or submit your own</h5>
                <form method="POST" action="/addRecipe">
                    <div class="input-group justify-content-center">
                        <div class="input-group-prepend">

                            <input type="text" name="recipeName" placeholder="Recipe Name" class="form-control" />
                            <input type="text" name="recipeIngredients" placeholder="Ingredients" class="form-control" />
                            <input type="text" name="recipeSteps" placeholder="Steps" class="form-control" />
                            <input type="text" name="recipeURL" placeholder="Link" class="form-control" />
                            <input type="submit" value="Send" class="btn btn-primary mb-2" />

                        </div>
                    </div>
    
                </form>
                <Sidebar />

                <Card className={classes.root}>
                    {
                    items.map(item => (
                        <><CardHeader
                            avatar={<Avatar aria-label="recipe" className={classes.avatar}>
                                R
                            </Avatar>}
                            action={<IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>}
                            title= {item.name}
                            /><CardMedia
                                className={classes.media}
                                image={item.imageURL}
                                title="Ingredients" /><CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Ingredients needed: {item.ingredients}
                                </Typography>
                            </CardContent><CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions><Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Method:</Typography>
                                    <Typography paragraph>
                                       {item.steps}
                                    </Typography>
                                </CardContent>
                            </Collapse></>

                    ))
}
                    </Card>
            </div>
        </section>
    );
}

export default Recipe;


// <i class="fa fa-user mr-2"></i> <i> imageURL: {item.imageURL} Recipe for {item.name} ... Steps {item.steps} </i>
