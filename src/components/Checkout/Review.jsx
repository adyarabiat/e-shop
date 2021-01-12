import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = (props) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {props.checkoutToken.live.line_items.map((product) => {
          return (
            <ListItem style={{ padding: "10px" }} key={product.name}>
              <ListItemText
                primary={product.name}
                secondary={`Quantity: ${product.quantity}`}
              />
              <Typography variant="body2">
                {product.line_total.formatted_with_symbol}
              </Typography>
            </ListItem>
          );
        })}
        <ListItemText style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {props.checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItemText>
      </List>
    </>
  );
};

export default Review;
