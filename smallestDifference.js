// Write a function that takes in two non-empty arrays of integers, fins the pair of numbers(one from each array) whose absolute different is closest to zero, and returns an array containing these two numbers, with the number from the first array in the first position.
// Note that the absolute difference of two integers is the distance between them on the real number line. For example, the absolute different of -5 and 5 is 10, and the absolute difference of -5 and -4 is 1.
// You can assume that there will only be one pair of numbers with the smallest difference.

// Sample input: arrayOne = [1, 5, 10, 20, 28, 3]
//              arrayTwo = [26, 134, 135, 15, 17]

// Sample output: [28, 26]


//Naive approach: My first intuition is to do a double for loop, to compare all possible combinations of numbers between both arrays. At each instance, we want to get the absolute difference of each combination of numbers and we want to store this result in a hash map in which the key will be the resulting value from each combination of two numbers within each of the input arrays; These two numbers will be stored as an array {result: absDiffResult , combination: [arrayOne[x], arrayTwo[y]]}. Once the loop is done, we search the hash map for the lowest value "return" key and then return that key's components value [arrayOne[x], arrayTwo[y]]. I think this should work, however, I can already tell this will be O(n^2) time complexity given the nested loop.

// function smallestDifference(arrayOne, arrayTwo) {
//   let resultsMap = {
//     result: Infinity,
//     combination: []
//   };

//   for(let i = 0; i < arrayOne.length; i++){
//     for(let j = i + 1; j < arrayTwo.length; j++) {
//       let difference = Math.abs([i] - [j]);
//       if(difference < resultsMap[result]) {
//       resultsMap.set("result", difference);
//       resultsMap.set("combination", [[i], [j]]);
//       } else {
//         continue;
//       }
//     }
//   }
//   return resultsMap[combination];
// }

//After spending some time mulling over and considering this approach, finding a double
// pointer approach I think will increase runtime efficiency and be a cleaner, easier to
// understand approach. The idea here is we sort both arrays in ascending order, then we
// create two pointers that begin at index 0 of each of the two arrays. We then loop
// through to get the absolute difference between pointers and if it's equal to 0, we just
// return the two values that the pointers are on. Otherwise, we can then set up a
// conditional to check if the value of arrayOnePointer is greater than, less than or
// equal to the value of arrayTwoPointer. We increase the index of arrayOnePointer if the
//  value of that pointer is greater than the value of arrayTwoPointer. We increase the
//  index of arrayTwoPointer if the value of that pointer is greater than the value of
//  arrayOnePointer. We then set up a conditional that if the smallest difference is
//  greater than the current difference, we make the samllest difference the current
//  difference and we set the result to equal to the value or arrayOnePointer and
//  arrayTwoPointer.


//O(nLog(n) + mLog(m)) time | O(1) space complexity

//time complexity: the sorting is responsible for the Log(n) aspect of the runtime. We are then running a loop which runs in O(n) time complexity.

//space complexity: We are sorting the arrays in constant time, without adding anything to the memory we're using. 


function smallestDifference(arrayOne, arrayTwo) {
  arrayOne.sort((a, b) => a - b);
  arrayTwo.sort((a, b) => a - b);

      let result = [];
      let arrOnePoint = 0;
      let arrTwoPoint = 0;
      let smallestDiff = Infinity;
  
  while(arrOnePoint < arrayOne.length && arrTwoPoint < arrayTwo.length) {
      let arrOneNum = arrayOne[arrOnePoint];
      let arrTwoNum = arrayTwo[arrTwoPoint];
      let currentDiff = Math.abs(arrOneNum - arrTwoNum);

      if(arrOneNum < arrTwoNum) {
        arrOnePoint++;
      } else if(arrOneNum > arrTwoNum) {
        arrTwoPoint++;
      } else return [arrOneNum, arrTwoNum]

      if(smallestDiff > currentDiff) {
        smallestDiff = currentDiff;
        result = [arrOneNum, arrTwoNum];
      }
  }
  
  return result;
}

//Below is another variation that uses Number.MIN_VALUE & Number.MAX_VALUE to represent the first instance of minimum, which is the highest possible value. This is so when the loop check for the difference the first time, it can pass the conditional and we can declare the first new minimum. Then we would check if the first pointer is smaller, greater or equal to the second pointer and increment either pointer OR just return the value of the first pointer and the value of the second pointer as the smallest difference. 


// function smallestDifference(arrayOne, arrayTwo) {
//   let min = [Number.MIN_VALUE, Number.MAX_VALUE];
  
//     arrayOne.sort((a, b) => a - b);
//     arrayTwo.sort((a, b) => a - b);
  
//     let onePoint = 0;
//     let twoPoint = 0;
//     while(onePoint < arrayOne.length && twoPoint < arrayTwo.length) {
//       let num1 = arrayOne[onePoint];
//       let num2 = arrayTwo[twoPoint];
  
//       if(Math.abs(num1 - num2) < Math.abs(min[0] - min[1])) {
//         min = [num1, num2];
//       }
  
//       if(num1 < num2) {
//         onePoint++;
//       } else if(num1 > num2) {
//         twoPoint++;
//       } else if(num1 === num2) {
//         return [num1, num2];
//       }
//     }
//     return min;
//   }