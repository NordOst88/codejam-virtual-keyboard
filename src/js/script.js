/* eslint-disable object-curly-newline */
import '../scss/style.scss';

/* VARIABLES */

const wrapper = document.createElement('div');
const textarea = document.createElement('textarea');
let lang = localStorage.getItem('lang') || 'en';
let isShift = false;
let isCapsLock = false;
let prevKey;
let keyboard;
wrapper.classList.add('wrapper');
textarea.classList.add('textarea');
document.body.append(wrapper);
wrapper.append(textarea);

const paragraph = document.createElement('p');
paragraph.classList.add('description');
paragraph.innerHTML = 'Переключение языка: левыe Alt + Shift <br> OS: Windows';
document.body.append(paragraph);

const keys = [
  [
    { code: 'Backquote', en: '`', altEn: '~', ru: 'ё', altRu: 'Ё' },
    { code: 'Digit1', en: '1', altEn: '!', ru: '1', altRu: '!' },
    { code: 'Digit2', en: '2', altEn: '@', ru: '2', altRu: '"' },
    { code: 'Digit3', en: '3', altEn: '#', ru: '3', altRu: '№' },
    { code: 'Digit4', en: '4', altEn: '$', ru: '4', altRu: ';' },
    { code: 'Digit5', en: '5', altEn: '%', ru: '5', altRu: '%' },
    { code: 'Digit6', en: '6', altEn: '^', ru: '6', altRu: ':' },
    { code: 'Digit7', en: '7', altEn: '&', ru: '7', altRu: '?' },
    { code: 'Digit8', en: '8', altEn: '*', ru: '8', altRu: '*' },
    { code: 'Digit9', en: '9', altEn: '(', ru: '9', altRu: '(' },
    { code: 'Digit0', en: '0', altEn: ')', ru: '0', altRu: ')' },
    { code: 'Minus', en: '-', altEn: '_', ru: '-', altRu: '_' },
    { code: 'Equal', en: '=', altEn: '+', ru: '=', altRu: '+' },
    { code: 'Backspace', en: 'Backspace', altEn: 'Backspace', ru: 'Backspace', altRu: 'Backspace' },
  ],
  [
    { code: 'Tab', en: 'Tab', altEn: 'Tab', ru: 'Tab', altRu: 'Tab' },
    { code: 'KeyQ', en: 'q', altEn: 'Q', ru: 'й', altRu: 'Й' },
    { code: 'KeyW', en: 'w', altEn: 'W', ru: 'ц', altRu: 'Ц' },
    { code: 'KeyE', en: 'e', altEn: 'E', ru: 'у', altRu: 'У' },
    { code: 'KeyR', en: 'r', altEn: 'R', ru: 'к', altRu: 'К' },
    { code: 'KeyT', en: 't', altEn: 'T', ru: 'е', altRu: 'Е' },
    { code: 'KeyY', en: 'y', altEn: 'Y', ru: 'н', altRu: 'Н' },
    { code: 'KeyU', en: 'u', altEn: 'U', ru: 'г', altRu: 'Г' },
    { code: 'KeyI', en: 'i', altEn: 'I', ru: 'ш', altRu: 'Ш' },
    { code: 'KeyO', en: 'o', altEn: 'O', ru: 'щ', altRu: 'Щ' },
    { code: 'KeyP', en: 'p', altEn: 'P', ru: 'з', altRu: 'З' },
    { code: 'BracketLeft', en: '[', altEn: '{', ru: 'х', altRu: 'Х' },
    { code: 'BracketRight', en: ']', altEn: '}', ru: 'ъ', altRu: 'Ъ' },
    { code: 'Backslash', en: '\\', altEn: '|', ru: '\\', altRu: '/' },
  ],
  [
    { code: 'CapsLock', en: 'CapsLock', altEn: 'CapsLock', ru: 'CapsLock', altRu: 'CapsLock' },
    { code: 'KeyA', en: 'a', altEn: 'A', ru: 'ф', altRu: 'Ф' },
    { code: 'KeyS', en: 's', altEn: 'S', ru: 'ы', altRu: 'Ы' },
    { code: 'KeyD', en: 'd', altEn: 'D', ru: 'в', altRu: 'В' },
    { code: 'KeyF', en: 'f', altEn: 'F', ru: 'а', altRu: 'А' },
    { code: 'KeyG', en: 'g', altEn: 'G', ru: 'п', altRu: 'П' },
    { code: 'KeyH', en: 'h', altEn: 'H', ru: 'р', altRu: 'Р' },
    { code: 'KeyJ', en: 'j', altEn: 'J', ru: 'о', altRu: 'О' },
    { code: 'KeyK', en: 'k', altEn: 'K', ru: 'л', altRu: 'Л' },
    { code: 'KeyL', en: 'l', altEn: 'L', ru: 'д', altRu: 'Д' },
    { code: 'Semicolon', en: ';', altEn: ':', ru: 'ж', altRu: 'Ж' },
    { code: 'Quote', en: '\'', altEn: '"', ru: 'э', altRu: 'Э' },
    { code: 'Enter', en: 'Enter', altEn: 'Enter', ru: 'Enter', altRu: 'Enter' },
  ],
  [
    { code: 'ShiftLeft', en: 'Shift', altEn: 'Shift', ru: 'Shift', altRu: 'Shift' },
    { code: 'KeyZ', en: 'z', altEn: 'Z', ru: 'я', altRu: 'Я' },
    { code: 'KeyX', en: 'x', altEn: 'X', ru: 'ч', altRu: 'Ч' },
    { code: 'KeyC', en: 'c', altEn: 'C', ru: 'с', altRu: 'С' },
    { code: 'KeyV', en: 'v', altEn: 'V', ru: 'м', altRu: 'М' },
    { code: 'KeyB', en: 'b', altEn: 'B', ru: 'и', altRu: 'И' },
    { code: 'KeyN', en: 'n', altEn: 'N', ru: 'т', altRu: 'Т' },
    { code: 'KeyM', en: 'm', altEn: 'M', ru: 'ь', altRu: 'Ь' },
    { code: 'Comma', en: ',', altEn: '<', ru: 'б', altRu: 'Б' },
    { code: 'Period', en: '.', altEn: '>', ru: 'ю', altRu: 'Ю' },
    { code: 'Slash', en: '/', altEn: '?', ru: '.', altRu: ',' },
    { code: 'ArrowUp', en: '▲', altEn: '▲', ru: '▲', altRu: '▲' },
    { code: 'ShiftRight', en: 'Shift', altEn: 'Shift', ru: 'Shift', altRu: 'Shift' },
  ],
  [
    { code: 'ControlLeft', en: 'Ctrl', altEn: 'Ctrl', ru: 'Ctrl', altRu: 'Ctrl' },
    { code: 'MetaLeft', en: 'Win', altEn: 'Win', ru: 'Win', altRu: 'Win' },
    { code: 'AltLeft', en: 'Alt', altEn: 'Alt', ru: 'Alt', altRu: 'Alt' },
    { code: 'Space', en: ' ', altEn: ' ', ru: ' ', altRu: ' ' },
    { code: 'AltRight', en: 'Alt', altEn: 'Alt', ru: 'Alt', altRu: 'Alt' },
    { code: 'ArrowLeft', en: '◄', altEn: '◄', ru: '◄', altRu: '◄' },
    { code: 'ArrowDown', en: '▼', altEn: '▼', ru: '▼', altRu: '▼' },
    { code: 'ArrowRight', en: '►', altEn: '►', ru: '►', altRu: '►' },
    { code: 'ControlRight', en: 'Ctrl', altEn: 'Ctrl', ru: 'Ctrl', altRu: 'Ctrl' },
  ],
];

