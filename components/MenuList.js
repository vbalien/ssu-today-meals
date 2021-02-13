import { connect } from "../helper/store/index.js";
import { store } from "../store.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
#list {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
</style>
<div id="list"></div>
`;
export default class MenuList extends HTMLElement {
  constructor() {
    super();

    // shadow dom 생성
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    this.nameEl = shadow.getElementById("name");
    this.listEl = shadow.getElementById("list");
  }

  updateList(menus) {
    this.listEl.innerHTML = "";

    if (menus.length === 0) {
      const listItem = document.createElement("menu-blank");
      listItem.setAttribute("value", "오늘은 쉽니다.");
      this.listEl.appendChild(listItem);
      return;
    }
    for (const menu of menus) {
      const listItem = document.createElement("menu-item");
      menu.kind && listItem.setAttribute("kind", menu.kind);
      menu.image && listItem.setAttribute("image", menu.image);
      menu.price && listItem.setAttribute("price", menu.price);
      listItem.setAttribute("foods", menu.foods);
      this.listEl.appendChild(listItem);
    }
  }

  renderLoading() {
    this.listEl.innerHTML = "";
    const listItem = document.createElement("menu-blank");
    listItem.setAttribute("value", "로딩중...");
    this.listEl.appendChild(listItem);
  }

  stateChangedCallback(oldState, newState) {
    if (!oldState) return;
    if (newState.isLoading === true) this.renderLoading();
    if (oldState.menus !== newState.menus) this.updateList(newState.menus);
  }
}

customElements.define("menu-list", connect(MenuList, store));
