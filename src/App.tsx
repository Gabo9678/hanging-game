import {HangImage} from './components/HangImage'
import { letters } from './helpers/letters'
import './App.css';
import { useState } from 'react';
import {useEffect} from 'react';
import { getRandomWord } from './helpers/getRandomWord';
function App() {

  const [ word, setWord ] = useState( getRandomWord() );
  const [ hiddenWord, setHiddenWord ] = useState( '_ '.repeat( word.length));
  //useState le asigna un valor inicial a la primera variable
  const [ attempts, setAttepmts ] = useState(0);
  const [lose, setLose] = useState(false); 
  const [won, setWon] = useState(false);

  //Determinar si la persona perdio
  useEffect( () => {
    if (attempts >= 9){
      setLose( true );
    }
  }, [attempts]); //hooks

  /*Los useEffect son tareas especificas, se asigna la tarea y al final se pone la variable que el efecto tiene que estar pendiente*/

  //Determinar si la persona ganó
  useEffect(() =>{
    //creamos esta constante porque el hiddenword se encuentra con _ _ , por lo tanto, el hiddenword no seria igual al word, al hacer esto, el hiddenword es igual al word
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if ( currentHiddenWord === word){
      setWon(true);
    }
  },[hiddenWord])

  // Esto es una funcion, pero escrito de otra manera, tipo JS o react
  const checkLetter = ( letter: string) => {
    if ( lose ) return; // detiene el codigo cuando lose es true
    if ( won ) return; // detiene el codigo cuando won es true

    if ( !word.includes(letter)){ //Cuando esto no se cumpla sea verdadero
      setAttepmts( Math.min(attempts + 1, 9));
      // Le suma + 1 a los attempts hasta llegar a 9
      return;
    }
    //El split, por asi decirlo, corta la palabra en partes para crear un nuevo array
    const hiddenWordArray = hiddenWord.split(' ');

    for( let i = 0; i < word.length; i++){

      if( word[i] === letter){
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWord(hiddenWordArray.join(' '))
  }
  
  const newGame= () => {
    const newWord = getRandomWord();

    setWord( newWord );
    setHiddenWord('_ '.repeat( newWord.length));
    setAttepmts(0);
    setLose(false);
    setWon(false);
  }
  return(
   <div className='App'>


        {/* Imagenes*/}
        <HangImage ImageNumber={attempts}/>
        

        {/* Palabra oculta*/}
        <h3>{hiddenWord}</h3>

        {/*Contandor de intentos*/}
        <h3>Intentos: {attempts}</h3>

        {/*Mensaje si perdió*/}
        {
          (lose) 
          ? <h2>Perdió { word } </h2>
          : ''
        }

        {/*Mensaje si ganó*/}
        {
          (won) 
          ? <h2>Felicidades!! Usted ganó</h2>
          : ''
        }
        {/*Botones de letras*/}
        {
          letters.map( (letter) => (
            <button 
            onClick={ () => checkLetter(letter)}
            key = {letter}>
              {letter}
              </button>
          ))
        }
    <br></br>
    <button onClick={newGame}>¿Nuevo juego?</button>
    </div>
  )
};

export default App;
