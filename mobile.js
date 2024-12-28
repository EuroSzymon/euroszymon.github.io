if (isMobileDevice()) {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.innerHTML = `
        body {
            font-family: 'Inter', sans-serif;
        }
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
            animation: rainbow 3s linear infinite;
        }
    `;
    document.head.appendChild(style);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'column';
    buttonContainer.style.alignItems = 'center';
    buttonContainer.style.marginTop = '50px';

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

    document.body.appendChild(buttonContainer);
} else {
    return;
}