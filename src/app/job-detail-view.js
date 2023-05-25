// View to display job details
class JobDetailView extends HTMLElement {
    set jobDetail(jobDetail) {
        this.innerHTML = `
        <div>
            <div class="job-detail--header"">
            <div class="job-detail--row">
                <span>${jobDetail.customerFirstName} ${jobDetail.customerLastName}</span>
                <span>Ph: ${jobDetail.customerMobile}</span>
            </div>
                <div class="job-detail--row">
                    <span>Tag: ${jobDetail.tagNumber}</span>
                    <span>Status: ${jobDetail.serviceStatus}</span>
                </div>
                <div class="job-detail--row">
                    <span>Bike: ${jobDetail.bikeMake}</span>
                    <span>${jobDetail.bikeName}</span>
                </div>
            </div>
            <div class="job-detail--body">
                <span>Booking Comments</span>
                <span class="booking-comments">${jobDetail.bookingComments}</span>
            </div>
            <div class="job-detail--package">
                <span>Service Items</span>
                <ul>
                    ${jobDetail.serviceItems.innerHTML}
                </ul>
            </div>
        </div>
          `;
    }
}

customElements.define("job-detail-view", JobDetailView);
