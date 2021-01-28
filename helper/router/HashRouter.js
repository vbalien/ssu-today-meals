export class HashRouter {
  routes = null;
  targetElement = null;
  matches = [];
  currentChild = null;

  constructor(targetElement) {
    this.targetElement = targetElement;

    // hash 이벤트 등록
    this.hashChange = this.hashChange.bind(this);
    window.addEventListener("hashchange", this.hashChange);
  }

  setRoutes(routes) {
    this.routes = routes;
    Object.freeze(this.routes);
    this.updateRoute();
  }

  updateRoute() {
    const currentRotue = this.matchedRoute;
    const m = this.hash.match(currentRotue.path);
    const tmp = [...m].slice(1);

    // match값이 달라지면 rotue가 바뀐 것
    if (JSON.stringify(this.matches) === JSON.stringify(tmp)) return;
    this.matches = tmp;

    // 원래 있던 Element를 지우고 새로운 Element를 등록
    const newEl = document.createElement(currentRotue.component);
    if (this.currentChild) this.targetElement.removeChild(this.currentChild);
    this.targetElement.appendChild(newEl);
    this.currentChild = newEl;
  }

  get hash() {
    return window.location.hash.slice(1);
  }

  get matchedRoute() {
    return this.routes.find((route) => RegExp(route.path).test(this.hash));
  }

  get params() {
    return this.matches;
  }

  hashChange(event) {
    this.updateRoute();
  }
}
