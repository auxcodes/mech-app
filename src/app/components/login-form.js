class LoginForm extends HTMLElement {
  set form(formData) {
    this.innerHTML = `
        <form id="login-form" class="login-form">
            <input id="login-email-input" class="login-field" type="email" placeholder="Email Address" name="uname" value="${formData.email}" required>
            <input id="login-password-input" class="login-field" type="password" placeholder="Password" name="pword" required>
            <button id="view-password" class="login-view-btn" type="button" onclick="onViewPassword()"></button>
            <span id="login-error" class="login-error">${formData.error}</span>
            <span id="demo-text" class="demo-text">Demo Login | E: demo@demo P: demo</span>
            <button id="login-btn" class="login-btn" type="submit">Sign-In</button>
            <div id="login-footer" class="login-footer">
                <span id="login-footer-text" class="login-footer-text">©2023 cykelOS Mechanics App</span>
            </div>
        </form>
        `;
  }
}

customElements.define("login-form", LoginForm);
