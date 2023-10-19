// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let initialInput = input.question("Let's play some scrabble! Enter a word: ");

   return initialInput;
};

//Returns a simple score where every word is worth one point.
let simpleScorer = function(word){
   let simpleScore = word.length;
   return simpleScore;
};



//returns a score where vowels are worth 3 points and consonants are worth 1
let vowelBonusScorer = function(word){
   let vowelBonusScore = 0;
   for(i = 0; i < word.length; i++){

      //Hard coding for each vowel
      if(word[i].toLowerCase() === `a` || word[i].toLowerCase() === `e` || word[i].toLowerCase() === `i` 
      || word[i].toLowerCase() === `o` || word[i].toLowerCase() === `u`){
         vowelBonusScore += 3;
      }
      else{
         //adding one if it is not one of the hardcoded vowels
         vowelBonusScore += 1;
      }
   }
   return vowelBonusScore;
};

let scrabbleScorer = function(word){
   //getting object for new point structure
   let newPointStructureObject = transform(oldPointStructure);

   //final output
   let wordScore = 0;

   //console.log(newPointStructureObject);

   //First for loop for looping through each letter in the given word
   for(i = 0; i < word.length; i++){
      let currentLetter = word[i];

      //Second for loop for looping through the object to compare the current letter to the object keys
      for(const letterPoints in newPointStructureObject){

         //if they are equal add the letter's score to the total
         if(letterPoints === currentLetter.toLowerCase()){
            wordScore += newPointStructure[letterPoints[0]];

         }
      }
   }
   return wordScore;
};

//Stores all scoring Algorithms as objects with names and descriptions in an array
const scoringAlgorithms = [
   {
      //Object of simple scoring algorithm
      name: `Simple Score`,
      description: `Each letter is worth one point.`,
      scorerFunction: simpleScorer,
   },

   {
      //object of bonus vowels scoring algorithm
      name: `Bonus Vowels`,
      description: `Vowels are 3 points, consonants are 1 point.`,
      scorerFunction: vowelBonusScorer,
   },

   {
      //object of old/new scrabble scorer scoring algorithm
      name: `Scrabble`,
      description: `The traditional scoring algorithm.`,
      scorerFunction: scrabbleScorer,
      
   },

];


function scorerPrompt() {

   //returns coresponding object from the scoringAlgorithms array to the user inpup
   let selectedAlgorithm = input.question("Which sorting algortithm would you like to use?\n0 = basic scorer\n1 = vowel scorer\n2 = traditional scorer\n");
   if(selectedAlgorithm === `0`){
      return scoringAlgorithms[0];
   }
   else if(selectedAlgorithm === `1`){
      return scoringAlgorithms[1];
   }
   else if(selectedAlgorithm === `2`){
      return scoringAlgorithms[2];
   }
   else{
      //if the input isnt what is expected, default to the basic scorer
      console.log(`invalid input! We will default to the basic scorer.`);
      return scoringAlgorithms[0];
   }
}

function transform(oldPointStructure) {

   let newPointStructureTemp = {};

   for (const letterScore in oldPointStructure) {
      
    //variable used to store the value of the current key (So the value of the current array)
    let testVariable = oldPointStructure[letterScore];
   
    //sets the keys and values of the newPointStructure object. parseInt is used to make the values integers
    for (i = 0; i < testVariable.length; i++){
      newPointStructureTemp[testVariable[i].toLowerCase()] = parseInt(letterScore);
    }
   }
   
   return newPointStructureTemp;
};

//New object with indivisual parameters for each letter's point value
let newPointStructure = transform(oldPointStructure);


   /*= {a: 1,
   b: 3,
   c: 3,
   d: 2,
   e: 1,
   f: 4,
   g: 2,
   h: 4,
   i: 1,
   j: 8,
   k: 5,
   l: 1,
   m: 3,
   n: 1,
   o: 1,
   p: 3,
   q: 10,
   r: 1,
   s: 1,
   t: 1,
   u: 1,
   v: 4,
   w: 4,
   x: 8,
   y: 4,
   z: 10,
};
*/


//final runprogram function
function runProgram() {
   //collects user input for word they want to score
   let initialWord = initialPrompt();
   //lets user select which scoring algorithm to use
   let chosenScorer = scorerPrompt();
   //scores the word using the chosen scoring algorithm
   let finalScore = (chosenScorer.scorerFunction(initialWord));
   
   //final output
   console.log(`Score for "${initialWord}": ${finalScore}`);
}

//runProgram();

// Don't write any code below this line //
// And don't change these or your program will not run as expected //

module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
