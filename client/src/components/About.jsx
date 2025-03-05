import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Calculator, MessageCircle, Clock, Users } from "lucide-react";

const features = [
  { icon: <Calculator size={30} className="text-primary" />, title: "Smart Tax Calculator", desc: "Instantly calculate your taxes with AI-powered precision, ensuring accurate deductions and savings." },
  { icon: <FileText size={30} className="text-primary" />, title: "Easy Document Upload", desc: "Securely upload and store tax documents, making tax filing seamless and hassle-free." },
  { icon: <MessageCircle size={30} className="text-primary" />, title: "AI-Powered Chatbot", desc: "Get real-time tax guidance and answers to your queries with our intelligent AI assistant." },
  { icon: <Clock size={30} className="text-primary" />, title: "Time-Saving Automation", desc: "Automated calculations and pre-filled forms help you file taxes faster and error-free." },
  { 
    icon: <ShieldCheck size={30} className="text-primary" />, 
    title: <>Secure & Transparent <span className="text-muted fst-italic">(Future Scope)</span></>, 
    desc: "Your data is encrypted and protected, ensuring privacy and transparency at every step." 
  },
  
  { 
    icon: <Users size={30} className="text-primary" />, 
    title: <>Expert Community <span className="text-muted fst-italic">(Future Scope)</span></>, 
    desc: "Connect with tax professionals and fellow users to get insights and expert tax-saving tips." 
  }
];

const WhyChoose = () => {
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
              Why Choose TaxEase?
            </motion.h2>
            <p className="text-muted">
              Simplify tax filing with AI-driven insights, seamless document management, and expert support.
            </p>
          </Col>
        </Row>

        {/* Feature Cards */}
        <Row>
          {features.map((feature, index) => (
            <Col md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <Card className="shadow-sm p-3 mb-4 border-0 text-center rounded">
                  <Card.Body>
                    <div className="mb-3">{feature.icon}</div>
                    <h5 className="fw-bold">{feature.title}</h5>
                    <p className="text-muted">{feature.desc}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default WhyChoose;