/* DRAW KEYBOARD */

const drawKeyboard = function drawKeyboard() {
  if (lang === 'en') {
    if (isCapsLock || isShift) {
      lang = 'altEn';
    }
  }
  if (lang === 'altEn') {
    if ((!isCapsLock && !isShift) || (isCapsLock && isShift)) {
      lang = 'en';
    }
  }
  if (lang === 'ru') {
    if (isCapsLock || isShift) {
      lang = 'altRu';
    }
  }
  if (lang === 'altRu') {
    if ((!isCapsLock && !isShift) || (isCapsLock && isShift)) {
      lang = 'ru';
    }
  }

  keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  wrapper.append(keyboard);
  keys.forEach((line) => {
    const row = document.createElement('div');
    row.classList.add('row');
    keyboard.append(row);
    line.forEach((item) => {
      const key = document.createElement('div');
      key.className = `key ${item.code.toLowerCase()}`;
      key.dataset.code = item.code;
      key.dataset.en = item.en;
      key.dataset.ru = item.ru;
      key.dataset.printable = item.printable;
      key.textContent = item[lang];
      row.append(key);
    });
  });
  return keyboard;
};

/* ADD SYMBOL */

function addSymbol(keyCode) {
  const functionalKey = ['CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight'];
  if (!functionalKey.includes(keyCode)) {
    let symbol;
    switch (keyCode) {
      case 'Space': {
        symbol = ' ';
        break;
      }
      case 'Enter': {
        symbol = '\n';
        break;
      }
      case 'Tab': {
        symbol = '\t';
        break;
      }
      case 'Backspace': {
        symbol = '';
        textarea.value = textarea.value.slice(0, textarea.value.length - 1);
        break;
      }
      default: {
        symbol = document.querySelector(`.${keyCode.toLowerCase()}`).textContent;
      }
    }
    textarea.value += symbol;
  }
}

