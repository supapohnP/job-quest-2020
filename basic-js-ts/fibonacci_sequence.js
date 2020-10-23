function fib(num) {
    if(num<=1) {
        return 1;
    } else {
        var f1 = 0;
        var f2 = 1;
        var sum;
        for (var i=2; i<=num; i++) {
            sum = f1+f2;
            f1 = f2;
            f2 = sum;
        }
        return sum;
    }
}
console.log(fib(1));
console.log(fib(3));
console.log(fib(12));
