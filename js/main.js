import DadJoke from "./modules/dad_joke.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const joke = new DadJoke({
    outputSelector: ".output",
    containerSelector: ".joke_container",
    // triggerSelector: '[data-action="dadJoke"]',
    speechSynthesis: true,
    animateOnUpdate: true,
    updateAnimation: "shake",
  });
  joke.setTriggers('[data-action="dadJoke"]');
});
