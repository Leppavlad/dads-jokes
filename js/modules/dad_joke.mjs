class DadJoke {
  constructor({
    outputSelector,
    containerSelector,
    triggerSelector = null,
    speechSynthesis = false,
    animateOnUpdate = false,
    updateAnimation = "shake",
  }) {
    this.output = document.querySelector(outputSelector);
    this.container = document.querySelector(containerSelector);
    this.triggerSelector = triggerSelector;
    this.speechSynthesis = speechSynthesis;
    this.animateOnUpdate = animateOnUpdate;
    this.updateAnimation = updateAnimation;
    this.init();
  }
  setTriggers = (triggerSelector) => {
    const triggers = document.querySelectorAll(triggerSelector);
    triggers.forEach((item) => {
      item.addEventListener("click", this.updateOutputWithSpeech);
      item.addEventListener(
        "click",
        () => {
          this.container.classList.add("active");
        },
        { once: true }
      );
    });
  };
  init = () => {
    if (this.triggerSelector) {
      this.setTriggers(this.triggerSelector);
    }
  };
  fetchJoke = async () => {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    const { joke } = data;
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
      this[`animate_${this.updateAnimation}`](this.container);
      setTimeout(() => {
        requestAnimationFrame(() => (this.output.innerText = joke));
      }, 300);
    } else {
      this.output.innerText = joke;
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
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  };
  animate_fade = (element) => {
    let fadeIn = false,
      opacity = 100,
      opacityStep = 20;
    const fade = () => {
      setTimeout(() => {
        console.log(opacity);
        if (opacity === 0) {
          opacityStep *= -1;
          fadeIn = true;
        }
        opacity -= opacityStep;
        element.style.opacity = opacity / 100;

        if (!(opacity === 100 && fadeIn)) {
          requestAnimationFrame(fade);
        }
      }, 50);
    };
    requestAnimationFrame(fade);
  };
}

export default DadJoke;
