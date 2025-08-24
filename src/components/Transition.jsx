import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TransitionScreen({ message, visible, onFinish }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onFinish();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [visible, onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-block text-white drop-shadow-2xl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {message}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TransitionScreen;
