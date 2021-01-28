import { connect } from "../helper/store/index.js";
import { store } from "../store.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
  * {
    background-color: red;
  }
  </style>
  <div>Hello</div>
`;

export default class StudyApp extends HTMLElement {
  constructor() {
    super();

    // shadow dom 생성
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.store.dispatch({ type: "CHANGE_TITLE", value: "안녕 세상" });
  }
}

customElements.define("study-app", connect(StudyApp, store));
