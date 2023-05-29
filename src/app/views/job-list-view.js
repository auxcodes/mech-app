// View to list mechanics jobs
class JobListView extends HTMLElement {
  set jobCards(jobCards) {
    this.innerHTML = `
            ${jobCards}
        `;
  }
}

customElements.define("job-list-view", JobListView);
