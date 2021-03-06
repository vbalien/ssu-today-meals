export class Store {
  reducer = null;
  state = null;
  subscribeElements = [];

  constructor(reducer) {
    Reflect.defineProperty(this, "reducer", {
      value: reducer,
      writable: false, // 읽기전용
    });

    // state 초기화
    this.dispatch({ type: "@@INIT" });
  }

  subscribe(element) {
    // element를 구독시킴
    this.subscribeElements.push(element);

    // 구독취소하는 함수 리턴
    return (() => {
      const idx = this.subscribeElements.indexOf(element);
      if (idx !== -1) this.subscribeElements.splice(idx, 1);
    }).bind(this);
  }

  getState() {
    // clone state
    return { ...this.state };
  }

  async dispatch(action) {
    // thunk
    if (typeof action === "function")
      return await action(this.dispatch.bind(this), this.getState.bind(this));

    // state를 업데이트하고 immutable하도록 설정
    const oldState = this.getState();
    this.state = this.reducer(
      action.type === "@@INIT" ? undefined : this.getState(),
      action
    );
    Object.freeze(this.state);

    // state 변경 콜백 호출
    for (const el of this.subscribeElements)
      el.stateChangedCallback &&
        el.stateChangedCallback(oldState, this.getState());
  }
}
