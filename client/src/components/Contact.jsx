import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center">
          {/* Heading */}
          <Col lg={8} className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="fw-bold text-primary"
            >
              Contact Us
            </motion.h2>
            <p className="text-muted">
              Have questions? Reach out to us and we'll respond as soon as possible.
            </p>
          </Col>
        </Row>

        <Row className="mt-4">
          {/* Contact Form */}
          <Col md={6} className="mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white p-4 rounded shadow-sm"
            >
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Your message"
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Send Message
                </Button>
              </Form>
            </motion.div>
          </Col>
        </Row>

        {/* Contact Info */}
        <Row className="mt-5 text-center">
          <Col md={4}>
            <h5>📍 Address</h5>
            <p className="text-muted">Pune, Maharashtra, India</p>
          </Col>
          <Col md={4}>
            <h5>📧 Email</h5>
            <p className="text-muted">support@taxease.com</p>
          </Col>
          <Col md={4}>
            <h5>📞 Phone</h5>
            <p className="text-muted">+1 (555) 123-4567</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUs;