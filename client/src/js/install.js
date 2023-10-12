const butInstall = document.getElementById("buttonInstall");

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false); // this displays the install button
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }

    promptEvent.prompt();

    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true); // this hdes the install button
});

window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
    butInstall.style.display = 'none'; // this hides the install button after installation
});
