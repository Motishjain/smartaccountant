import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

export default function SalesStatement() {
  const dataSource = [
    {
      invoiceNumber: "2",
      firmName: "Kenko",
      billAmount: "40000",
      paymentStatus: "Paid",
    },
    {
      invoiceNumber: "3",
      firmName: "Rolex",
      billAmount: "35000",
      paymentStatus: "Pending",
    },
  ];

  return (
    <div>
      <BootstrapTable data={dataSource}>
        <TableHeaderColumn dataField="invoiceNumber" isKey>
          Invoice Number
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="firmName"
          filter={{ type: "TextFilter", delay: 100 }}
        >
          Firm Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="billAmount">
          Bill Amount
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
}
