import React from "react";
import Grid from "@material-ui/core/Grid";

import Product from "./Product/Product";
import useStyles from "./styles";

const Products = () => {
  const classes = useStyles();

  const products = [
    {
      id: 1,
      name: "Shes",
      description: "Running Shoes",
      price: "$5",
      image: "https://source.unsplash.com/LxVxPA1LOVM/1920x1200",
    },
    {
      id: 2,
      name: "Macbook",
      description: "Macbook pro 13",
      price: "$10",
      image: "https://source.unsplash.com/WiONHd_zYI4/1920x1200",
    },
  ];

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" alignItems="center" spacing={4}>
        {products.map((product) => {
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
              <Product product={product} />
            </Grid>
          );
        })}
      </Grid>
    </main>
  );
};

export default Products;
