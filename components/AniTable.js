import { fetchAnitable } from "../actions.js";
import { connect } from "../helper/store/index.js";
import { store } from "../store.js";

const template = document.createElement("template");
template.innerHTML = `
  <ul id="table"></ul>
`;

export default class AniTable extends HTMLElement {
  constructor() {
    super();

    // shadow dom 생성
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    this.tableEl = shadow.getElementById("table");
  }

  renderTable(anitable) {
    // clear node
    this.tableEl.innerHTML = "";

    for (const anime of this.store.getState().anitable) {
      const li = document.createElement("li");
      li.textContent = anime.s;
      this.tableEl.appendChild(li);
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;

    if (name === "week") this.store.dispatch(fetchAnitable(newVal));
  }

  stateChangedCallback(oldState, newState) {
    if (oldState && oldState.anitable !== newState.anitable)
      this.renderTable(newState.anitable);
  }

  static get observedAttributes() {
    return ["week"];
  }
}

customElements.define("ani-table", connect(AniTable, store));
