import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-alpine.css"; 
import { Container, Stack, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
  },
}));

const Orders = () => {
  const classes = useStyles();

  const [rowData, setRowData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState({
    order_id: "",
    user_id: "",
    order_date: "",
    total_amount: "",
    status: "",
  });
  const [newOrder, setNewOrder] = useState({
    user_id: "",
    order_date: "",
    total_amount: "",
    status: "",
  });

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setRowData(data))
      .catch((error) => console.log(error));
  }, []);

  const columnDefs = [
    { field: "order_id", headerName: "Order ID" },
    { field: "user_id", headerName: "User ID" },
    { field: "order_date", headerName: "Order Date" },
    { field: "total_amount", headerName: "Total Amount" },
    { field: "status", headerName: "Status" },
  ];

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setNewOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New Order added:", data);

        setNewOrder({
          user_id: "",
          order_date: "",
          total_amount: "",
          status: "",
        });
        setShowAddForm(false);

        fetch("/api/orders")
          .then((res) => res.json())
          .then((data) => setRowData(data))
          .catch((error) => console.log(error));
        })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddRecord = () => {
    setShowAddForm(true);
  };

  const handleEdit = () => {
    if (selectedOrder) {
      setEditForm({
        order_id: selectedOrder.order_id,
        user_id: selectedOrder.user_id,
        order_date: selectedOrder.order_date,
        total_amount: selectedOrder.total_amount,
        status: selectedOrder.status,
      });
      setShowEditForm(true);
    } else {
      console.log("Please select an order to edit.");
    }
  };

  const handleEditFormInputChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/orders/${editForm.order_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editForm),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Order edited:", selectedOrder);

          fetch("/api/orders")
            .then((response) => response.json())
            .then((data) => setRowData(data))
            .catch((error) => console.log(error));
        } else {
          console.log("Failed to edit order:", response.statusText);
        }
      })
      .then(() => {
        setEditForm({
          order_id: "",
          user_id: "",
          order_date: "",
          total_amount: "",
          status: "",
        });
        setShowEditForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    if (selectedOrder) {
      fetch(`/api/orders/${selectedOrder.order_id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Order deleted:", selectedOrder);

            fetch("/api/orders")
              .then((response) => response.json())
              .then((data) => setRowData(data))
              .catch((error) => console.log(error));
          } else {
            console.log("Failed to delete order:", response.statusText);
          }
        })
        .catch((error) => {
          console.log("Error deleting order:", error);
        });
    } else {
      console.log("Please select an order to delete.");
    }
  };

  const onRowSelected = (event) => {
    setSelectedOrder(event.data);
  };

  return (
    <div>
      <Container sx={{ mb: 5 }} >
        <Button
          style={{ marginLeft: "16px" }}
          variant="contained"
          color="primary"
          onClick={handleAddRecord}
        >
          Add Order
        </Button>
        <Button
          style={{ marginLeft: "16px" }}
          variant="contained"
          color="primary"
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          style={{ marginLeft: "16px" }}
          variant="contained"
          color="secondary"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Container>
      <div className="ag-theme-alpine" style={{ height: "300px", width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          rowSelection="single"
          onRowSelected={onRowSelected}
        />
      </div>
      <Modal open={showAddForm} onClose={() => setShowAddForm(false)} className={classes.modal}>
        <div className={classes.modalContent}>
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={2}>
              <TextField 
                label="User ID" 
                variant="outlined"  
                name="user_id"
                type="number"
                value={newOrder.user_id}
                onChange={handleFormInputChange}
              />
              <TextField 
                label="Order Date" 
                variant="outlined" 
                type="date"
                focused
                name="order_date"
                value={newOrder.order_date}
                onChange={handleFormInputChange}
              />
              <TextField 
                type="number" 
                label="Total Amount" 
                name="total_amount"
                variant="outlined" 
                value={newOrder.total_amount}
                onChange={handleFormInputChange}
              />
              <TextField 
                label="Status" 
                variant="outlined"
                name="status"
                type="text"
                value={newOrder.status}
                onChange={handleFormInputChange}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Stack>
          </form>
        </div>
      </Modal>
      <Modal open={showEditForm} onClose={() => setShowEditForm(false)} className={classes.modal}>
        <div className={classes.modalContent}>
          <form onSubmit={handleEditFormSubmit}>
            <Stack spacing={2}>
              <Typography variant="h5" sx={{ mb: 5 }}>
                Edit Order ID: {editForm.order_id}
              </Typography>
              <TextField 
                label="User ID" 
                variant="outlined" 
                name="user_id"
                type="number"
                value={editForm.user_id}
                onChange={handleEditFormInputChange}
              />
              <TextField 
                label="Order Date" 
                variant="outlined" 
                name="order_date"
                type="date"
                focused
                value={editForm.order_date}
                onChange={handleEditFormInputChange}
              />
              <TextField 
                type="number" 
                label="Total Amount" 
                name="total_amount"
                variant="outlined" 
                value={editForm.total_amount}
                onChange={handleEditFormInputChange}
              />
              <TextField 
                label="Status" 
                variant="outlined"
                name="status"
                type="text"
                value={editForm.status}
                onChange={handleEditFormInputChange}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Stack>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Orders;
