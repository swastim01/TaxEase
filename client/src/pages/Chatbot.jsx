import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Send, Globe } from "lucide-react";
import { Button, Container, Form } from "react-bootstrap";

export default function ChatGPTInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMessages = sessionStorage.getItem("chatMessages");
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = { text: "Coming Soon: Multi-language support!", sender: "ai" };
      setMessages([...messages, userMessage, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleLanguageClick = () => {
    alert("Multi-Language Support Coming Soon!");
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        paddingTop: "80px",
        paddingBottom: "60px",
        minHeight: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`shadow-lg rounded-4 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
        style={{
          width: "75vw",
          height: "80vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
          <h4>TaxEase AI Chat</h4>
          <div>
            <Button variant="outline-secondary" size="sm" onClick={handleLanguageClick} className="me-2">
              <Globe size={18} /> Multi-Language
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <Container fluid className="flex-grow-1 overflow-auto py-3 d-flex flex-column">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded mb-2 ${
                msg.sender === "user" ? "bg-primary text-white align-self-end" : "bg-secondary text-white align-self-start"
              }`}
              style={{ maxWidth: "75%", borderRadius: "12px" }}
            >
              {msg.text}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              className="p-2 bg-secondary text-white rounded align-self-start"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ width: "80px", textAlign: "center", borderRadius: "12px" }}
            >
              Typing...
            </motion.div>
          )}
        </Container>

        {/* Chat Input */}
        <div className="border-top pt-2">
          <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="me-2"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage} className="bg-primary border-0">
              <Send size={20} />
            </Button>
          </Form>
        </div>
      </motion.div>
    </Container>
  );
}
