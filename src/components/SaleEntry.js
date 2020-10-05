import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { MdCancel as DeleteIcon } from "react-icons/md";
import { MdAddCircle as AddIcon } from "react-icons/md";

export default function SaleEntry() {
  const TAX_RATE = 0.07;

  const [items, setItems] = useState([
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
    return items
      .map(({ total }) => total)
      .reduce(
        (sum, currentValue) => parseFloat(sum) + parseFloat(currentValue),
        0
      );
  }
  function calculateTotal(item) {
    return item.qty * item.rate;
  }

  let handleAddLineItem = (event) => {
    setItems(
      // use optimistic uuid for drag drop; in a production app this could be a database id
      items.concat([{ description: "", qty: "", rate: "", total: "0" }])
    );
  };

  let handleItemChange = (elementIndex) => (event) => {
    let updatedItems = items.map((item, i) => {
      if (elementIndex !== i) return item;
      var updatedItem = { ...item, [event.target.name]: event.target.value };
      updatedItem.total = calculateTotal(updatedItem);
      return updatedItem;
    });

    setItems(updatedItems);
  };

  let handleRemoveLineItem = (elementIndex) => (event) => {
    setItems(
      items.filter((item, i) => {
        return elementIndex !== i;
      })
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
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
            <TableRow key={index}>
              <TableCell>
                <input
                  type="text"
                  name="desc"
                  value={item.desc}
                  onChange={handleItemChange(index)}
                />
              </TableCell>
              <TableCell align="right">
                <input
                  type="text"
                  name="qty"
                  value={item.qty}
                  onChange={handleItemChange(index)}
                />
              </TableCell>
              <TableCell align="right">
                <input
                  type="text"
                  name="rate"
                  value={item.rate}
                  onChange={handleItemChange(index)}
                />
              </TableCell>
              <TableCell align="right">{ccyFormat(item.total)}</TableCell>
              <TableCell>
                <button type="button" onClick={handleRemoveLineItem(index)}>
                  <DeleteIcon size="1.25em" />
                </button>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={2} />
            <TableCell colSpan={3} />
            <TableCell align="right">
              <div>
                <button type="button" onClick={handleAddLineItem}>
                  <AddIcon size="1.25em" /> Add Item
                </button>
              </div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell rowSpan={2} />
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
