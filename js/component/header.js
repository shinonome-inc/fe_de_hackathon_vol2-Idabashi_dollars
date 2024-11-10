class SiteHeader extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const headerHTML = `
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet">
                <div class="header">
                    <a href="#" class="logo">
                        <img src="/assets/icons/home_logo.svg" alt="home_logo" class="logo">
                    </a>
                    <nav class="nav">
                        <a href="#" class="nav-item" data-name="event">イベント紹介</a>
                        <a href="#" class="nav-item" data-name="facility">施設紹介</a>
                        <a href="#" class="nav-item" data-name="access">アクセス・周辺紹介</a>
                        <a href="#" class="nav-item nav-item-plan" data-name="plan">プラン・価格</a>
                        <a href="#" class="nav-item-login" data-name="login">
                            <img src="/assets/icons/person_icon.svg" class="icon" alt="person"> ログイン／新規登録
                        </a>
                    </nav>
                    <div class="actions">
                        <a href="#" class="action-button reserve">
                        <div class="icon-wrapper">
                            <img src="/assets/icons/cart_icon.svg" class="cart-icon" alt="Cart">
                        </div>
                            <span class="text">予約する</span>
                        </a>
                        <a href="#" class="action-button confirm">
                            <div class="icon-wrapper">
                                <img src="/assets/icons/information_icon.svg" class="information-icon" alt="Info">
                            </div>
                            <span class="text">
                                <span class="small-text">予約済み情報を</span><br>
                                <span class="large-text">確認する</span>
                            </span>
                        </a>
                    </div>
                </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
                * {
                    font-family: "Noto Sans JP", sans-serif;
                    font-style: normal;
                }
                .header {
                    display: flex;
                    align-items: flex-start;
                    background-color: #FFFFFF;
                    height: 50px;
                    position: relative;
                    padding-left: 0;
                    overflow: visible;
                    z-index: 10;
                }
                .logo {
                    width: 100px;
                    height: 100px;
                }
                .nav {
                    flex: 1;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    height: 50px;
                }
                .nav-item, .nav-item-plan {
                    text-decoration: none;
                    color: #333;
                    font-weight: bold;
                    font-size: 14px;
                    position: relative;
                    text-align: center;
                    padding: 10px 20px;
                }
                .nav-item-login {
                    text-decoration: none;
                    color: #333;
                    font-weight: bold;
                    font-size: 14px;
                    padding: 5px 20px;
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .nav-item:hover, nav-item-plan, .nav-item-login:hover {
                    color: #555;
                }
                .nav-item.active::after, nav-item-plan::after, .nav-item-login.active::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -2px; 
                    height: 2px;
                    background-color: #333;
                }
                .icon-wrapper{
                    display: flex;
                    padding: 10px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    flex-shrink: 0;
                    border-right: 1px solid rgba(255, 255, 255, 0.70);
                }
                .icon {
                    width: 20px;
                    height: 20px;
                    padding: 10px;
                    vertical-align: middle;
                }
                .cart-icon {
                    width: 28px;
                    height: 28px;
                }
                .actions {
                    display: flex;
                    height: 100%;
                }
                .action-button {
                    display: flex;
                    align-items: center;
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 14px;
                    transition: background-color 0.3s;
                    position: relative;
                    height: 50px;
                }
                .text {
                    text-align: center;
                    width: 129px;
                }
                .small-text {
                    font-size: 10px;
                }
                .large-text {
                    font-size: 14px;
                }
                .reserve {
                    background-color: #a04a3a;
                }
                .reserve:hover {
                    background-color: #8a3f32;
                }
                .confirm {
                    background-color: #b69d3e;
                }
                .confirm:hover {
                    background-color: #9c8635;
                }
            `;

    this.shadowRoot.innerHTML = headerHTML;
    this.shadowRoot.appendChild(style);

    this.setActiveNavItem();
  }

  setActiveNavItem() {
    const path = window.location.pathname;
    const navItems = this.shadowRoot.querySelectorAll(
      ".nav-item, .nav-item-login"
    );

    navItems.forEach((item) => {
      const href = item.getAttribute("href");
      if (path.endsWith(href)) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
}

customElements.define("site-header", SiteHeader);
