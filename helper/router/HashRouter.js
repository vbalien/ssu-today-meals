export class HashRouter {
  routes = null;
  targetElement = null;
  currentChild = null;
  url = null;
  oldUrl = null;

  constructor(targetElement) {
    this.targetElement = targetElement;

    // hash 이벤트 등록
    this.hashChange = this.hashChange.bind(this);
    window.addEventListener("hashchange", this.hashChange);
  }

  setRoutes(routes) {
    this.routes = routes;
    Object.freeze(this.routes);

    this.url = new URL(window.location.href);
    this.updateRoute();
  }

  updateRoute() {
    const currentRotue = this.matchedRoute;
    // 매치되는 라우트가 없으면 무시
    if (!currentRotue) return;

    // redirect
    if (currentRotue.redirect) {
      const goto =
        typeof currentRotue.redirect === "function"
          ? currentRotue.redirect()
          : currentRotue.redirect;
      this.location = goto;
      return;
    }

    // path 파싱
    const matches = this.location.match(currentRotue.path);
    const path = matches[0];
    // rotue가 바뀐것인지 체크
    if (this.oldUrl && this.oldUrl.hash.slice(1) === path) return;

    // match 결과 업데이트
    if (matches && matches.groups) this.groups = matches.groups;

    // 원래 있던 Element와 같지 않으면
    let newEl = null;
    if (
      !this.currentChild ||
      this.currentChild.tagName.toLowerCase() !== currentRotue.component
    ) {
      // 원래 있던 Element를 지우고 새로운 Element를 등록
      newEl = document.createElement(currentRotue.component);
      if (this.currentChild) this.targetElement.removeChild(this.currentChild);
    } else newEl = this.currentChild;

    // match된 값을  attr으로 넘겨줌
    for (const g in this.groups) newEl.setAttribute(g, this.groups[g]);

    // 자식으로 추가
    if (
      !this.currentChild ||
      this.currentChild.tagName.toLowerCase() !== currentRotue.component
    ) {
      this.targetElement.appendChild(newEl);
      this.currentChild = newEl;
    }
  }

  get location() {
    return this.url.hash.slice(1) || "/";
  }

  set location(path) {
    window.location = `#${path}`;
  }

  get matchedRoute() {
    return this.routes.find((route) => RegExp(route.path).test(this.location));
  }

  hashChange(event) {
    this.url = new URL(event.newURL);
    this.oldUrl = new URL(event.oldURL);
    this.updateRoute();
  }
}
