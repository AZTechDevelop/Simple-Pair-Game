import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import './PairGame.css';


import img1 from './images/Artemis.jpeg';
import img2 from './images/RedTornado.jpeg';
import img3 from './images/BartAllen.jpeg';
import img4 from './images/Batman.jpeg';
import img5 from './images/BlackCanary.jpeg';
import img6 from './images/BlueBettle.jpeg';
import img7 from './images/Bumblee.jpeg';
import img8 from './images/Halo.jpeg';
import img9 from './images/KidFlash.jpeg';
import img10 from './images/MissMartian.jpeg';
import img11 from './images/NightWing.jpeg';
import img12 from './images/Rocket.jpeg';
import img13 from './images/RoyHarper.jpeg';
import img14 from './images/StaticShock.jpeg';
import img15 from './images/StephanieBrown.jpeg';
import img16 from './images/Superboy.jpeg';
import img17 from './images/ViktorStone.jpeg';
import img18 from './images/WonderGirl.jpeg';
import img19 from './images/Zattana.jpeg';

const images = [
  img1, img2, img3, img4, img5, img6, img7, img8,
  img9, img10, img11, img12, img13, img14, img15, img16,
  img17, img18, img19
];

const generateRandomPairs = (images, pairsCount) => {
  const shuffledImages = images.sort(() => Math.random() -0.5)
  const pairs = [...shuffledImages.slice(0, pairsCount), ...shuffledImages.slice(0, pairsCount)];
  const shuffledPairs = pairs.sort(() => Math.random() - 0.5);

  const grid = [];
  while (shuffledPairs.length) {
    grid.push(shuffledPairs.splice(0, 2));
  }

  return grid;
};

const PairGame = () => {
  const pairsCount = 8; // Specifică numărul de perechi dorite
  const [grid, setGrid] = useState(generateRandomPairs(images, pairsCount));
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [showAllCards, setShowAllCards] = useState(true);

  useEffect(() => {
    if (showAllCards) {
      const timeoutId = setTimeout(() => {
        setShowAllCards(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [showAllCards]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [row1, col1] = flippedIndices[0];
      const [row2, col2] = flippedIndices[1];

      if (grid[row1][col1] === grid[row2][col2]) {
        setMatchedPairs((prev) => [...prev, grid[row1][col1]]);
      }

      setTimeout(() => setFlippedIndices([]), 400);
    }
  }, [flippedIndices, grid]);

  const handleCardClick = (row, col) => {
    if (!showAllCards && flippedIndices.length < 2) {
      setFlippedIndices((prev) => [...prev, [row, col]]);
    }
  };

  const resetGame = () => {
    setGrid(generateRandomPairs(images, pairsCount));
    setFlippedIndices([]);
    setMatchedPairs([]);
    setShowAllCards(true);
  };

  return (
    <div className="pair-game-container">
      <h1 className="m-5 text-warning">Pair Matching Game</h1>
      <div className="cards-container">
        {grid.map((row, rowIndex) =>
          row.map((image, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCardClick(rowIndex, colIndex)}
              className={`card ${showAllCards || flippedIndices.some(([row, col]) => row === rowIndex && col === colIndex) || matchedPairs.includes(image) ? 'flipped' : ''}`}
            >
              {showAllCards || flippedIndices.some(([row, col]) => row === rowIndex && col === colIndex) || matchedPairs.includes(image) ? <img src={image} alt={`Card ${rowIndex}-${colIndex}`} /> : null}
            </div>
          ))
        )}
      </div>
      <button type="button" className="btn btn-outline-warning  mt-5 px-3 py-2" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default PairGame;
