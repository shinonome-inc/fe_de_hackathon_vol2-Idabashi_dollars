class SiteHeader extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const 名前HTML = `
        //  html
        `;

    const style = document.createElement("style");
    style.textContent = `
        //   css
    
        `;

    this.shadowRoot.innerHTML = 名前HTML;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define("名前", SiteHeader);

// 名前はコンポーネントの名前を指定

// html内での使用方法
//  html
//  <名前></名前>
