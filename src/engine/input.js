(function () {
  window.THBA = window.THBA || {};

  class Input {
    constructor() {
      this.down = new Set();
      this.pressed = new Set();
      window.addEventListener("keydown", (event) => {
        const key = this.normalize(event.key);
        if (!this.down.has(key)) this.pressed.add(key);
        this.down.add(key);
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Shift"].includes(event.key)) {
          event.preventDefault();
        }
      });
      window.addEventListener("keyup", (event) => {
        this.down.delete(this.normalize(event.key));
      });
    }

    normalize(key) {
      if (key === " ") return "space";
      return key.toLowerCase();
    }

    isDown(...keys) {
      return keys.some((key) => this.down.has(this.normalize(key)));
    }

    wasPressed(...keys) {
      return keys.some((key) => this.pressed.has(this.normalize(key)));
    }

    endFrame() {
      this.pressed.clear();
    }
  }

  window.THBA.Input = Input;
})();
