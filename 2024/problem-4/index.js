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
        const incOrDecArrayData = validateArrayTrend(subArray, true)
        
        if (!incOrDecArrayData.valid) { continue };

        let safeArray = true;
        let skippedOnce = incOrDecArrayData.skippedOnce;
        const arrayToValidate = incOrDecArrayData.array
        for(let j = 1; j <= arrayToValidate.length - 1; j++){
            const el = arrayToValidate[j];
            if (Math.abs(el - arrayToValidate[j - 1]) > 3 || Math.abs(el - arrayToValidate[j - 1]) < 1){
                if (j !== 1 && j !== arrayToValidate.length - 1){
                    safeArray = false;
                    break;
                }
                if ( j === 1) skippedOnce = true;
                if ( j === arrayToValidate.length - 1 && skippedOnce){
                    safeArray = false;
                    break;
                }

            }
        }
        if (!incOrDecArrayData.valid || !safeArray){
            console.log("index:", i, "consideredArray:", incOrDecArrayData.array, ", originalArr:", subArray);
        }
        if (safeArray) counter++;
    }
    console.log(counter);
});

function validateArrayTrend(arr, testSubArray) {
    let isIncreasing = true;
    let incBreakingPoints = 0;
    let isDecreasing = true;
    let decBreakingPoints = 0;
    let skipIndexDec = [];
    let skipIndexInc = [];
  
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] <= arr[i + 1]) {
        isDecreasing = false; // If one pair is increasing, it's not decreasing
        decBreakingPoints += 1;
        skipIndexDec = [i, i + 1];
      }
      if (arr[i] >= arr[i + 1]) {
        isIncreasing = false; // If one pair is decreasing, it's not increasing
        incBreakingPoints += 1;
        skipIndexInc = [i, i + 1];
      }
    }

    if (isIncreasing && !isDecreasing) return { valid: true, array: arr, skippedOnce: !testSubArray };
    if (isDecreasing && !isIncreasing) return { valid: true, array: arr, skippedOnce: !testSubArray  };

    if (!testSubArray) return { valid: false, array: arr, skippedOnce: !testSubArray };
    
    if (testSubArray){
        if (incBreakingPoints === 1){
            const filteredArray1 = arr.filter((_, index) => index !== skipIndexInc[0]);
            const response1 = validateArrayTrend(filteredArray1, false);

            const filteredArray2 = arr.filter((_, index) => index !== skipIndexInc[1]);
            const response2 = validateArrayTrend(filteredArray2, false);

            if (response1.valid) return response1;
            if (response2.valid) return response2;
        }
        if (decBreakingPoints === 1){
            const filteredArray1 = arr.filter((_, index) => index !== skipIndexDec[0]);
            const response1 = validateArrayTrend(filteredArray1, false);

            const filteredArray2 = arr.filter((_, index) => index !== skipIndexDec[1]);
            const response2 = validateArrayTrend(filteredArray2, false);

            if (response1.valid) return response1;
            if (response2.valid) return response2;
        }
    }
    
    return { valid: true, array: arr };
  }
  