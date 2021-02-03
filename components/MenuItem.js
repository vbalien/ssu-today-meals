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
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#right-area {
  display: flex;
  position: relative;
  background-color: #bd93f9;
  min-width: 200px;
  flex-grow: 0;
  justify-content: center;
}
#price {
  color: #f8f8f2;
  font-weight: bold;
  font-size: 28px;
  align-self: center;
}
#kind {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0 18px;
  padding: 10px;
  height: 50px;
  background-color: #ff79c6;
  color: #f8f8f2;
  font-weight: bold;
  font-size: 28px;
}
</style>
<div id="root">
  <div id="content"></div>
  <div id="right-area">
    <div id="kind"></div>
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
    this.kindEl = shadow.getElementById("kind");
  }

  render() {}

  get price() {
    return this.getAttribute("price");
  }

  get kind() {
    return this.getAttribute("kind");
  }

  get foods() {
    return this.getAttribute("foods");
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;

    switch (name) {
      case "price":
        this.priceEl.innerText =
          this.price.replace(/\B(?=(\d{3})+(?!\d))/, ",") + "원";
        break;
      case "foods":
        this.contentEl.innerHTML = this.foods;
        break;
      case "kind":
        this.kindEl.style.display = "block";
        this.kindEl.innerText = this.kind;
        break;
      default:
    }
  }

  static get observedAttributes() {
    return ["price", "kind", "foods"];
  }
}

customElements.define("menu-item", MenuItem);
