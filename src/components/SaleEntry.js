import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function SaleEntry() {
  const TAX_RATE = 0.07;

  const [items, setItems] = useState([
    {
      description: "",
      qty: "",
      rate: "",
      total: "0",
    },
    {
      description: "",
      qty: "",
      rate: "",
      total: "0",
    },
    {
      description: "",
      qty: "",
      rate: "",
      total: "0",
    },
  ]);

  const classes = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  function ccyFormat(num) {
    return `${parseFloat(num).toFixed(2)}`;
  }

  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  function invoiceSubtotal() {
    console.log(items.map(({ total }) => total));
    return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
  }

  function handleDescriptionChange(event, index) {
    var itemsCopy = items.slice();
    itemsCopy[index].description = event.target.value;
    setItems(itemsCopy);
  }

  function calculateTotal(item) {
    return item.qty * item.rate;
  }

  function handleQtyChange(event, index) {
    var itemsCopy = items.slice();
    itemsCopy[index].qty = event.target.value;
    itemsCopy[index].total = calculateTotal(itemsCopy[index]);
    setItems(itemsCopy);
  }

  function handleRateChange(event, index) {
    var itemsCopy = items.slice();
    itemsCopy[index].rate = event.target.value;
    itemsCopy[index].total = calculateTotal(itemsCopy[index]);
    setItems(itemsCopy);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Rate</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Rate</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.desc}>
              <TableCell>
                <input
                  type="text"
                  value={item.desc}
                  onChange={(event) => handleDescriptionChange(event, index)}
                />
              </TableCell>
              <TableCell align="right">
                <input
                  type="text"
                  value={item.qty}
                  onChange={(event) => handleQtyChange(event, index)}
                />
              </TableCell>
              <TableCell align="right">
                <input
                  type="text"
                  value={item.rate}
                  onChange={(event) => handleRateChange(event, index)}
                />
              </TableCell>
              <TableCell align="right">{ccyFormat(item.total)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal())}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
