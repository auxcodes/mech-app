// Button that links to a mechanics jobs
class MechanicButton extends HTMLElement {
  set mechButton(mechanicInfo) {
    this.innerHTML = `
                <button id=${mechanicInfo.guid} onclick="onOpenJobList('${mechanicInfo.guid}')" style="--mech-btn-color: ${mechanicInfo.displayColor}" class="mech-btn" title="Open Job List">${mechanicInfo.firstName}</button>
        `;
  }
}

customElements.define("mechanic-button", MechanicButton);
