import React from "react";
import { Accordion } from "react-bootstrap";

const faqs = [
  {
    question: "What is TaxEase, and how does it work?",
    answer: "TaxEase is an AI-powered tax filing platform that simplifies tax calculations, document submissions, and e-filing, ensuring compliance and maximum deductions.",
  },
  {
    question: "Who can use TaxEase?",
    answer: "Individuals, freelancers, and businesses can use TaxEase to manage tax returns, track deductions, and optimize tax planning effortlessly.",
  },
  {
    question: "Is my financial data secure with TaxEase?",
    answer: "This is planned for the future scope! We are soon going to implement AES-256 encryption, multi-factor authentication, and secure cloud storage to protect your financial data and ensure privacy.🚀",
  },
  {
    question: "Does TaxEase provide expert tax consultation?",
    answer: "Yes, our platform offers AI-driven insights, and you can also schedule a consultation with certified tax professionals for personalized guidance.",
  },
  {
    question: "How much does it cost to file taxes with TaxEase?",
    answer: "Commercialization has not yet been decided. Coming soon 🚀",
  },
  {
    question: "Can I file my taxes directly through TaxEase?",
    answer: "Absolutely! You can e-file directly with government tax agencies and receive real-time updates on your tax return status.",
  },
];

const FAQ = () => {
    return (
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold text-primary mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-muted mb-4">
            Get quick answers to the most common questions about TaxEase.
          </p>
  
          <Accordion defaultActiveKey="0">
            {faqs.map((faq, index) => (
              <Accordion.Item eventKey={index.toString()} key={index} className="mb-2 border-0 shadow-sm">
                <Accordion.Header className="fw-semibold">{faq.question}</Accordion.Header>
                <Accordion.Body className="text-muted">{faq.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </section>
    );
  };
  
  export default FAQ;
