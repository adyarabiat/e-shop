import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import useStyles from "./styles";

const CartItem = (props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia
        image={props.item.media.source}
        alt={props.item.name}
        className={classes.media}
      />
      <CardContent className={classes.cartContent}>
        <Typography variant="h4">{props.item.name}</Typography>
        <Typography variant="h5">
          {props.item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() =>
              props.onUpdateCartQty(props.item.id, props.item.quantity - 1)
            }
          >
            -
          </Button>
          <Typography>{props.item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() =>
              props.onUpdateCartQty(props.item.id, props.item.quantity + 1)
            }
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => props.onRemoveFromCart(props.item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
