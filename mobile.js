if (isMobileDevice()) {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.innerHTML = `
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
        }

        .button-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: auto;
        }

        .mobile-button {
            display: inline-block;
            padding: 15px 30px;
            margin: 10px;
            font-size: 16px;
            text-align: center;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            transition: transform 0.2s ease;
            color: white;
            font-family: 'Inter', sans-serif;
            animation: rainbowButton 10s ease infinite;
        }

        .mobile-button:hover {
            transform: scale(1.1);
        }

        .mobile-button:active {
            transform: scale(0.95);
        }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 1);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            pointer-events: none;
        }

        .theme-switcher {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 25px;
            color: white;
            z-index: 2000;
        }

        .theme-switcher.dark {
            color: yellow;
        }

        @keyframes rainbowButton {
            0% { background-color: #FF5733; }
            10% { background-color: #FF8C00; }
            20% { background-color: #FFEC00; }
            30% { background-color: #33FF57; }
            40% { background-color: #33B5FF; }
            50% { background-color: #3357FF; }
            60% { background-color: #8A33FF; }
            70% { background-color: #FF33A8; }
            80% { background-color: #F9FF33; }
            90% { background-color: #33FFF7; }
            100% { background-color: #FF0300; }
        }

        .pc-buttons {
            display: none;
        }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const modeSwitcherButton = document.createElement('button');
    modeSwitcherButton.classList.add('theme-switcher');
    modeSwitcherButton.innerHTML = '🌙';
    modeSwitcherButton.addEventListener('click', toggleTheme);

    document.body.appendChild(modeSwitcherButton);
    document.body.appendChild(overlay);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const button1 = document.createElement('button');
    button1.classList.add('mobile-button');
    button1.innerHTML = 'View Releases Tab';
    button1.onclick = () => window.location.href = 'https://github.com/EuroSzymon/ModelViewerTest/releases';
    buttonContainer.appendChild(button1);

    const button2 = document.createElement('button');
    button2.classList.add('mobile-button');
    button2.innerHTML = 'Continue';
    button2.onclick = () => window.location.href = 'https://euroszymon.github.io/ModelViewerTest/';
    buttonContainer.appendChild(button2);

    document.body.appendChild(buttonContainer);

    const pcButtons = document.querySelectorAll('.pc-buttons');
    pcButtons.forEach(button => button.style.display = 'none');
}

function toggleTheme() {
    const overlay = document.querySelector('.overlay');
    const modeSwitcherButton = document.querySelector('.theme-switcher');

    if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        modeSwitcherButton.classList.add('dark');
        modeSwitcherButton.innerHTML = '☀️';
        localStorage.setItem('theme', 'dark');
        changeTextColor('dark');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        modeSwitcherButton.classList.remove('dark');
        modeSwitcherButton.innerHTML = '🌙';
        localStorage.setItem('theme', 'light');
        changeTextColor('light');
    }
}

function changeTextColor(theme) {
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');

    textElements.forEach((element) => {
        const backgroundColor = getComputedStyle(element).backgroundColor;

        if (isDarkColor(backgroundColor)) {
            element.style.color = 'white'; 
        } else {
            element.style.color = 'black'; 
        }
    });
}

function isDarkColor(rgb) {
    const darkColors = ['rgb(0, 0, 0)', 'rgb(51, 51, 51)', 'rgb(68, 68, 68)']; 
    return darkColors.includes(rgb);
}

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}