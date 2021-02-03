import { fetchMetadata } from "../actions.js";
import { connect } from "../helper/store/index.js";
import { router } from "../main.js";
import { store } from "../store.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
#select {
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  border-radius: 18px;
  border: none;
  outline: none;
  box-shadow: 0px 0px 5px #aaa;
  background-color: #6272a4;
  color: #f8f8f2;
  font-size: 22px;
  text-align-last:center;
}
</style>
<select id="select">
  <option selected>데이터를 가져오는 중...</option>
</select>
`;

export default class PlaceSelect extends HTMLElement {
  constructor() {
    super();

    // shadow dom 생성
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    this.selectEl = shadow.getElementById("select");

    this.selectEl.addEventListener("change", this.changeSelect.bind(this));
  }

  connectedCallback() {
    this.store.dispatch(fetchMetadata());
  }

  changeSelect() {
    router.location = `/place/${this.selectEl.value}`;
  }

  updateSelect(places) {
    // clear node
    this.selectEl.innerHTML = "";

    for (const place of places) {
      const option = document.createElement("option");
      option.value = place.id;
      option.textContent = place.name;
      this.selectEl.add(option);
    }

    this.selectEl.value = this.getAttribute("value") || 1;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "value" && oldVal && oldVal !== newVal) {
      this.selectEl.value = newVal;
    }
  }

  stateChangedCallback(oldState, newState) {
    if (oldState && oldState.places !== newState.places)
      this.updateSelect(newState.places);
  }

  static get observedAttributes() {
    return ["value"];
  }
}

customElements.define("place-select", connect(PlaceSelect, store));
