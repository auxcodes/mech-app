// Snapshot view of a job, displayed in a mechanics list of jobs
class JobCard extends HTMLElement {
  set jobCardDetails(jobCardDetails) {
    this.innerHTML = `
        <div id=${jobCardDetails.serviceGuid} class="job-card" onclick="onOpenJobDetail('${jobCardDetails.serviceGuid}')">
            <div class="card-row">
              <span>${jobCardDetails.customerName}</span>
              <span>${jobCardDetails.tagNumber}</span>
            </div>
            <div class="card-row">
              <span>${jobCardDetails.serviceTitle}</span>
              <span>${jobCardDetails.hoursRequired} hrs</span>
            </div>  
            <div class="card-row">
              <span>${jobCardDetails.serviceStatus}</span>
            </div>  
        </div>
        `;
  }
}

customElements.define("job-card", JobCard);
