import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Sun, Moon, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`d-flex align-items-center justify-content-center ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`} style={{ height: "100vh" }}>
      {/* Dark Mode Toggle */}
      <Button variant="outline-secondary" className="position-absolute top-3 end-3" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </Button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="shadow-lg p-4 rounded-4"
        style={{
          width: "400px",
          background: darkMode
            ? "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"
            : "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))",
          backdropFilter: "blur(10px)",
          border: darkMode ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.1)"
        }}
      >
        <h3 className="text-center fw-bold mb-4">Create an Account</h3>

        <Form>
          {/* Name Input */}
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your full name" required />
          </Form.Group>

          {/* Email Input */}
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" required />
          </Form.Group>

          {/* Password Input */}
          <Form.Group className="mb-3 position-relative">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <Form.Control type={showPassword ? "text" : "password"} placeholder="Create a password" required />
              <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </Form.Group>

          {/* Sign Up Button */}
          <Button variant="primary" className="w-100" type="submit">Sign Up</Button>
        </Form>

        {/* Divider */}
        <div className="text-center mt-3">
          <span>or</span>
        </div>

        {/* Social Sign Up Buttons */}
        <Button variant="outline-dark" className="w-100 mt-2">Sign Up with Google</Button>
        <Button variant="outline-primary" className="w-100 mt-2">Sign Up with Facebook</Button>

        {/* Already Have an Account? */}
        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="text-decoration-none text-primary">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
}
