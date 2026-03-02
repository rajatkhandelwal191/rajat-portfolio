"use client";

import { motion } from "framer-motion";

export default function ChatbotWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-clay border border-white/20 bg-glass p-5 shadow-glass backdrop-blur-md"
    >
      <h2 className="text-xl font-semibold">Ask my AI assistant</h2>
      <p className="mt-2 text-slate-300">Chatbot UI shell ready. Backend integration next.</p>
    </motion.div>
  );
}
