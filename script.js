'use strict';

let books = document.querySelector('.books'),
    book = document.querySelectorAll('.book'),
    addBlock = document.querySelector('.adv'),
    bodyBackground = document.querySelector('body'),
    wrongTitle = document.querySelectorAll('a'),
    ul = document.querySelectorAll('ul'),
    chapters = document.querySelectorAll('li'),
    newElem = document.createElement('li');
    newElem.textContent = 'Глава 8: За пределами ES6';

// Удаляем рекламу
addBlock.remove('.adv');

// Ставим книги по порядку
books.appendChild(book[1]);
books.appendChild(book[0]);
books.appendChild(book[4]);
books.appendChild(book[3]);
books.appendChild(book[5]);
books.appendChild(book[2]);

// Заменяем фоновую картинку
bodyBackground.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

// Исправляем заголовок в книге 3
wrongTitle[4].textContent = 'Книга 3. this и Прототипы Объектов';

// Восстанавливаем порядок глав во второй и пятой книге
ul[0].insertBefore(chapters[6], chapters[4]);
ul[0].insertBefore(chapters[8], chapters[4]);
ul[0].insertBefore(chapters[2], null);
ul[0].insertBefore(chapters[10], null);

ul[5].insertBefore(chapters[54], chapters[56]);
ul[5].insertBefore(chapters[51], chapters[54]);
ul[5].insertBefore(chapters[53], chapters[51]);
ul[5].insertBefore(chapters[52], chapters[53]);
ul[5].insertBefore(chapters[48], chapters[52]);
ul[5].insertBefore(chapters[50], chapters[48]);
ul[5].insertBefore(chapters[55], chapters[49]);

ul[2].appendChild(newElem);
ul[2].insertBefore(chapters[26], null);