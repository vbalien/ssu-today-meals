import { connect } from "../helper/store/connect.js";
import { store } from "../store.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
  * {
    background-color: red;
  }
  </style>
  <div>test</div>
`;

export default class StudyApp extends HTMLElement {
  constructor() {
    super();

    // shadow dom 생성
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.store.dispatch({ type: "CHANGE_TITLE", value: "안녕 세상" });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("Custom element attributes changed.");
  }

  stateChangedCallback(oldState, newState) {
    console.log(oldState, newState);
  }

  static get observedAttributes() {
    return ["l"];
  }
}

customElements.define("study-app", connect(StudyApp, store));
