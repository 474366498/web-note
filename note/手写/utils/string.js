
/**
 * 7854123.211 => 7,854,123.21
 * @param {*} num 
 * @returns 
 */
function toThousandFilter(num) {
  return (+num || 0).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

console.log(toThousandFilter(7854123.211))
