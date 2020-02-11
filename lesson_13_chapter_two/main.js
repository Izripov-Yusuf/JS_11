'use strict';

function DomElement(selector, height, width, bg, fontSize) {

  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;

  if (this.selector[0] === '.') {
    this.elem = document.createElement('div');
    this.elem.className = this.selector.substring(1);
  } else if (this.selector[0] === '#') {
    this.elem = document.createElement('p');
    this.elem.id = this.selector.substring(1);
  }

  this.elem.style.cssText = `height: ${height}px; width: ${width}px; background: ${bg}; font-size: ${fontSize}px;`;

  let body = document.querySelector('body');
  body.append(this.elem);

}

DomElement.prototype.createText = function (text) {
  this.elem.textContent = text;
};

let someElem = new DomElement('.div', 500, 500, 'green', 23);
someElem.createText('Попытка сделать домашку');

let someElem2 = new DomElement('#best', 700, 700, 'yellow', 53);
someElem2.createText('Попытка сделать домашку успешна');