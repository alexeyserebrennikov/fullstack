import React from 'react'
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import Orders from '../sections/@dashboard/tables/TableOrders';
import Users from '../sections/@dashboard/tables/TableUsers';


const TablesPage = () => {
  return (
    <>
      <Helmet>
        <title>Tables</title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Tables
        </Typography>

        <Typography variant="h5" sx={{ mb: 5 }}>
          Users
        </Typography>

        <Users />
        
        <Typography variant="h5" sx={{ mb: 5, mt: 5 }}>
          Orders
        </Typography>

        <Orders />

      </Container>
    </>  
  );
}
  

export default TablesPage
