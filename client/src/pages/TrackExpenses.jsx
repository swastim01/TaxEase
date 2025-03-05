import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const ComingSoon = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-04-01T00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    return difference > 0
      ? {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [email, setEmail] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNotifyMe = (e) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setAlertVisible(true);
    setEmail("");
    setTimeout(() => setAlertVisible(false), 3000);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-dark text-white">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className="fw-bold display-4">🚀 Track Expenses is Coming Soon!</h1>
            <p className="lead text-muted">
              Smart Expense Tracking Made Simple – Launching Soon! Stay Updated.
            </p>

            {/* Countdown Timer */}
            <div className="d-flex justify-content-center gap-3 my-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-primary text-white p-3 rounded">
                  <h2 className="fw-bold">{value}</h2>
                  <p className="text-uppercase small">{unit}</p>
                </div>
              ))}
            </div>

            {/* Alert Message */}
            {alertVisible && (
              <Alert variant="success" className="fade show">
                ✅ Thank you! You'll be notified when we launch. 🚀
              </Alert>
            )}

            {/* Notify Me Form */}
            <Form className="d-flex justify-content-center" onSubmit={handleNotifyMe}>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="me-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant="primary">Notify Me</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ComingSoon;
