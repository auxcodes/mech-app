// Button that links to a mechanics jobs
class MechanicButton extends HTMLElement {
  set mechButton(mechanicInfo) {
    this.innerHTML = `
    <li>
      <button id=${mechanicInfo.guid} style="--mech-btn-color: ${mechanicInfo.displayColor}" class="mech-btn" title="Open Job List">${mechanicInfo.firstName}</button>
    </li>
        `;
  }
}

customElements.define("mechanic-button", MechanicButton);
