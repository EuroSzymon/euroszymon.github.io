const container = document.getElementById('container');
const maxObjects = 3;
let objects = [null, null, null];
let unlockedUrl = null;

const predefinedColors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A8',
    '#F9FF33', '#33FFF7', '#FF0300', '#129CFF',
    '#C012FF', '#C8FF12', '#0000FF'
];
const usedColors = [];

document.addEventListener('contextmenu', (event) => event.preventDefault());

document.addEventListener('DOMContentLoaded', () => {
    const checkmarks = [
        document.getElementById('book-checkmark'),
        document.getElementById('phone-checkmark')
    ];

    checkmarks.forEach((checkmark, index) => {
        const color = coloralgorithm();
        checkmark.style.fill = color;
        
        const label = index === 0 ? document.getElementById('book-label') : document.getElementById('phone-label');
        label.style.color = color;
    });
});

function coloralgorithm() {
    if (usedColors.length >= predefinedColors.length) usedColors.length = 0;

    let randomColor;
    do {
        const randomIndex = Math.floor(Math.random() * predefinedColors.length);
        randomColor = predefinedColors[randomIndex];
    } while (usedColors.includes(randomColor)); 

    usedColors.push(randomColor);
    return randomColor;
}

document.addEventListener('keydown', (event) => {
    if (unlockedUrl) return;

    const validKeys = ['1', '2', '3'];
    if (validKeys.includes(event.key)) {
        const objectIndex = parseInt(event.key) - 1;

        if (!objects[objectIndex]) {
            const randomX = Math.random() * (window.innerWidth - 70);
            const randomY = Math.random() * (window.innerHeight - 70);
            objectspawn(randomX, randomY, objectIndex);
        } else {
            objectdespawn(objectIndex);
        }
    }
});

function check_buttonunlock(index) {
    const checkmarkColors = [
        document.getElementById('book-checkmark').style.fill,
        document.getElementById('phone-checkmark').style.fill
    ];

    const objectColor = objects[index] ? objects[index].style.backgroundColor : null;
    if (objectColor === checkmarkColors[0]) {
        buttonunlock('https://github.com/EuroSzymon/ModelViewerTest/releases', 'book');
    } else if (objectColor === checkmarkColors[1]) {
        buttonunlock('https://euroszymon.github.io/ModelViewerTest/', 'phone');
    }
}

function buttonunlock(url, iconType) {
    if (unlockedUrl) return;

    const icon = iconType === 'book' ? document.getElementById('book-icon') : document.getElementById('phone-icon');
    icon.classList.remove('locked');
    icon.classList.add('unlocked');
    icon.style.cursor = 'pointer';

    icon.addEventListener('click', () => window.location.href = url);
    unlockedUrl = url;
}

let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let currentDraggedIndex = null;

function objectspawn(x, y, index) {
    const newObject = document.createElement('div');
    newObject.className = 'object';
    newObject.style.backgroundColor = coloralgorithm();
    newObject.style.left = `${x}px`;
    newObject.style.top = `${y}px`;

    newObject.addEventListener(isMobileDevice() ? 'touchstart' : 'mousedown', (event) => startdrag(event, newObject, index));
    newObject.addEventListener(isMobileDevice() ? 'touchend' : 'mouseup', stopdrag);

    container.appendChild(newObject);
    objects[index] = newObject;
}

function startdrag(event, object, index) {
    isDragging = true;
    currentDraggedIndex = index;

    const touch = event.touches ? event.touches[0] : event;
    offsetX = touch.clientX - object.offsetLeft;
    offsetY = touch.clientY - object.offsetTop;

    document.addEventListener(isMobileDevice() ? 'touchmove' : 'mousemove', (e) => ondrag(e, object), { passive: false });
}

function ondrag(event, object) {
    if (!isDragging) return;

    const touch = event.touches ? event.touches[0] : event;
    object.style.left = `${touch.clientX - offsetX}px`;
    object.style.top = `${touch.clientY - offsetY}px`;

    buttoncollision(object);
}

function stopdrag() {
    if (!isDragging) return;

    isDragging = false;
    document.removeEventListener(isMobileDevice() ? 'touchmove' : 'mousemove', ondrag);
    check_buttonunlock(currentDraggedIndex);
}

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function objectdespawn(index) {
    if (objects[index]) {
        container.removeChild(objects[index]); 
        objects[index] = null;
    }
}

function buttoncollision(object) {
    const icons = [
        { icon: document.getElementById('book-icon'), checkmarkColor: document.getElementById('book-checkmark').style.fill },
        { icon: document.getElementById('phone-icon'), checkmarkColor: document.getElementById('phone-checkmark').style.fill }
    ];

    icons.forEach(({ icon, checkmarkColor }) => {
        const iconRect = icon.getBoundingClientRect();
        const objectRect = object.getBoundingClientRect();
        const objectColor = object.style.backgroundColor;

        if (
            objectRect.left < iconRect.right &&
            objectRect.right > iconRect.left &&
            objectRect.top < iconRect.bottom &&
            objectRect.bottom > iconRect.top
        ) {
            if (objectColor === checkmarkColor) {
                icon.classList.remove('locked');
                icon.classList.add('unlocked');
            }
        } else {
            icon.classList.add('locked');
            icon.classList.remove('unlocked');
        }
    });
}