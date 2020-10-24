function shift (arr, set, n) {
    const i = arr.length - n;
    if (set == 'left') {
        const front = arr.slice(0, i);
        const back = arr.slice(i);
        return back.concat(front);
    } else if (set == 'right') {
        const back = arr.slice(0, i);
        const front = arr.slice(i);
        return front.concat(back);
    } 
}

console.log(shift(['john','jane','sarah','alex'], 'left',2));
console.log(shift([1,2,3,4,5], 'right',3));