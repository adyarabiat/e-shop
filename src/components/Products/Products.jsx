import React from "react";
import Grid from "@material-ui/core/Grid";

import Product from "./Product/Product";
import useStyles from "./styles";

const Products = (props) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" alignItems="center" spacing={4}>
        {props.products.map((product) => {
          return (
            <Grid
              item
              justify="center"
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
            >
              <Product product={product} onAddtoCart={props.onAddtoCart} />
            </Grid>
          );
        })}
      </Grid>
    </main>
  );
};

export default Products;
