class JobDetailLoading extends HTMLElement {
  set jobLoading(job) {
    this.innerHtml = `
<div class="job-detail--content"><section-header>
        <header class="section-header">Service Information</header>
        <back-button>
        <button onclick="onBackClicked('jobs')" class="round-btn back-button"></button>
        </back-button></section-header><job-detail-view id="jobDetailView" class="job-detail-view">
        <div>
            <div class="job-detail--header" "="">
            <div class="job-detail--row">
                <span>Loading...</span>
                <span>Ph: ...</span>
            </div>
                <div class="job-detail--row">
                    <span>Tag: ...</span>
                    <span>Status: Loading...</span>
                </div>
                <div class="job-detail--row">
                    <span>Bike: Loading...</span>
                    <span>-----</span>
                </div>
            </div>
            <div class="job-detail--body">
                <span>Booking Comments</span>
                <span class="booking-comments">Loading...</span>
            </div>
            <div class="job-detail--package">
                <span>Service Items</span>
                <ul>
                    <li><service-item>
          <div id="0" class="service-item">
                <span>Loading...</span>
                <span>-.-</span>
                <span>$-.--</span>
          </div>
          </service-item></li><li><service-item>
          <div id="total" class="service-item">
                <span></span>
                <span>0 hrs</span>
                <span>$0</span>
          </div>
          </service-item></li>
                </ul>
            </div>
        </div>
          </job-detail-view></div>
`;
  }
}

customElements.define("job-detail-loading", JobDetailLoading);
