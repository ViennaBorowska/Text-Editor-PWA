const installButton = document.getElementById("buttonInstall");

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
  // Store the triggered events
  window.deferredPrompt = event;

  // Remove the hidden class from the button.
  installButton.classList.toggle("hidden", false);
});

installButton.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show prompt
  promptEvent.prompt();

  // Reset the deferred prompt variable, so it can only be used once.
  window.deferredPrompt = null;

  installButton.classList.toggle("hidden", true);
});

window.addEventListener("appinstalled", (event) => {
  // Clear prompt
  window.deferredPrompt = null;
});
