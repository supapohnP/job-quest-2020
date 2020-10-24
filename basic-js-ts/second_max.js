function secondMax(arr) {
    if (!arr || !arr.length) {
        return "Error!";
    } else {
        let max = -Infinity, result = -Infinity;
        for (const value of arr) {
            const nr = Number(value)
            if (nr > max) {
                [result, max] = [max, nr]
            } else if (nr < max && nr > result) {
                result = nr;
            }
        }
        if (result == -Infinity) {
            max = Math.max.apply(null, arr);
            return max;
        } else {
            return result;
        }
    }
}
  
console.log(secondMax([2,3,4,5]));
console.log(secondMax([9,2,21,21]));
console.log(secondMax([4,4,4,4]));
console.log(secondMax([4123]));
console.log(secondMax([]));