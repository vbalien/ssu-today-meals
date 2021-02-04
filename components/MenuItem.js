const template = document.createElement("template");
template.innerHTML = `
<style>
* {
  box-sizing: border-box;
}
#root {
  position: relative;
  margin-top: 25px;
  border-radius: 18px;
  box-shadow: 0px 0px 5px #aaa;
  display: flex;
  overflow: hidden;
  background-color: #fff;
}
#content {
  padding: 20px;
  padding-top: 60px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#image {
  display: none;
  width: 240px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
#tag {
  position: absolute;
  display: flex;
  font-size: 22px;
  left: 0;
  top: 0;
}
#price {
  height: 40px;
  padding: 10px;
  background-color: #bd93f9;
  color: #f8f8f2;
  font-weight: bold;
  align-self: center;
  border-radius: 0 0 18px 0;
}
#kind {
  display: none;
  padding: 10px;
  height: 40px;
  background-color: #ff79c6;
  color: #f8f8f2;
  font-weight: bold;
}
</style>
<div id="root">
  <div id="tag">
    <div id="kind"></div>
    <div id="price"></div>
  </div>
  <div id="content"></div>
  <div id="image">
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
    this.imageEl = shadow.getElementById("image");
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

  get image() {
    return this.getAttribute("image");
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
      case "image":
        this.imageEl.style.display = "block";
        this.imageEl.style.backgroundImage = `url('${this.image}')`;
        break;
      case "kind":
        this.kindEl.style.display = "block";
        this.kindEl.innerText = this.kind;
        break;
      default:
    }
  }

  static get observedAttributes() {
    return ["price", "kind", "foods", "image"];
  }
}

customElements.define("menu-item", MenuItem);
