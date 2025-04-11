import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const TransferMoney = () => {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/api/transaction/transfer-money",
        { from_account: fromAccount, to_account: toAccount, amount },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Transfer failed. " + error.response.data.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Transfer Money</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleTransfer}>
        <Form.Group>
          <Form.Label>From Account</Form.Label>
          <Form.Control
            type="text"
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>To Account</Form.Label>
          <Form.Control
            type="text"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
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

        <Button type="submit" className="mt-3">
          Transfer
        </Button>
      </Form>
    </div>
  );
};

export default TransferMoney;
