class SectionHeader extends HTMLElement {
  set headerText(headerText) {
    this.innerHTML = `
        <header class="section-header">${headerText}</header>
        `;
  }
}

customElements.define("section-header", SectionHeader);
