arr = [3,2,4,1,5,6]
// [1,2,3,4,5,6]

function bubbleSort(arr){
  for (i = 0; i < array.length; i++) {
    for (j = 0; j < array.length-1; j++) {
      if (arr[j]>arr[j+1]){
        let lesser = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = lesser
      }
    }
  }
  return arr
}