keyboard = drawKeyboard();

/* KEY UP & DOWN */
function keyDown(keyCode) {
  switch (keyCode) {
    case 'ShiftLeft':
    case 'ShiftRight': {
      if (prevKey === 'AltLeft') {
        lang = (lang === 'ru') ? 'en' : 'ru';
      }
      if (!prevKey) {
        isShift = true;
        keyboard.remove();
        keyboard = drawKeyboard();
      }
      break;
    }
    case 'AltLeft': {
      if (prevKey === 'ShiftLeft') {
        lang = (lang === 'ru') ? 'en' : 'ru';
      }
      break;
    }
    case 'CapsLock': {
      isCapsLock = !isCapsLock;
      keyboard.remove();
      keyboard = drawKeyboard();
      break;
    }
    default:
  }
  const key = document.querySelector(`.${keyCode.toLowerCase()}`);
  if (key) {
    key.classList.add('pressed');
    addSymbol(keyCode);
  }
  prevKey = keyCode;
  localStorage.setItem('lang', lang);
}

function keyUp(keyCode) {
  if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
    isShift = false;
    keyboard.remove();
    keyboard = drawKeyboard();
  }

  const key = document.querySelector(`.${keyCode.toLowerCase()}`);
  if (key && key.classList.contains('pressed')) {
    if (keyCode !== 'CapsLock' || (keyCode === 'CapsLock' && !isCapsLock)) {
      key.classList.remove('pressed');
    }
  }
  prevKey = undefined;
}

/* PRESS KEY & CLICK */

document.addEventListener('keydown', (event) => {
  keyDown(event.code);
  event.preventDefault();
});

document.addEventListener('keyup', (event) => {
  keyUp(event.code);
  event.preventDefault();
});

document.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('key')) {
    keyDown(event.target.dataset.code);
  }
});

document.addEventListener('mouseup', (event) => {
  if (event.target.classList.contains('key')) {
    keyUp(event.target.dataset.code);
  }
});
