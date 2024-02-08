class ServiceItem extends HTMLElement {
  set serviceItemData(siData) {
    this.innerHTML = `
          <div id=${siData.guid} class="service-item">
                <span>${siData.label}</span>
                <span>${siData.quantity * 1}</span>
                <span>${siData.serviceHrsRequired}</span>
                <span>${"$" + siData.price}</span>
          </div>
          `;
  }
}

customElements.define("service-item", ServiceItem);
