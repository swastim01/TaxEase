import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";

const stepsIndividuals = [
  { title: "📝 Create & Verify Account", desc: "Sign up on TaxEase and securely verify your identity for a seamless tax filing process." },
  { title: "📊 Import & Review Data", desc: "Automatically fetch tax details from payroll, banks, and investment records for accuracy." },
  { title: "🤖 AI-Powered Tax Optimization", desc: "AI identifies deductions and credits, ensuring you get the <strong>maximum refund possible</strong>." },
  { title: "🔒 E-File & Stay Secure", desc: "Submit your tax return with <strong>bank-level security</strong> and get real-time IRS updates." }
];

const stepsBusinesses = [
  { title: "🏢 Business Tax Setup", desc: "Register your business type and link financial accounts for an optimized tax strategy." },
  { title: "💰 Expense & Deduction Insights", desc: "Track expenses in real-time and categorize them for <strong>maximum deductions</strong>." },
  { title: "⚖️ Automated Tax Compliance", desc: "AI ensures compliance with <strong>federal and state regulations</strong> for accurate filing." },
  { title: "📩 Seamless E-Filing & Expert Help", desc: "File taxes confidently with <strong>instant filing confirmation and CPA support</strong> when needed." }
];

const HowItWorks = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        {/* Heading */}
        <Row className="text-center mb-4">
          <Col>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="fw-bold text-primary"
            >
              How TaxEase Works
            </motion.h2>
            <p className="text-muted">
              Simple steps to file your taxes effortlessly.
            </p>
          </Col>
        </Row>

        {/* Individuals Section */}
        <Row className="mb-5">
          <Col lg={5} className="text-center mb-3">
            <h3 className="fw-bold text-dark">For Individuals</h3>
          </Col>
          <Col lg={7}>
            <Row>
              {stepsIndividuals.map((step, index) => (
                <Col md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <Card className="shadow-sm p-3 mb-3 border-0 rounded">
                      <Card.Body>
                        <h5 className="fw-bold">{step.title}</h5>
                        <p className="text-muted" dangerouslySetInnerHTML={{ __html: step.desc }}></p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Businesses Section */}
        <Row>
          <Col lg={5} className="text-center mb-3">
          <h3 className="fw-bold text-dark">
  For Businesses <span className="text-muted fst-italic">(Future Scope)</span>
</h3>
          </Col>
          <Col lg={7}>
            <Row>
              {stepsBusinesses.map((step, index) => (
                <Col md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <Card className="shadow-sm p-3 mb-3 border-0 rounded">
                      <Card.Body>
                        <h5 className="fw-bold">{step.title}</h5>
                        <p className="text-muted" dangerouslySetInnerHTML={{ __html: step.desc }}></p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HowItWorks;
