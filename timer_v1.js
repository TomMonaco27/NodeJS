//Урок 2. Цикл событий. События в Node.js
// Напишите программу, которая будет принимать на вход несколько аргументов: дату и время в
// формате « мин-час-день-месяц-год». Задача программы — создавать для каждого аргумента
// таймер с обратным отсчётом: посекундный вывод в терминал состояния таймеров (сколько
// осталось). По истечении какого-либо таймера, вместо сообщения о том, сколько осталось,
// требуется показать сообщение о завершении его работы. Важно, чтобы работа программы
// основывалась на событиях.

const EventEmitter = require('events');
var numTimerNow = 0;
var secToLocaleDateString = 0;
// опции для отображения таймера в формате DD-MM-YYYY, HH:MM:SS
var options = {
    year: 'numeric',  month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second : 'numeric',
};

const arrTimers = [
    // 1 день = 24 часа = 1440 мин = 86 400 сек, 60 мин = 3600 сек.
    // timer1
    {
        numTimer: 'timer1',  // "номер" таймера, Timer1
        timerSecLeft: 3000,         //  Сколько секунд осталось до завершения таймера, пример для теста, 1383066000000
    },
    // timer2
    {
        numTimer: 'timer2',
        timerSecLeft: 2000,         // пример для теста, 1625735334771
    },
    // timer3
    {
        numTimer: 'timer3',
        timerSecLeft: 1000,        
    }
];

const delayTimer = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
};

const generateNewTimer = () => {
    if (numTimerNow >= arrTimers.length) {
        numTimerNow = 0;
    }
    const params = arrTimers[numTimerNow];
    numTimerNow++;
    const intervalValueToShowTimer = 1000;
    return delayTimer(intervalValueToShowTimer).then(() => new Timer(params));
}


class Timer {
    constructor(params) {
        this.numTimer = params.numTimer;
        this.timerSecLeft = params.timerSecLeft;
    }
}


class Handler {
    static timer1() {
        if ((arrTimers[0].timerSecLeft === 0)) {
            console.log('Countdown timer1: Timer1 is over');
            emitterObject.removeListener('timer1', Handler.timer1);
            
        } else {
            arrTimers[0].timerSecLeft -= 1000;
            secToLocaleDateString = new Date(arrTimers[0].timerSecLeft);
            console.log('Countdown timer1: ', secToLocaleDateString.toLocaleDateString('ru', options));
        }
    }
    static timer2() {
        if ((arrTimers[1].timerSecLeft === 0)) {
            emitterObject.removeListener('timer2', Handler.timer2);
            console.log('Countdown timer2: Timer2 is over');           
        } else {
            arrTimers[1].timerSecLeft -= 1000;
            secToLocaleDateString = new Date(arrTimers[1].timerSecLeft);
            console.log('Countdown timer2: ', secToLocaleDateString.toLocaleDateString('ru', options));
        }
    }
    static timer3() {
        if ((arrTimers[2].timerSecLeft === 0)) {
            emitterObject.removeListener('timer3', Handler.timer3);
            console.log('Countdown timer3: Timer3 is over');
        } else {
            arrTimers[2].timerSecLeft -= 1000;
            secToLocaleDateString = new Date(arrTimers[2].timerSecLeft);
            console.log('Countdown timer3: ', secToLocaleDateString.toLocaleDateString('ru', options));
        }    
    }
}


class MyEmitter extends EventEmitter {};
const emitterObject = new MyEmitter();

emitterObject.on('timer1', Handler.timer1);
emitterObject.on('timer2', Handler.timer2);
emitterObject.on('timer3', Handler.timer3);

generateNewTimer().then(
    timer => emitterObject.emit(timer.numTimer, timer.numTimer, timer.timerSecLeft)
);

console.log('\n------------------------------------------');
console.log('Program "Timer"');
console.log('------------------------------------------\n');

const run = async () => {
    const timer = await generateNewTimer();
    emitterObject.emit(timer.numTimer, timer.timerSecLeft);
    run();
};
run();