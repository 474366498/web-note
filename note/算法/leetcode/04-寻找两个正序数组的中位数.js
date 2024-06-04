

function find(sums1, sums2) {
  let nums = sums1.concat(sums2).sort((a, b) => a - b)
  return nums.length % 2 === 0
    ? (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2 :
    nums[Math.floor(nums.length / 2)]
}

function findMedian(arr1, arr2) {
  arr1.splice(arr1.length - 1, 0, ...arr2)
  arr1.sort((a, b) => a - b)
  if (arr1.length % 2 === 0) {
    return (arr1[arr1.length / 2 - 1] + arr1[arr1.length / 2]) / 2
  } else {
    return (arr1[Math.floor(arr1.length / 2)])
  }
}


let arr1 = [1, 3, 5, 7], arr2 = [2, 4, 6, 8]
console.log('find median ', find(arr1, arr2), findMedian(arr1, arr2))

// [1,2,3,4,5,6,7,8]
