// Display a list of mechanics for the store
class MechanicListView extends HTMLElement {
  set mechButtons(mechanicButtons) {
    this.innerHTML = `${mechanicButtons}`;
  }
}

customElements.define("mechanic-list-view", MechanicListView);
