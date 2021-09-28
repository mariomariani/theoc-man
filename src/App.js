import React, { useState, useEffect, useRef } from "react";
import pacman from "./pacman.png";
import cherry from "./cherry.png";
import apple from "./apple.png";
import orange from "./orange.png";
import ghost from "./ghost.png";
import pinkGhost from "./pink-ghost.png";
import ifood from "./ifood.jpeg";
import hamburguer from "./hamburguer.gif";
import megaman from "./megaman.gif";
import megamanrun from "./megamanrun.gif";
import mario8bit from "./mario8bit.gif";
import mario from "./mario.png";
import Mario8bitspulando from "./Mario8bitspulando.png";
import Goomba from "./Goomba.png";
import cogu from "./cogu.png";
import SuperMariomaker8bits from "./SuperMariomaker8bits.png";

import Mariohead from "./Mariohead.jpeg";
import superMario8bits3d from "./superMario8bits3d.jpeg";
import SuperMarioprofundidade from "./SuperMarioprofundidade.jpeg";
import SuperMarioWorldokidoki from "./SuperMarioWorld-okidoki.jpeg";

import SuperMarioWorldMarioLuigi from "./SuperMarioWorld-Mario&Luigi.png";
import paperMariopixelado from "./paperMariopixelado.png";
import Star from "./Star.png";
import sonic from "./sonic.png";
import mario64 from "./mario64.txt";
import "./App.css";

const cols = 7;
const rows = 4;

const getRandomPosition = () => Math.floor(Math.random() * cols * rows);
const getRandomFood = () => {
  const foods = [
    Mario8bitspulando,
    Goomba,
    cogu,
    SuperMariomaker8bits,
    Mariohead,
    superMario8bits3d,
    SuperMarioprofundidade,
    SuperMarioWorldokidoki,
    SuperMarioWorldMarioLuigi,
    paperMariopixelado,
    Star,
    cherry,
    apple,
    orange,
    ghost,
    pinkGhost,
    ifood,
    hamburguer,
    megaman,
    megamanrun,
    mario,
    sonic,
    mario64,
    mario8bit,
  ];
  const foodPosition = Math.floor(Math.random() * foods.length);

  return foods[foodPosition];
};

const App = () => {
  const [pacmanPosition, setPacmanPosition] = useState(0);
  const pacmanPositionRef = useRef(pacmanPosition);
  const [foodPosition, setFoodPosition] = useState(getRandomPosition());
  const foodPositionRef = useRef(foodPosition);
  const [score, setScore] = useState(0);
  const [pacmanDirection, setPacmanDirection] = useState(false);
  const [food, setFood] = useState(getRandomFood());

  const activeClass = (position) =>
    position === pacmanPosition ? "active" : "";

  const foodActiveClass = (position) =>
    position === foodPosition ? "active" : "";

  const eatFood = () => {
    setScore((s) => s + 1);

    setFoodPosition((position) => {
      let newPosition = getRandomPosition();

      while (newPosition === position) {
        newPosition = getRandomPosition();
      }

      return newPosition;
    });

    setFood(getRandomFood());
  };

  const movePacman = (newPosition) => {
    setPacmanPosition(newPosition);

    if (newPosition === foodPositionRef.current) {
      eatFood();
    }
  };

  const navigate = (direction) => {
    setPacmanDirection(direction);

    switch (direction) {
      case "ArrowUp":
        if (pacmanPositionRef.current / cols < 1) {
          return;
        }

        movePacman(pacmanPositionRef.current - cols);

        break;
      case "ArrowRight":
        if (pacmanPositionRef.current % cols === cols - 1) {
          return;
        }

        movePacman(pacmanPositionRef.current + 1);

        break;
      case "ArrowDown":
        if (pacmanPositionRef.current / cols >= rows - 1) {
          return;
        }

        movePacman(pacmanPositionRef.current + cols);

        break;
      case "ArrowLeft":
        if (pacmanPositionRef.current % cols === 0) {
          return;
        }

        movePacman(pacmanPositionRef.current - 1);

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    pacmanPositionRef.current = pacmanPosition;
  }, [pacmanPosition]);

  useEffect(() => {
    foodPositionRef.current = foodPosition;
  }, [foodPosition]);

  useEffect(() => {
    const onKeyDown = (event) => navigate(event.key);

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <div className="title">THEC-MAN</div>
      <div className="score">
        Score <span>{score}</span>
      </div>

      <div className="board">
        {Array.from(Array(cols * rows), (e, i) => {
          return (
            <div className="square" key={i}>
              <div className={`pacman ${activeClass(i)}`}>
                <img src={pacman} className={pacmanDirection} />
              </div>
              <div className={`food ${foodActiveClass(i)}`}>
                <img src={food} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
