import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Users = () => {
  const [rowData, setRowData] = useState([]);
  const [paginationPageSize, setPaginationPageSize] = useState(10);
  const [paginationOffset, setPaginationOffset] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users?limit=${paginationPageSize}&offset=${paginationOffset}`)
      .then((res) => res.json())
      .then((data) => {
        setRowData(data);
        setLoading(false);
        setTotalRecords(data.length);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [paginationPageSize, paginationOffset]);

  const columnDefs = [
    { field: "user_id", headerName: "User ID" },
    { field: "username", headerName: "Username" },
    { field: "email", headerName: "Email" },
    { field: "registration_date", headerName: "Registration Date" },
    { field: "age", headerName: "Age" },
    { field: "country", headerName: "Country" },
  ];

  const getRows = (params) => {
    if (loading) {
      return;
    }

    setLoading(true);

    const newOffset = params.startRow;
    setPaginationOffset(newOffset);

    fetch(`/api/users?limit=${paginationPageSize}&offset=${newOffset}`)
      .then((res) => res.json())
      .then((data) => {
        params.successCallback(data, totalRecords);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        params.failCallback();
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: "300px", width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          rowSelection="single"
          infiniteInitialRowCount={totalRecords}
          datasource={getRows}
        />
      </div>
    </div>
  );
};

export default Users;
