if (isMobileDevice()) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const buttonContainer = document.createElement('div');
    buttonContainer.style.textAlign = 'center';

    const button1 = document.createElement('button');
    button1.classList.add('mobile-button', 'rainbow-background');
    button1.innerHTML = 'View Releases Tab';
    button1.onclick = () => window.location.href = 'https://github.com/EuroSzymon/ModelViewerTest/releases';
    buttonContainer.appendChild(button1);

    const button2 = document.createElement('button');
    button2.classList.add('mobile-button', 'rainbow-background');
    button2.innerHTML = 'Continue';
    button2.onclick = () => window.location.href = 'https://euroszymon.github.io/ModelViewerTest/';
    buttonContainer.appendChild(button2);

    overlay.appendChild(buttonContainer);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        overlay.classList.toggle('white-background');
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: background-color 0.5s ease;
        }

        .overlay.white-background {
            background-color: white;
        }

        .mobile-button {
            padding: 15px 30px;
            font-size: 18px;
            border: none;
            border-radius: 8px;
            margin: 10px;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            transition: background 2s ease, transform 0.2s ease;
        }

        .mobile-button:hover {
            transform: scale(1.1);
        }

        .rainbow-background {
            background-color: red;
            color: white;
            animation: rainbowFade 6s infinite ease-in-out;
        }

        @keyframes rainbowFade {
            0% { background-color: #ff007f; } 
            15% { background-color: #ff8c00; }
            30% { background-color: #fffd00; }
            45% { background-color: #00ff00; } 
            60% { background-color: #00bfff; } 
            75% { background-color: #8a2be2; } 
            100% { background-color: #ff007f; } 
        }
    `;
    document.head.appendChild(style);
}

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}
