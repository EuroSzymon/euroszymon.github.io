const container = document.getElementById('container');
const maxObjects = 3;
let objects = [null, null, null];
let unlockedUrl = null;

const darkModeColors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A8',
    '#F9FF33', '#33FFF7', '#FF0300', '#129CFF',
    '#C012FF', '#C8FF12', '#0000FF'
];

const lightModeColors = [
    '#FF4500', '#32CD32', '#1E90FF', '#FF1493',
    '#FFD700', '#00CED1', '#FF6347', '#00BFFF',
    '#DAA520', '#98FB98', '#0000CD'
];


let predefinedColors = darkModeColors;
const usedColors = [];

let currentDraggedObject = null;
let offsetX = 0;
let offsetY = 0;

document.addEventListener('contextmenu', (event) => event.preventDefault());

document.addEventListener('DOMContentLoaded', () => {
    const checkmarks = [
        document.getElementById('book-checkmark'),
        document.getElementById('phone-checkmark')
    ];

    document.addEventListener('DOMContentLoaded', () => {
        const switcherCheckmarkColor = coloralgorithm(); 
        const modeIcon = document.getElementById('mode-icon');
    
        modeIcon.style.fill = switcherCheckmarkColor;
    });
    
    const modeSwitcher = document.getElementById('switcher-checkmark');
    modeSwitcher.addEventListener('click', () => {
        if (modeSwitcher.classList.contains('unlocked')) {
            const newMode = document.body.classList.contains('light-mode') ? 'dark' : 'light';
            setTheme(newMode);
        }
    });    
    
    checkmarks.forEach((checkmark, index) => {
        const color = coloralgorithm();
        checkmark.style.fill = color;

        const label = index === 0 ? document.getElementById('book-label') : document.getElementById('phone-label');
        label.style.color = color;
    });
    
    const modeIcon = document.getElementById('mode-icon');

    const currentMode = localStorage.getItem('theme') || 'light';
    setTheme(currentMode);

    modeSwitcher.addEventListener('click', () => {
        const newMode = document.body.classList.contains('light-mode') ? 'dark' : 'light';
        setTheme(newMode);
    });

    function setTheme(mode) {
        if (mode === 'dark') {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            modeSwitcher.classList.add('dark');
            predefinedColors = darkModeColors;
            modeIcon.innerHTML = `
                <path fill="#FFF" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12z"/>
                <circle cx="12" cy="12" r="3" fill="#FFD700" />
            `;
            document.getElementById('phone-icon').style.fill = '#FFF';
            document.getElementById('book-icon').style.fill = '#FFF';  
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            predefinedColors = lightModeColors;
            modeSwitcher.classList.remove('dark');
            modeIcon.innerHTML = `
                <circle cx="12" cy="12" r="5" fill="#FFD700" />
                <line x1="12" y1="0" x2="12" y2="4" stroke="#FFD700" stroke-width="2"/>
                <line x1="12" y1="20" x2="12" y2="24" stroke="#FFD700" stroke-width="2"/>
                <line x1="0" y1="12" x2="4" y2="12" stroke="#FFD700" stroke-width="2"/>
                <line x1="20" y1="12" x2="24" y2="12" stroke="#FFD700" stroke-width="2"/>
                <line x1="3.54" y1="3.54" x2="5.88" y2="5.88" stroke="#FFD700" stroke-width="2"/>
                <line x1="18.12" y1="18.12" x2="20.46" y2="20.46" stroke="#FFD700" stroke-width="2"/>
                <line x1="3.54" y1="20.46" x2="5.88" y2="18.12" stroke="#FFD700" stroke-width="2"/>
                <line x1="18.12" y1="5.88" x2="20.46" y2="3.54" stroke="#FFD700" stroke-width="2"/>
            `;
            document.getElementById('phone-icon').style.fill = '#000';
            document.getElementById('book-icon').style.fill = '#000';
        }

        usedColors.length = 0;
        checkmarks.forEach((checkmark, index) => {
            const color = coloralgorithm();
            checkmark.style.fill = color;
            const label = index === 0 ? document.getElementById('book-label') : document.getElementById('phone-label');
            label.style.color = color;
        });

        updateObjectColors();
        localStorage.setItem('theme', mode);
    }
});

function updateObjectColors() {
    objects.forEach((object) => {
        if (object) {
            object.style.backgroundColor = coloralgorithm();
        }
    });
}

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

function objectspawn(x, y, index) {
    if (objects[index]) return;

    const newObject = document.createElement('div');
    newObject.className = 'object';
    newObject.style.backgroundColor = coloralgorithm();
    newObject.style.position = 'absolute';
    newObject.style.left = `${x}px`;
    newObject.style.top = `${y}px`;

    newObject.addEventListener(isMobileDevice() ? 'touchstart' : 'mousedown', (event) => startdrag(event, newObject, index));
    newObject.addEventListener(isMobileDevice() ? 'touchend' : 'mouseup', stopdrag);

    container.appendChild(newObject);
    objects[index] = newObject;
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

function startdrag(event, object, index) {
    currentDraggedObject = object; 

    const touch = event.touches ? event.touches[0] : event;
    offsetX = touch.clientX - object.offsetLeft;
    offsetY = touch.clientY - object.offsetTop;

    document.addEventListener(isMobileDevice() ? 'touchmove' : 'mousemove', (e) => ondrag(e), { passive: false });
}

function ondrag(event) {
    if (!currentDraggedObject) return;

    const touch = event.touches ? event.touches[0] : event;
    currentDraggedObject.style.left = `${touch.clientX - offsetX}px`;
    currentDraggedObject.style.top = `${touch.clientY - offsetY}px`;

    buttoncollision(currentDraggedObject);
}

function stopdrag() {
    document.removeEventListener(isMobileDevice() ? 'touchmove' : 'mousemove', ondrag);
    check_buttonunlock(objects.indexOf(currentDraggedObject));
    currentDraggedObject = null;
}


function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function buttoncollision(object) {
    if (!object) return;

    const icons = [
        { icon: document.getElementById('book-icon'), checkmarkColor: document.getElementById('book-checkmark').style.fill },
        { icon: document.getElementById('phone-icon'), checkmarkColor: document.getElementById('phone-checkmark').style.fill },
        { icon: document.getElementById('switcher-checkmark'), checkmarkColor: document.getElementById('switcher-checkmark').style.fill }
    ];

    const objectRect = object.getBoundingClientRect();

    icons.forEach(({ icon }) => {
        if (!icon) return;

        const iconRect = icon.getBoundingClientRect();

        if (
            objectRect.left < iconRect.right &&
            objectRect.right > iconRect.left &&
            objectRect.top < iconRect.bottom &&
            objectRect.bottom > iconRect.top
        ) {
        }
    });
}

function isColliding(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

function objectdespawn(index) {
    if (!objects[index]) return;

    container.removeChild(objects[index]);
    objects[index] = null;
}