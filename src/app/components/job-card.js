// Snapshot view of a job, displayed in a mechanics list of jobs
class JobCard extends HTMLElement {
  set jobCardDetails(jobCardDetails) {
    this.innerHTML = `
        <div id=${jobCardDetails.serviceGuid} class="job-card" onclick="onOpenJobDetail('${
      jobCardDetails.serviceGuid
    }')">
            <div class="card-row">
              <span class="left-col row-padding">${jobCardDetails.customerName}</span>
              <span class="${
                jobCardDetails.tagNumber ? "job-tag" : ""
              }">${jobCardDetails.tagNumber.toUpperCase()}</span>
            </div>
            <div class="card-row">
              <span class="left-col row-padding">${jobCardDetails.serviceTitle}</span> 
              <span class="row-padding">${jobCardDetails.hoursRequired} hrs</span>
            </div>  
            <div class="card-row">
              <span class="job-status">${jobCardDetails.serviceStatus}</span>
            </div>  
        </div>
        `;
  }
}

customElements.define("job-card", JobCard);
