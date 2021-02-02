const template = document.createElement("template");
template.innerHTML = `
<style>
* {
  box-sizing: border-box;
}
#root {
  margin-top: 25px;
  border-radius: 18px;
  box-shadow: 0px 0px 5px #aaa;
  display: flex;
  overflow: hidden;
  background-color: #fff;
}
#content {
  padding: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#right-area {
  display: flex;
  padding: 10px;
  background-color: #bd93f9;
  width: 200px;
  flex-grow: 0;
  justify-content: center;
}
#price {
  color: #fff;
  font-weight: bold;
  font-size: 24pt;
  align-self: center;
}
</style>
<div id="root">
  <div id="content"></div>
  <div id="right-area">
    <span id="price"></span>
  </div>
</div>
`;
export default class MenuItem extends HTMLElement {
  constructor() {
    super();

    // shadow dom 생성
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    this.contentEl = shadow.getElementById("content");
    this.priceEl = shadow.getElementById("price");
  }

  connectedCallback() {
    console.log("connected");
  }

  render() {
    this.contentEl.innerHTML = this.getAttribute("foods");
    this.priceEl.innerText =
      this.getAttribute("price").replace(/\B(?=(\d{3})+(?!\d))/, ",") + "원";
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  static get observedAttributes() {
    return ["price", "kind", "foods"];
  }
}

customElements.define("menu-item", MenuItem);
