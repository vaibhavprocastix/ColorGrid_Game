import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Home({ onStart }) {
  const [showTransition, setShowTransition] = useState(false);
  const [stage, setStage] = useState(null);

  // Handle Start button click
  const handleStart = () => {
    setShowTransition(true);
  };

  // Run countdown sequence
  useEffect(() => {
    if (showTransition) {
      const sequence = [
        { text: "Get Ready!", time: 1000 }
      ];

      let index = 0;
      const nextStage = () => {
        if (index < sequence.length) {
          setStage(sequence[index].text);
          setTimeout(nextStage, sequence[index].time);
          index++;
        } else {
          // After countdown, go to next screen
          onStart();
          setShowTransition(false);
          setStage(null);
        }
      };

      nextStage();
    }
  }, [showTransition, onStart]);

  return (
    <div className="relative flex flex-col items-center justify-center text-center p-4 w-full max-w-md mx-auto h-screen">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-block bg-gradient-to-br from-orange-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg motion-preset-pop motion-duration-700">
        COLOR GRID
      </h1>

      <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/90 font-semibold motion-preset-fade motion-delay-200">
        Color Picker multiplayer Game!
      </p>

      {/* Play Button */}
      <button
        onClick={handleStart}
        className="mt-6 sm:mt-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-lg sm:text-xl px-6 sm:px-8 py-2 sm:py-3 rounded-2xl shadow-xl hover:scale-110 transition motion-preset-bounce motion-delay-300"
      >
        Start Game
      </button>

      {/* Transition Fullscreen Countdown */}
      <AnimatePresence>
        {showTransition && stage && (
          <motion.div
            key={stage}
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-orange-500 via-red-500 to-yellow-400 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h1
              key={stage}
              className="text-5xl sm:text-6xl md:text-7xl font-block text-white drop-shadow-2xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {stage}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
