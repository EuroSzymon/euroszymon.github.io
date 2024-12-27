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

    const container = document.createElement('div');
    container.classList.add('container');
    container.id = 'container';

    const releasesButton = document.createElement('button');
    releasesButton.classList.add('button');
    releasesButton.id = 'releasesButton';
    releasesButton.textContent = 'View Releases Tab';
    releasesButton.onclick = function () {
        window.location.href = 'https://github.com/EuroSzymon/ModelViewerTest/releases';
    };

    const mobileVersionButton = document.createElement('button');
    mobileVersionButton.classList.add('button');
    mobileVersionButton.id = 'mobileVersionButton';
    mobileVersionButton.textContent = 'Switch to Mobile Version';
    mobileVersionButton.onclick = function () {
        window.location.href = 'https://euroszymon.github.io/ModelViewerTest';
    };

    container.appendChild(releasesButton);
    container.appendChild(mobileVersionButton);
    document.body.appendChild(container);

    const buttons = document.querySelectorAll('.button');
    let isRainbow = true;

    container.addEventListener('click', () => {
        if (isRainbow) {
            container.style.animation = 'none'; 
            container.style.borderColor = 'grey'; 
            buttons.forEach(button => {
                button.style.backgroundColor = 'blue'; 
                button.disabled = true;
            });
        } else {
            container.style.animation = 'rainbow-animation 5s linear infinite';
            container.style.borderColor = '';
            buttons.forEach(button => {
                button.style.backgroundColor = '';
                button.disabled = false;
            });
        }
        isRainbow = !isRainbow;
    });
})();