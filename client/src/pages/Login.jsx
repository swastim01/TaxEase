import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Sun, Moon, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
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
        <h3 className="text-center fw-bold mb-4">Welcome Back</h3>

        <Form>
          {/* Email Input */}
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" required />
          </Form.Group>

          {/* Password Input with Show/Hide Toggle */}
          <Form.Group className="mb-3 position-relative">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter password" required />
              <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </Form.Group>

          {/* Remember Me & Forgot Password */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Check type="checkbox" label="Remember Me" />
            <a href="#" className="text-decoration-none text-primary">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <Button variant="primary" className="w-100" type="submit">Login</Button>
        </Form>

        {/* Divider */}
        <div className="text-center mt-3">
          <span>or</span>
        </div>

        {/* Social Login Buttons */}
        <Button variant="outline-dark" className="w-100 mt-2">Login with Google</Button>
        <Button variant="outline-primary" className="w-100 mt-2">Login with Facebook</Button>

        {/* Sign Up Link */}
        <p className="text-center mt-3">
          Don't have an account? <a href="/sign-up" className="text-decoration-none text-primary">Sign Up</a>
        </p>
      </motion.div>
    </div>
  );
}
