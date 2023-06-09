class BackButton extends HTMLElement {
  set buttonConfig(config) {
    this.innerHTML = `
        <button onclick="onBackClicked('${config.bid}')" class="back-button"></button>
        `;
  }
}

customElements.define("back-button", BackButton);
