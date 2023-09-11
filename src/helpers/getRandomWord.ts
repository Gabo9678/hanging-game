let word: string[] = [

    'CARRO',
    'TELEVISOR',
    'CIRCULACION',
    'HERENCIA',
    'INFECCION',
    'PANTALON'

]

export function getRandomWord(){

    const randomIndex = Math.floor( Math.random() * word.length);

    return word[randomIndex]; //randomIndex porque esta constante devuelve un numero dependiendo de la cantidad de posiciones que tenga nuestro arreglo
}