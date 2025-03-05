import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Brain } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hero bg-light py-5">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          {/* Left Content */}
          <Col md={6}>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="fw-bold text-dark"
            >
              Tax Filing, Simplified with <span className="text-primary">TaxEase</span>
            </motion.h1>
            <p className="text-muted">
              AI-powered accuracy, expert-backed guidance, and maximum refunds—all in one seamless platform.
            </p>

            {/* Buttons */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <Button variant="primary" className="me-2">Get Started</Button>
              <Button href ="#about" variant="outline-primary">Learn More</Button>
            </motion.div>
          </Col>

          {/* Right Side Icons */}
          <Col md={6} className="mt-4 mt-md-0">
            <Row className="g-3">
              <Col xs={12} sm={6}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="p-3 bg-white shadow-sm rounded text-center"
                >
                  <Brain size={30} className="text-primary mb-2" />
                  <h6 className="fw-bold">AI-Powered Filing</h6>
                  <p className="text-muted small">Smart automation; aims to ensure 100% compliance & deductions.</p>
                </motion.div>
              </Col>
              <Col xs={12} sm={6}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="p-3 bg-white shadow-sm rounded text-center"
                >
                  <FileText size={30} className="text-primary mb-2" />
                  <h6 className="fw-bold">Hassle-Free E-Filing</h6>
                  <p className="text-muted small">File directly with the IRS & tax agencies in minutes.</p>
                </motion.div>
              </Col>
              <Col xs={12} sm={12}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="p-3 bg-white shadow-sm rounded text-center"
                >
                  <ShieldCheck size={30} className="text-primary mb-2" />
                  <h6 className="fw-bold">
  Secure & Private <span className="text-muted fst-italic">(Future Scope)</span>
</h6>

                  <p className="text-muted small">End-to-end encryption for complete data protection.</p>
                </motion.div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
