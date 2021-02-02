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
  text-align: center;
}
</style>
<div id="root">
  <div id="content"></div>
</div>
`;
export default class MenuBlank extends HTMLElement {
  constructor() {
    super();
    // shadow dom 생성
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    this.contentEl = shadow.getElementById("content");
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "value") {
      this.contentEl.innerText = newVal;
    }
  }

  static get observedAttributes() {
    return ["value"];
  }
}

customElements.define("menu-blank", MenuBlank);
