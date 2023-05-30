// Display a list of mechanics for the store
class MechanicListView extends HTMLElement {
  set mechanics(mechList) {
    console.log(mechList);
    this.innerHTML = `
    <ul>
      ${mechList
        .map((mech) => {
          return `    
        <li>
          <button id=${mech.guid} onclick="onOpenJobList('${mech.guid}')" style="--mech-btn-color: ${mech.displayColor}" class="mech-btn" title="Open Job List">${mech.firstName}</button>
        </li>
      `;
        })
        .join("")}
    </ul>
    `;
    console.log(this.innerHTML);
  }
}

customElements.define("mechanic-list-view", MechanicListView);
