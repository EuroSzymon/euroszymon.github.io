if (isMobileDevice()) {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.innerHTML = `
        body {
            font-family: 'Inter', sans-serif; /* Apply Inter font globally */
            margin: 0;
            padding: 0;
        }
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        /* Mobile button styles */
        .mobile-button {
            display: inline-block;
            padding: 15px 30px;
            margin: 10px;
            background-color: #FF5733;
            color: white;
            font-size: 16px;
            text-align: center;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            font-family: 'Inter', sans-serif;
        }
        .mobile-button:hover {
            background-color: #FF33A8;
            transform: scale(1.1);
        }
        .mobile-button:active {
            transform: scale(0.95);
        }
        @keyframes rainbow {
            0% { background-color: #FF5733; }
            14% { background-color: #33FF57; }
            28% { background-color: #3357FF; }
            42% { background-color: #FF33A8; }
            57% { background-color: #F9FF33; }
            71% { background-color: #33FFF7; }
            85% { background-color: #FF0300; }
            100% { background-color: #129CFF; }
        }
        .rainbow-background {
            animation: rainbow 0.5s linear infinite; /* Slower animation, 0.5s duration */
        }
    `;
    document.head.appendChild(style);

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
    button2.innerHTML = 'Switch to Mobile Version';
    button2.onclick = () => window.location.href = 'https://euroszymon.github.io/ModelViewerTest/';
    buttonContainer.appendChild(button2);

    overlay.appendChild(buttonContainer);

    document.body.appendChild(overlay);
}
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}
