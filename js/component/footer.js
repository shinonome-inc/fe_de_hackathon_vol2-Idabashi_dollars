class SiteFooter extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const footerHTML = `
        <footer class="site-footer">
        <div class="border"></div>
          <div class="footer-container">
            <div class="footer-content">
              <div class="nav-section">
                <a href="/index.html" class="nav-link"><img src="/assets/icons/vector9.svg" alt="矢印" class="arrow-icon">トップ</a>
                <a href="/pages/experience.html" class="nav-link"><img src="/assets/icons/vector9.svg" alt="矢印" class="arrow-icon">イベント紹介</a>
                <a href="/pages/facility.html" class="nav-link"><img src="/assets/icons/vector9.svg" alt="矢印" class="arrow-icon">施設紹介</a>
                
                <div class="contact-info">
                  <p>- 〒100-8111 東京都千代田区千代田1-1</p>
                  <p>- 電話番号：###-####-####</p>
                </div>
              </div>
              
              <div class="nav-section">
                <a href="/pages/access.html" class="nav-link"><img src="/assets/icons/vector9.svg" alt="矢印" class="arrow-icon">アクセス</a>
                <a href="/pages/plan.html" class="nav-link"><img src="/assets/icons/vector9.svg" alt="矢印" class="arrow-icon">価格・プラン</a>
              </div>
            </div>
            <div class="button-section">
                <a href="#" class="button faq">
                  <img
                    src="/assets/icons/help.svg"
                    alt="質問マーク"
                    class="help-icon"
                  />
                  よくある質問
                </a>
              </div>
          </div>
          <div class="border"></div>
          <div class="copyright">
            <p>©2024 Idabashi-dollars Inc.</p>
          </div>
        </footer>
      `;

    const style = document.createElement("style");
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');
  
        .site-footer {
          padding: 10px;
            padding-right: 100px;
            padding-left: 100px;
            font-family: "Noto Sans JP";
            background: rgba(255, 255, 255, 0.81);
        }
  
        .border {
          border-top: 1px solid #000;
          border-bottom: 1px solid #000;
    }
        .footer-container {
            padding-left: 50px;

            display: flex;
            flex-direction: row;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 10px;
          padding: 0 40px;
          margin: 0 auto;
          padding: 10px;
        }
  
        .footer-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column: span 2;
        }
  
        .nav-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px;
        }
  
        .nav-link {
          color: #000;
          text-decoration: none;
          padding: 5px 0;
          white-space: nowrap;
        }
  
        .button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          color: #000;
          text-decoration: none;
          width: 200px;
          white-space: nowrap;
        }
  
        .button.faq {
          gap: 5px;
          background: #BEBEBE;
          font-size: 14px;
        }
        .button.english {
            gap: 5px;
            background: #D1D1D1;
            }
  
  
        .contact-info {
          margin-top: 20px;
        }
  
        .contact-info p {
          margin: 5px 0;
          white-space: nowrap;
          color: #515151;
        }
  
        .copyright {
          text-align: right;
          padding: 10px 40px;
          color: #515151;
        }
  
        .arrow-icon {
          width: 8px;
          height: 7px;
          margin-right: 5px;
        }
  
        .help-icon {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
  
          
          .copyright {
            padding: 10px 20px;
          }
        }
  
          .footer-content {
            grid-column: 1;
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .button-section {
            align-items: stretch;
          }
          
          .button {
            width: 240px;
          }
          
          .copyright {
            text-align: right;
          }
        }
      `;

    this.shadowRoot.innerHTML = footerHTML;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define("site-footer", SiteFooter);
