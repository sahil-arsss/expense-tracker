import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api-v1/transaction", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const handleFilter = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api-v1/transaction", {
        params: { df: startDate, dt: endDate, s: search },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error filtering transactions", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Transaction History</h2>
      <Form className="d-flex gap-2">
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Form.Control
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Form.Control
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="primary" onClick={handleFilter}>
          Filter
        </Button>
      </Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              <td>{txn.description}</td>
              <td>{txn.amount}</td>
              <td>{txn.type}</td>
              <td>{txn.status}</td>
              <td>{txn.source}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Transactions;
