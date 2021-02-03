import { fetchPlace } from "../actions.js";
import { connect } from "../helper/store/index.js";
import { store } from "../store.js";

const template = document.createElement("template");
template.innerHTML = `
  <span id="last-updated"></span>
  <place-select id="select"></place-select>
  <menu-list></menu-list>
`;

export default class MealApp extends HTMLElement {
  constructor() {
    super();

    // shadow dom 생성
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    this.listEl = shadow.getElementById("list");
    this.selectEl = shadow.getElementById("select");
    this.lastUpdatedEl = shadow.getElementById("last-updated");
  }

  updatePlace(pid) {
    this.selectEl.setAttribute("value", pid);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "place-id" && oldVal !== newVal) {
      this.updatePlace(newVal);
      this.store.dispatch(fetchPlace(newVal));
    }
  }

  stateChangedCallback(oldState, newState) {
    if (oldState && oldState.lastUpdated !== newState.lastUpdated)
      this.lastUpdatedEl.innerText = `최근 업데이트: ${new Date(
        newState.lastUpdated
      ).toLocaleString()}`;
  }

  static get observedAttributes() {
    return ["place-id"];
  }
}

customElements.define("meal-app", connect(MealApp, store));
