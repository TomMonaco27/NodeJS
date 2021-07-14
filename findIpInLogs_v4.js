// Программа 'Поиск IP в логах'. Program 'Find IP in Logs'
// По ссылке вы найдете файл с логами запросов к серверу весом более 2 Гб. 
// Напишите программу, которая находит в этом файле все записи с ip-адресами 89.123.1.41 и 34.48.240.111,
//  а также сохраняет их в отдельные файлы с названием “%ip-адрес%_requests.log”.
// https://drive.google.com/file/d/1A8B0eDEagkO6XlpJAinsk8_9qQTsnVly/view
// В общем случае символ переноса строки — ‘\n’. Однако, если мы работаем в Windows, наша
// программа для чтения текстовых файлов может не воспринять такой перенос строки. Это связано с
// особенностями работы Windows. В таком случае для корректной работы к символу переноса строки
// требуется добавить символ возврата каретки — ‘\r’

const fs = require('fs');
const path = require('path');

let fileToRead = './access1.log';
let encoding = 'utf-8';
let findArr = ['89.123.1.41', '34.48.240.111'];
let tempArr = [];

const rs = fs.createReadStream(fileToRead, encoding);
const ws1 = fs.createWriteStream(path.join(__dirname, findArr[0] + '_request.log'), { flags: 'a', encoding: 'utf8' });
const ws2 = fs.createWriteStream(path.join(__dirname, findArr[1] + '_request.log'), { flags: 'a', encoding: 'utf8' });


rs.on('error', () => console.log(err));
rs.on('data', (chunk) => {
    console.log('Chunk');
    tempArr = chunk.split("\n"); 
    for(let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].includes(findArr[0])) {
            ws1.write(tempArr[i]);
        }
        if (tempArr[i].includes(findArr[1])) {
            ws2.write(tempArr[i]);
        }
    }
});

    
rs.on('end', () => {
    ws1.end(() => console.log('File1 writing finished'));
    ws2.end(() => console.log('File2 writing finished')); 
    console.log('File reading finished');
    return true;
});
