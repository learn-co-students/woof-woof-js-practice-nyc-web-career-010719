console.log("hello")


function mysort(array){
  sortedArray = []

}


array = [2,3,1,6,9,8]

function sort(numArray){
newArray = []
  for(let i=0; i<numArray.length; i++){
  numArray.forEach(function(number){
    if(number === Math.min(numArray)){
      numArray.remove(number)
      newArray.push(number)
    }
  })
  }
  return newArray
  return numArray
}

sort(array)



for(let i=0; i<array.length; i++){
  if(array[i] < array[i+1]){
    array[i] = array[i]
  }
  else{array[i] = array[i+1]}
}


// 1) iterate through array, if element is smallest value in array, remove element from current araray and push to new array
// 2) iterate through array, if element a < elemenet b, set element a to be the index
