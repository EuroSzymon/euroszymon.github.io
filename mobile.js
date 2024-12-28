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
        overlay.style.backgroundColor = (overlay.style.backgroundColor === 'rgb(0, 0, 0)') ? 'white' : 'black';
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
            background-image: linear-gradient(45deg, #ff007f, #ff8c00, #fffd00, #00ff00, #00bfff, #8a2be2);
            background-size: 400% 400%;
            animation: rainbow 0.5s linear infinite;
            color: white;
        }

        @keyframes rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
}

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}
