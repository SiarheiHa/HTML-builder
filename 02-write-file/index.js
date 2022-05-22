// ВНИМАНИЕ ПРОВЕРЯЮЩЕМУ
// В Git Bash для Windows версий 2.35.1-2.35.4 присутствует баг, 
// при котором некорректно обрабатывается событие при нажатии сочетания клавиш Ctrl+C. 
// В связи с этим во второй задаче может не показываться прощальное сообщение при нажатии данного сочетания клавиш. 
// Обновите Git Bash или попробуйте запускать скрипт в другом терминале 

const fs = require('fs');
const path = require('path');
const input = process.stdin;
const output = process.stdout;
const helloMessage = 'Файл создан. Напишите что-нибудь!\n';
const byeMessage = 'Файл сохранен до следующего запуска скрипта. Удачи!';

//путь к файлу
const pathToFile = path.join(__dirname, 'text.txt');
// создали файл
fs.writeFile(pathToFile, '', (err) => {
  if (err) throw err;
});
// создали пишущий поток
const writeStream = fs.createWriteStream(pathToFile);
// Вывод в консоль приветственного сообщения
output.write(helloMessage);
// Ожидание ввода текста пользователем
input.on('data', (data) => {
  // проверка на ввод exit
  if (data.toString().trim() === 'exit') {
    process.exit();
  } else {
    writeStream.write(data.toString()); //запись в файл
  }
});
// подписка на CTRL+C
process.on('SIGINT', process.exit);
// вывод прощального сообщения при событии exit
process.on('exit', () => output.write(byeMessage));
