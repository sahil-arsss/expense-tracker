import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const AddTransaction = () => {
  const [accountId, setAccountId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/transaction/addTransaction/${accountId}`,
        { description, amount, source },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Transaction failed. " + error.response.data.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Transaction</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Account ID</Form.Label>
          <Form.Control
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Source</Form.Label>
          <Form.Control
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" className="mt-3">
          Add Transaction
        </Button>
      </Form>
    </div>
  );
};

export default AddTransaction;
