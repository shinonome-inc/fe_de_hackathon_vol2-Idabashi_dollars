class SiteHeader extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const headerHTML = `
        <nav class="header-nav">
          <ul class="nav-list">
            <li><a href="index.html">TOP</a></li>
            <li><a href="glamping.html">グランピング紹介</a></li>
            <li><a href="facility.html">施設紹介</a></li>
            <li><a href="plan.html">プラン・価格</a></li>
            <li><a href="access.html">アクセス・周辺紹介</a></li>
            <li><a href="reservation.html">予約ページ</a></li>
          </ul>
        </nav>
      `;

    const style = document.createElement("style");
    style.textContent = `
        .header-nav {
          background-color: #000; 
          padding: 20px 0;
          text-align: center;
        }
  
        .nav-list {
          list-style: none;
          display: flex;
          justify-content: space-around;
          margin: 0;
          padding: 0;
        }
  
        .nav-list li {
          margin: 0 15px;
        }
  
        .nav-list a {
          color: #fff; 
          text-decoration: none;
          font-size: 1.2em;
          transition: color 0.3s;
        }
  
      `;

    this.shadowRoot.innerHTML = headerHTML;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define("site-header", SiteHeader);
