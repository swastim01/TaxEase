import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Load previous messages from session storage to persist chat
    const savedMessages = sessionStorage.getItem("chatMessages");
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  useEffect(() => {
    // Save messages to session storage
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setMessages([...newMessages, { text: "Processing your request...", sender: "ai" }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          style={{
            padding: "12px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            border: "none",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
          }}
        >
          <MessageSquare size={24} color="white" />
        </Button>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          style={{
            width: "350px",
            height: "500px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* Chat Header */}
          <div style={{ padding: "12px", backgroundColor: "#007bff", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
            <h5 style={{ margin: 0 }}>TaxEase Chat</h5>
            <X style={{ cursor: "pointer" }} onClick={() => setIsOpen(false)} />
          </div>

          {/* Chat Messages */}
          <Card.Body style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ padding: "10px", borderRadius: "8px", alignSelf: msg.sender === "user" ? "flex-end" : "flex-start", backgroundColor: msg.sender === "user" ? "#cce5ff" : "#f1f1f1" }}>
                {msg.text}
              </div>
            ))}
            {isTyping && <div style={{ padding: "10px", backgroundColor: "#f1f1f1", borderRadius: "8px", alignSelf: "flex-start" }}>...</div>}
          </Card.Body>

          {/* Chat Input */}
          <div style={{ padding: "12px", borderTop: "1px solid #ddd", display: "flex" }}>
            <InputGroup>
              <Form.Control
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a tax question..."
              />
              <Button onClick={sendMessage} style={{ backgroundColor: "#007bff", border: "none" }}>Send</Button>
            </InputGroup>
          </div>
        </motion.div>
      )}
    </div>
  );
}
