// Программа "Простые числа в цвете"
// Напишите программу для вывода в консоль простых чисел, чтобы они попадали в указанный диапазон включительно. 
// При этом числа должны окрашиваться в цвета по принципу светофора:
// первое число выводится зелёным цветом;
// второе — жёлтым;
// третье — красным.
// Диапазон, куда попадут числа, указывается при запуске программы.
// Если простых чисел в диапазоне нет, нужно, чтобы программа сообщила об этом в терминале красным цветом.
// Если аргумент, переданный при запуске, не считается числом — сообщите об этом ошибкой и завершите программу.
const colors = require('colors/safe')
let i = 0;
var colors_el = 0;
colors_arr = [colors.red, colors.yellow, colors.green];
prime_arr = [];

function isPrime(n) {
    if (n < 2) { 
	return false;
    }
    var q = Math.floor(Math.sqrt(n));

    for (var i = 2; i <= q; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}
colors.enable();
console.log('----------------------------------');
console.log('Program "Prime Numbers in colors"\n');

try {
    input_number = parseInt(process.argv[2]);
  } catch (err) {
    console.log(colors_arr[0]('1. Error! Not a number')); 
  }

if (!isNaN(input_number)) {
    console.log('You entered number:\t' + colors_arr[0](input_number));
    while (i < input_number) {
        if (isPrime(i)) {
            prime_arr.push(i);
        }       
     i++;
     }
} else {
    console.log(colors_arr[0]('1. Error! Not a number'));
}

if (prime_arr.length == 0) {
    console.log(colors_arr[0]('2. Error! Not a prime number'));
} else {
    for (var j = 0; j < prime_arr.length; j++) {
        if (colors_el == colors_arr.length) {
            colors_el = 0;
        }
        console.log(colors_arr[colors_el](prime_arr[j]));
        colors_el++;
    } 
}
console.log('\nEnd of program.');
console.log('----------------------------------');
colors.disable();
