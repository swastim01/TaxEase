import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { MessageSquare, Users, Globe, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const Forum = () => {
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
          <Col md={10}>
            {/* Title */}
            <motion.h1 
              className="fw-bold display-4" 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
            >
              💬 Forum Launching Soon!
            </motion.h1>
            <p className="lead text-muted">
              A global community where ideas spark, discussions thrive, and innovation begins.
            </p>

            {/* Animated Forum Chat Bubbles */}
            <div className="d-flex justify-content-center gap-3 my-4">
              {[
                { icon: <Users size={24} />, text: "Join a global community" },
                { icon: <MessageSquare size={24} />, text: "Ask, Discuss, Solve" },
                { icon: <Globe size={24} />, text: "Connect beyond borders" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-primary text-white p-3 rounded d-flex align-items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.icon}
                  <span className="ms-2">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Countdown Timer */}
            <div className="d-flex justify-content-center gap-3 my-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div
                  key={unit}
                  className="bg-primary text-white p-3 rounded"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="fw-bold">{value}</h2>
                  <p className="text-uppercase small">{unit}</p>
                </motion.div>
              ))}
            </div>

            {/* Alert Message */}
            {alertVisible && (
              <Alert variant="success" className="fade show">
                ✅ Thank you! You'll be notified when the Forum launches. 🚀
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

export default Forum;
