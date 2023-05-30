class SectionHeader extends HTMLElement {
  set headerData(headerData) {
    this.innerHTML = `
        <header class="section-header">${headerData.headerText}</header>
        ${headerData.buttonList
          .map((button) => {
            return button.innerHTML;
          })
          .join("")}
        `;
  }
}

customElements.define("section-header", SectionHeader);
