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

    const savedTheme = localStorage.getItem('theme') || 'black';
    overlay.classList.toggle('white-background', savedTheme === 'white');

    overlay.addEventListener('click', () => {
        const isWhite = overlay.classList.toggle('white-background');
        localStorage.setItem('theme', isWhite ? 'white' : 'black');
        updateButtonColors();
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
    `;
    document.head.appendChild(style);

    const colorsForWhiteText = [
        '#000000', '#4B0082', '#013220', '#8B0000', '#2E8B57', 
        '#191970', '#8B4513', '#228B22', '#6B8E23', '#8B008B'
    ];

    const colorsForBlackText = [
        '#FFFFFF', '#FFFFE0', '#FFE4B5', '#FFB6C1', '#F5FFFA',
        '#E6E6FA', '#E0FFFF', '#FFDAB9', '#FFFACD', '#FAFAD2'
    ];

    let currentColorIndex = 0;
    let isWhiteTextList = true;

    function updateButtonColors() {
        const buttons = document.querySelectorAll('.mobile-button');
        const currentList = isWhiteTextList ? colorsForWhiteText : colorsForBlackText;

        buttons.forEach((button, index) => {
            const colorIndex = (currentColorIndex + index) % currentList.length;
            button.style.backgroundColor = currentList[colorIndex];
            button.style.color = isWhiteTextList ? 'white' : 'black';
        });
        currentColorIndex++;
        if (currentColorIndex >= currentList.length) {
            currentColorIndex = 0;
            isWhiteTextList = !isWhiteTextList;
        }
    }

    updateButtonColors();
    setInterval(updateButtonColors, 5000);
}

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}
