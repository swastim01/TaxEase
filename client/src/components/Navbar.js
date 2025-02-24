import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-white text-xl font-bold">💰 AI Tax Assistant</h1>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleDarkMode}
        className="bg-white dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg shadow-lg"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </motion.button>
    </nav>
  );
};

export default Navbar;
