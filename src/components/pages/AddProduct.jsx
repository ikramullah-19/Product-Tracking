import { useInputValidation } from "6pp";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
  
  const AddProduct = () => {
  
    const [loading, setLoading] = useState(false);
  
    const productName = useInputValidation("");
    const quantity = useInputValidation("");
    const price = useInputValidation("");
  
    const handleAddProduct = async (e) => {
      e.preventDefault();
  
      const toastId = toast.loading("Adding Your Product...")
      setLoading(true)
  
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      try {
        const { data } = await axios.post(
          `http://localhost:5000/api/v1/products/new`,
          {
            productName: productName.value,
            quantity: quantity.value,
            price: price.value,
          },
          config
        );
  
        toast.success(data.message,{id: toastId});
  
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went Wrong!",{id: toastId});
      }finally{
        setLoading(false)
      }
    };
    
  
    return (
      <div
        // style={{
        //   backgroundImage: bgGradient,
        // }}
      >
        <Container
          component={"main"}
          maxWidth="xs"
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
              <>
                <Typography variant="h5">Add Product</Typography>
                <form
                  style={{
                    width: "100%",
                    marginTop: "1rem",
                  }}
                  onSubmit={handleAddProduct}
                >
                  <TextField
                    required
                    fullWidth
                    label="Product Name"
                    margin="normal"
                    variant="outlined"
                    value={productName.value}
                    onChange={productName.changeHandler}
                    />
  
                  <TextField
                    required
                    fullWidth
                    label="Quantity"
                    margin="normal"
                    variant="outlined"
                    value={quantity.value}
                    onChange={quantity.changeHandler}
                    
                    />
                  <TextField
                    required
                    fullWidth
                    label="Price"
                    margin="normal"
                    variant="outlined"
                    value={price.value}
                    onChange={price.changeHandler}
                  />
  
                  <Button
                    sx={{
                      marginTop: "1rem",
                    }}
                    variant="contained"
                    fullWidth
                    color="primary"
                    type="submit"
                    disabled={loading}
                  >
                    Add
                  </Button>
                </form>
              </>
          </Paper>
        </Container>
      </div>
    );
  };
  
  export default AddProduct;
  
  