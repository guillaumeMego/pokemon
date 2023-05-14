import React, { useEffect, useState } from "react";
import './letters.css';

function Letters(props) {
  const [selectedLetter, setSelectedLetter] = useState(null);


  const handleButtonClick = (letter) => {
    setSelectedLetter(letter.toUpperCase());
    props.onLetterSelected(letter.toUpperCase());
  };

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      const letter = event.key;
      handleButtonClick(letter);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLetter]);

  return (
    <div className="letters">
      <div className="first-line">
        <button className="letters-key" onClick={() => handleButtonClick('a')}>A</button>
        <button className="letters-key" onClick={() => handleButtonClick('z')}>Z</button>
        <button className="letters-key" onClick={() => handleButtonClick('e')}>E</button>
        <button className="letters-key" onClick={() => handleButtonClick('r')}>R</button>
        <button className="letters-key" onClick={() => handleButtonClick('t')}>T</button>
        <button className="letters-key" onClick={() => handleButtonClick('y')}>Y</button>
        <button className="letters-key" onClick={() => handleButtonClick('u')}>U</button>
        <button className="letters-key" onClick={() => handleButtonClick('i')}>I</button>
        <button className="letters-key" onClick={() => handleButtonClick('o')}>O</button>
        <button className="letters-key" onClick={() => handleButtonClick('p')}>P</button>
      </div>
      <div className="second-line">
        <button className="letters-key" onClick={() => handleButtonClick('q')}>Q</button>
        <button className="letters-key" onClick={() => handleButtonClick('s')}>S</button>
        <button className="letters-key" onClick={() => handleButtonClick('d')}>D</button>
        <button className="letters-key" onClick={() => handleButtonClick('f')}>F</button>
        <button className="letters-key" onClick={() => handleButtonClick('g')}>G</button>
        <button className="letters-key" onClick={() => handleButtonClick('h')}>H</button>
        <button className="letters-key" onClick={() => handleButtonClick('j')}>J</button>
        <button className="letters-key" onClick={() => handleButtonClick('k')}>K</button>
        <button className="letters-key" onClick={() => handleButtonClick('l')}>L</button>
        <button className="letters-key" onClick={() => handleButtonClick('m')}>M</button>
      </div>
      <div className="third-line">
      <button className="invisible" onClick={() => handleButtonClick('n')}>N</button>
        <button className="invisible" onClick={() => handleButtonClick('n')}>N</button>
        <button className="letters-key" onClick={() => handleButtonClick('w')}>W</button>
        <button className="letters-key" onClick={() => handleButtonClick('x')}>X</button>
        <button className="letters-key" onClick={() => handleButtonClick('c')}>C</button>
        <button className="letters-key" onClick={() => handleButtonClick('v')}>V</button>
        <button className="letters-key" onClick={() => handleButtonClick('b')}>B</button>
        <button className="letters-key" onClick={() => handleButtonClick('n')}>N</button>
        <button className="invisible" onClick={() => handleButtonClick('n')}>N</button>
        <button className="invisible" onClick={() => handleButtonClick('n')}>N</button>
      </div>
    </div>
  );
}

export default Letters;
