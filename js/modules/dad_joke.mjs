class DadJoke {
  constructor({
    outputSelector,
    containerSelector,
    triggerSelector = null,
    speechSynthesis = false,
    animateOnUpdate = false,
    updateAnimation = "shake",
  }) {
    this.outputSelector = outputSelector;
    this.containerSelector = containerSelector;
    this.triggerSelector = triggerSelector;
    this.speechSynthesis = speechSynthesis;
    this.animateOnUpdate = animateOnUpdate;
    this.updateAnimation = updateAnimation;
    this.init();
  }
  setTriggers = (triggerSelector) => {
    const triggers = document.querySelectorAll(triggerSelector);
    triggers.forEach((item) =>
      item.addEventListener("click", this.updateOutputWithSpeech)
    );
  };
  init = () => {
    this.output = document.querySelector(this.outputSelector);
    if (this.triggerSelector) {
      this.setTriggers(this.triggerSelector);
    }
  };
  fetchJoke = async () => {
    const response = await fetch("https://icanhazdadjoke.com/slack");
    const data = await response.json();
    const joke = data.attachments[0].text;
    return joke;
  };
  updateOutput = async () => {
    const joke = await this.fetchJoke();

    if (this.animateOnUpdate) {
      this[`animate_${this.updateAnimation}`]();
    }

    this.output.innerText = joke;
  };
  updateOutputWithSpeech = async () => {
    const joke = await this.fetchJoke();
    if (this.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(joke);
      speechSynthesis.speak(utterance);
    }
    if (this.animateOnUpdate) {
      const container = document.querySelector(this.containerSelector);
      this[`animate_${this.updateAnimation}`](container);
      setTimeout(() => {
        this.output.innerText = `"${joke}"`;
      }, 160);
    } else {
      this.output.innerText = `"${joke}"`;
    }
  };

  animate_shake = (element) => {
    const rotate = (elem, angle) => {
      requestAnimationFrame(() => {
        elem.style.transform = `rotate(${angle}deg)`;
      });
    };
    setTimeout(() => {
      rotate(element, 10);
      setTimeout(() => {
        rotate(element, -4);
        setTimeout(() => {
          rotate(element, 8);
          setTimeout(() => {
            rotate(element, 0);
          }, 80);
        }, 80);
      }, 80);
    }, 80);
  };
}

export default DadJoke;