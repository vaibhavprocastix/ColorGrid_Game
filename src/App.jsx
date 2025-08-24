import React, { useState } from 'react';
import Home from './components/Home';
import GameSetup from './components/GameSetup';
import GameRound from './components/GameRound';
import FinalResults from './components/FinalResults';

function App() {
  const [gameState, setGameState] = useState('home'); // now: home → setup → round → result
  const [config, setConfig] = useState(null);
  const [scores, setScores] = useState([]);

  const handleGoSetup = () => {
    setGameState('setup');
  };

  const handleStartGame = (setupData) => {
    setConfig({ ...setupData, currentRound: 1 });
    setScores([]);
    setGameState('round');
  };

  const handleNextRound = (roundScore) => {
    const newScores = [...scores, roundScore];
    if (newScores.length === config.rounds) {
      setScores(newScores);
      setGameState('result');
    } else {
      setScores(newScores);
      setConfig((prev) => ({
        ...prev,
        currentRound: prev.currentRound + 1,
      }));
    }
  };

  const handleRestart = () => {
    setGameState('home');
    setConfig(null);
    setScores([]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {gameState === 'home' && <Home onStart={handleGoSetup} />}
      {gameState === 'setup' && <GameSetup onStart={handleStartGame} />}
      {gameState === 'round' && (
        <GameRound config={config} onNext={handleNextRound} />
      )}
      {gameState === 'result' && (
        <FinalResults scores={scores} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
