const fs = require('fs');

// Read the input file
file_path = 'input.txt'
fs.readFile(file_path, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the data into lines and convert each line into an array of numbers
  const array2D = data
    .trim() // Remove any trailing whitespace
    .split('\n') // Split by lines
    .map(line => 
      line
        .trim() // Remove any leading/trailing whitespace in each line
        .split(' ') // Split by spaces
        .map(Number) // Convert each element to a number
    );

    counter = 0;
    for(let i = 0; i <= array2D.length - 1; i++){
        const subArray = array2D[i];
        const incOrDecArray = validateArrayTrend(subArray)
        console.log("inc or dec for index:", i, incOrDecArray);
        
        if (!incOrDecArray) { continue };

        let safeArray = true;
        for(let j = 1; j <= subArray.length - 1; j++){
            const el = subArray[j];
            if (Math.abs(el - subArray[j - 1]) > 3 || Math.abs(el - subArray[j - 1]) < 1){
                safeArray = false;
                break;
            }
        }
        if (safeArray) counter++;
    }
    console.log(counter);
});

function validateArrayTrend(arr) {
    let isIncreasing = true;
    let isDecreasing = true;
  
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < arr[i + 1]) {
        isDecreasing = false; // If one pair is increasing, it's not decreasing
      } else if (arr[i] > arr[i + 1]) {
        isIncreasing = false; // If one pair is decreasing, it's not increasing
      }
    }
    if (!isIncreasing && !isDecreasing) return false;
    if (isIncreasing && isDecreasing) return false;
    if (isIncreasing) return true
    if (isDecreasing) return true
    
    return false
  }
  