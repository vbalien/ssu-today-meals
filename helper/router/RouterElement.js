const template = document.createElement("template");
template.innerHTML = `
  <slot name="route"></slot>
`;

export class RouterElement extends HTMLElement {
  constructor() {
    super();
    this.hashChange = this.hashChange.bind(this);
  }

  connectedCallback() {
    window.addEventListener("hashchange", this.hashChange);
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.hashChange);
  }

  hashChange(event) {}
}
