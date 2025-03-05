import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const ContactUs = () => {
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
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Your message" required />
                </Form.Group>

                <Button variant="primary" className="w-100">
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
