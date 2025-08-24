import React, { useState } from 'react';

function GameSetup({ onStart }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [rounds, setRounds] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player1 && player2 && rounds > 0) {
      onStart({ player1, player2, rounds });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-5 sm:p-6 rounded-2xl shadow-2xl motion-preset-fade motion-duration-500 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl sm:text-3xl font-block mb-4 text-center motion-preset-slide-up motion-delay-200">
         Game Setup
      </h2>
      <input
        className="w-full mb-2 p-2 rounded-lg border border-white/30 bg-white/20 placeholder-white/70 focus:outline-none text-sm sm:text-base"
        type="text"
        placeholder="Player 1 Name"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
        required
      />
      <input
        className="w-full mb-2 p-2 rounded-lg border border-white/30 bg-white/20 placeholder-white/70 focus:outline-none text-sm sm:text-base"
        type="text"
        placeholder="Player 2 Name"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
        required
      />
      <input
        className="w-full mb-4 p-2 rounded-lg border border-white/30 bg-white/20 placeholder-white/70 focus:outline-none text-sm sm:text-base"
        type="number"
        placeholder="Number of Rounds"
        value={rounds}
        onChange={(e) => setRounds(parseInt(e.target.value))}
        min="1"
        required
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-base sm:text-lg p-2 sm:p-3 rounded-xl shadow-lg hover:scale-105 transition motion-preset-bounce motion-delay-300"
      >
         Start Game
      </button>
    </form>
  );
}

export default GameSetup;
