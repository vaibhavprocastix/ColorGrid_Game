import React from 'react';

function FinalResults({ scores, onRestart }) {
  // Number of rounds played
const totalRounds = scores.length;

// Average percentage score per player, normalized to 100
const totalP1 = Math.round(
  scores.reduce((acc, r) => acc + (100 - Math.round((r.p1.diff / 441) * 100)), 0) / totalRounds
);

const totalP2 = Math.round(
  scores.reduce((acc, r) => acc + (100 - Math.round((r.p2.diff / 441) * 100)), 0) / totalRounds
);


  const bestRound = scores.reduce(
    (best, r) => {
      const p1Sim = 100 - Math.round((r.p1.diff / 441) * 100);
      const p2Sim = 100 - Math.round((r.p2.diff / 441) * 100);

      const roundBest =
        p1Sim > p2Sim
          ? { player: 'Player 1', score: p1Sim, round: r.round }
          : { player: 'Player 2', score: p2Sim, round: r.round };

      return roundBest.score > best.score ? roundBest : best;
    },
    { player: '', score: -1, round: 0 }
  );

  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-4 sm:p-6 rounded-2xl shadow-2xl motion-preset-confetti motion-duration-1000 w-full max-w-md mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl font-block mb-4">🎉 Game Over!</h2>
      <p className="mb-2 text-base sm:text-lg font-semibold">🏆 Final Scores</p>

      <p className="text-sm sm:text-base">Player 1: {totalP1}%</p>
      <p className="text-sm sm:text-base">Player 2: {totalP2}%</p>

      <h3 className="mt-4 font-block text-lg sm:text-xl">
        Winner: {totalP1 > totalP2 ? 'Player 1' : 'Player 2'}
      </h3>

      <h4 className="mt-2 text-sm sm:text-base">
        🎯 Best Guess: {bestRound.player} ({bestRound.score}% match, Round {bestRound.round})
      </h4>

      <button
        onClick={onRestart}
        className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm sm:text-base px-4 sm:px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition motion-preset-bounce motion-delay-300"
      >
        Play Again
      </button>
    </div>
  );
}

export default FinalResults;
