import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

function getRandomColor() {
  const random = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + random.padStart(6, '0');
}

function getColorDiff(hex1, hex2) {
  const rgb = (hex) => hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  const [r1, g1, b1] = rgb(hex1);
  const [r2, g2, b2] = rgb(hex2);
  return Math.round(
    Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
  );
}

function GameRound({ config, onNext }) {
  const [targetColor, setTargetColor] = useState(getRandomColor());
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [guesses, setGuesses] = useState({});
  const [pickerColor, setPickerColor] = useState('#ffffff');
  const [showDiff, setShowDiff] = useState(false);

  const handlePick = () => {
    const key = currentPlayer === 1 ? 'p1' : 'p2';
    const diff = getColorDiff(targetColor, pickerColor);
    setGuesses((prev) => ({ ...prev, [key]: { color: pickerColor, diff } }));

    if (currentPlayer === 1) {
      setCurrentPlayer(2);
      setPickerColor('#ffffff');
    } else {
      setShowDiff(true);
    }
  };

  const nextRound = () => {
    onNext({
      round: config.currentRound,
      p1: guesses.p1,
      p2: guesses.p2,
      target: targetColor,
    });
    // reset for next round
    setTargetColor(getRandomColor());
    setCurrentPlayer(1);
    setGuesses({});
    setPickerColor('#ffffff');
    setShowDiff(false);
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 to-pink-100 text-black p-4 sm:p-6 rounded-2xl shadow-2xl motion-preset-fade motion-duration-500 w-full max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl font-block mb-4 text-center motion-preset-pop">
        🎨 Round {config.currentRound}
      </h2>
      <div
        className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-xl shadow-lg mb-4 border-4 border-black/50"
        style={{ backgroundColor: targetColor }}
      ></div>

      {!showDiff ? (
        <>
          <h3 className="mb-2 text-base sm:text-lg motion-preset-slide-up motion-delay-200">
            {currentPlayer === 1 ? config.player1 : config.player2}'s Turn
          </h3>
          <div className="flex justify-center my-4">
            <div className="">
                <HexColorPicker
                color={pickerColor}
                onChange={setPickerColor}
                className="mx-auto"
                />
            </div>
        </div>
          {/* <p className="text-xs sm:text-sm mt-2">🎯 Selected: {pickerColor}</p> */}
          <button
            onClick={handlePick}
            className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition motion-preset-bounce motion-delay-300"
          >
             Lock Color
          </button>
        </>
      ) : (
        <>
          <p className="mt-4 text-sm sm:text-base"> Target: {targetColor}</p>
          <p className="text-sm sm:text-base">
            {config.player1}: {guesses.p1.color} ({100 - Math.round((guesses.p1.diff / 441) * 100)}% closer)
            </p>
            <p className="text-sm sm:text-base">
            {config.player2}: {guesses.p2.color} ({100 - Math.round((guesses.p2.diff / 441) * 100)}% closer)
            </p>

          <button
            onClick={nextRound}
            className="mt-4 bg-gradient-to-r from-red-400 to-orange-500 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition motion-preset-pop motion-delay-300"
          >
             Next Round
          </button>
        </>
      )}
    </div>
  );
}

export default GameRound;
