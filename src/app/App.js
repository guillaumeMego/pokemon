import './App.css';
import React, { useEffect, useState } from 'react';

import Letters from '../components/letters/Letters';
import PokemonList from '../components/words/PokemonList';

function App() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedPokemonName, setSelectedPokemonName] = useState(null);
  const [letterCorrect, setLetterCorrect] = useState([]);
  const [letterIncorrect, setLetterIncorrect] = useState([]);
  const [life, setLife] = useState(7);

  const handleLetterSelected = (letter) => {
    setSelectedLetter(letter);
  };

  useEffect(() => {
    if (selectedLetter && selectedPokemonName) {
      if (selectedPokemonName.includes(selectedLetter)) {
        if (letterCorrect.includes(selectedLetter)) {
          return;
        }
        setLetterCorrect((prevLetterCorrect) => [...prevLetterCorrect, selectedLetter]);
        // changer la couleur de la lettre par la classe css letter-correct

        checkedWord(selectedPokemonName, letterCorrect);
      } else {
        if (letterIncorrect.includes(selectedLetter)) {
          // enlever une vie
          setLife(life - 1);
          // afficher le nombre de vie restante
          let image = document.querySelectorAll('.image');
          image[life].style.display = 'none';
          return;
        }
        setLetterIncorrect((prevLetterIncorrect) => [...prevLetterIncorrect, selectedLetter]);
        checkLose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLetter, selectedPokemonName, letterCorrect, letterIncorrect]);

  function checkedWord(selectedPokemonName, letterCorrect) {
    const pokemonNameArray = selectedPokemonName.split('');

    const pokemonNameArrayWithUnderscore = pokemonNameArray.map((letter) => {

      if (letterCorrect.includes(letter)) {
        return letter;

      } else {
        return '_ ';
      }
    });
    return pokemonNameArrayWithUnderscore.join('');
  }

  // verifier si toute les lettres ont été trouvé
  function checkWin() {
    if (selectedPokemonName) {
      const pokemonNameArray = selectedPokemonName.split('');
      if (pokemonNameArray.every((letter) => letterCorrect.includes(letter))) {
        //remise a zero des lettres

        // créer une modal pour dire que l'on a gagné et afficher le pokemn dans la moal
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
        <div class="modal-content">
          <h2>Vous avez gagné !</h2>
          <p>Le pokemon était ${selectedPokemonName}</p>
          <button class="button" onclick="window.location.reload()">Rejouer</button>
        </div>
        `;
        document.querySelector('img').style.transform = 'scale(0.5)';
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        document.body.appendChild(modal);
        setLetterCorrect([]);
        setLetterIncorrect([]);
        setSelectedPokemonName(null);
        document.querySelector('.button').addEventListener('enter', () => {
          window.location.reload();
        })



      }
    }

  }

  function checkLose() {
    if (selectedPokemonName) {
      if (letterIncorrect.length === 7) {
        //remise a zero des lettres
        let image = document.querySelectorAll('.image');
          image[life].style.display = 'none';
        // créer une modal pour dire que l'on a perdu et afficher le pokemn dans la moal
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
        <div class="modal-content">
          <h2>Vous avez perdu !</h2>
          <p>Le pokemon était ${selectedPokemonName}</p>
          <button class="button" onclick="window.location.reload()">Rejouer</button>
        </div>
        `;
        document.querySelector('img').style.transform = 'scale(0.5)';
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        document.body.appendChild(modal);
        setLetterCorrect([]);
        setLetterIncorrect([]);
        setSelectedPokemonName(null);




      }
    }

  }

  return (
    <div className="App">
      <div className="header">
        <div className="title">
          <h1>Jeu du Pendu</h1>
          <img src={process.env.PUBLIC_URL + '/img/pokemon.png'} alt="" />
        </div>
      </div>
      <div className="container">
        <div className="haut">
          <h3>Nombre de vie :</h3>
          <div className="img"> 
            <img src={process.env.PUBLIC_URL + '/img/pika.png'} alt="" className='image'/>
            <img src={process.env.PUBLIC_URL + '/img/pika.png'} alt="" className='image'/>
            <img src={process.env.PUBLIC_URL + '/img/pika.png'} alt="" className='image'/>
            <img src={process.env.PUBLIC_URL + '/img/pika.png'} alt="" className='image'/>
            <img src={process.env.PUBLIC_URL + '/img/pika.png'} alt="" className='image'/>
            <img src={process.env.PUBLIC_URL + '/img/pika.png'} alt="" className='image'/>
            <img src={process.env.PUBLIC_URL + '/img/pika.png'} alt="" className='image'/>
            <img src={process.env.PUBLIC_URL + '/img/pika.png'} alt="" className='image'/></div>
            <div className="motcache">
          <PokemonList onPokemonSelected={setSelectedPokemonName} />
          
         {selectedPokemonName && <p>{checkedWord(selectedPokemonName, letterCorrect)}</p>}
          </div>
          
         
        </div>
        <div className="lettre">
          <Letters
            onLetterSelected={handleLetterSelected}
            letterCorrect={letterCorrect}
            letterIncorrect={letterIncorrect}
          />
        </div>
      </div>
      {checkWin()}

    </div>
  );
}

export default App;
