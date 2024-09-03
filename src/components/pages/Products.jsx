import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Table from "../shared/Table";

const Products = () => {
  const [products, setProducts] = useState();

  const [loading, setLoading] = useState(false);

  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  // const [results, setResults] = useState([]);

  const getMonthNumber = (monthName) => {
    const months = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };
    return months[monthName] || -1;
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "productName",
      headerName: "Product Name",
      headerClassName: "table-header",
      width: 200,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Time",
      headerClassName: "table-header",
      width: 250,
    },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Searching for products....");
    setLoading(true);

    const payload = {};

    // Add only the entered values to the payload
    if (day) payload.day = day;
    if (month) {
      // Check if the month input is a number or a string
      const parsedMonth = parseInt(month, 10);

      // If it's a valid number, use it directly. Otherwise, treat it as a month name
      if (!isNaN(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12) {
          payload.month = parsedMonth; // Use the entered month number
      } else {
          payload.month = getMonthNumber(month); // Convert month name to number
      }
  }
    if (year) payload.year = year;
    console.log(payload);

    try {
      const { data } = await axios.post(
        "https://product-tracking-backend.onrender.com/api/v1/products/search",
        payload
      );
      setProducts(
        data?.products?.map((i) => ({
          ...i,
          id: i._id,
          createdAt: moment(i?.createdAt).format("MMM Do YYYY"),
        }))
      );
      // console.log(data)
      toast.success(data.message, { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went Wrong!", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `https://product-tracking-backend.onrender.com/api/v1/products/get`,
        config
      );
      if (data.success) {
        setProducts(
          data?.products?.map((i) => ({
            ...i,
            id: i._id,
            createdAt: moment(i?.createdAt).format("MMM Do YYYY"),
          }))
        );
      }
    }

    fetchData();
  }, []);

  return (
    <Fragment>
      <Stack direction={"row"} spacing={2} marginTop={3} marginX={3}>
        <TextField
          fullWidth
          label="Date"
          margin="normal"
          variant="outlined"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <TextField
          fullWidth
          label="Month"
          margin="normal"
          required
          variant="outlined"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <TextField
          fullWidth
          label="Year"
          required
          margin="normal"
          variant="outlined"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <Button
          sx={{
            marginTop: "1rem",
          }}
          variant="contained"
          fullWidth
          color="success"
          onClick={handleSearch}
          disabled={loading}
        >
          Search
        </Button>
      </Stack>

      <Table
        heading={"All Products"}
        rows={products}
        columns={columns}
        rowHeight={200}
      />
    </Fragment>
  );
};

export default Products;
