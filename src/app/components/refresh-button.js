class RefreshButton extends HTMLElement {
  set buttonConfig(config) {
    this.innerHTML = `
          <button onclick="onRefreshClicked('{ rid: ${config.rid}, mid: ${config.mid}')" class="round-btn refresh-button"></button>
          `;
  }
}

customElements.define("refresh-button", RefreshButton);
