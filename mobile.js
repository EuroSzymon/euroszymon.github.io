(function () {
    function isMobileDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /mobi|android|touch|mobile/i.test(userAgent);
        const isTablet = /ipad|tablet/i.test(userAgent);
        return isMobile || isTablet;
    }

    if (!isMobileDevice()) {
        return;
    }

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

    document.addEventListener('DOMContentLoaded', () => {
        const modeSwitcher = document.getElementById('switcher-checkmark');
        const modeIcon = document.getElementById('mode-icon');
        const checkmarks = [
            document.getElementById('book-checkmark'),
            document.getElementById('phone-checkmark')
        ];

        const currentMode = localStorage.getItem('theme') || 'light';
        setTheme(currentMode);

        modeSwitcher.addEventListener('click', () => {
            const newMode = document.body.classList.contains('light-mode') ? 'dark' : 'light';
            setTheme(newMode);
        });

        function setTheme(mode) {
            predefinedColors = mode === 'dark' ? darkModeColors : lightModeColors;
            document.body.classList.toggle('dark-mode', mode === 'dark');
            document.body.classList.toggle('light-mode', mode !== 'dark');
            modeIcon.style.fill = mode === 'dark' ? '#FFF' : '#000'; 
            localStorage.setItem('theme', mode);
            updateObjectColors();
        }

        checkmarks.forEach((checkmark, index) => {
            const color = coloralgorithm();
            checkmark.style.fill = color;
            if (index === 0) {
                document.getElementById('book-label').style.color = color;
            } else {
                document.getElementById('phone-label').style.color = color;
            }
        });
    });

    function objectspawn(x, y, index) {
        if (objects[index]) return;
        if (objects.filter(obj => obj !== null).length >= maxObjects) {
            return;
        }

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
        check_buttonunlock(index);
    }

    function objectdespawn(index) {
        if (!objects[index]) return;
        container.removeChild(objects[index]);
        objects[index] = null;
    }

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

    function startdrag(event, object, index) {
        currentDraggedObject = object;

        const touch = event.touches ? event.touches[0] : event;
        offsetX = touch.clientX - object.offsetLeft;
        offsetY = touch.clientY - object.offsetTop;

        document.addEventListener(isMobileDevice() ? 'touchmove' : 'mousemove', ondrag, { passive: false });
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

    function buttoncollision(object) {
        if (!object) return;

        const icons = [
            { icon: document.getElementById('book-icon'), checkmarkColor: document.getElementById('book-checkmark').style.fill },
            { icon: document.getElementById('phone-icon'), checkmarkColor: document.getElementById('phone-checkmark').style.fill }
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
})();