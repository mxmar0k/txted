const butInstall = document.getElementById('buttonInstall');
let deferredPrompt; // this will store the beforeinstallprompt event

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // here we prevent the default browser prompt
  deferredPrompt = event; // then we store the event for later use
  butInstall.style.display = 'block'; // and we display the install button
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // we show the browser's installation prompt
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User declined the PWA installation');
    }
    deferredPrompt = null; // wereset the deferredPrompt
    butInstall.style.display = 'none'; // and we hide the install button
  }
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully');
  butInstall.style.display = 'none'; // we hide the install button after installation
});
