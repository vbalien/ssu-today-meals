// store객체를 class에 no-writable하게 등록
// class의 connectedCallback에서 store를 subscribe하도록 함

function connectedCallback() {
  // 상태 변경 구독 & 구독해제 함수 등록
  Reflect.defineProperty(this, "_unsubscribe", {
    value: this.store.subscribe(this),
    writable: false, // 읽기전용
  });

  // 최초 1회 state변경 콜백 호출
  this.stateChangedCallback(null, this.store.state);

  // 원래 등록된 콜백 호출
  this._origConnectedCallback && this._origConnectedCallback();
}

function disconnectedCallback() {
  // 원래 등록된 콜백 호출
  this._origDisconnectedCallback && this._origDisconnectedCallback();

  // 구독 해제
  this._unsubscribe();
  Reflect.deleteProperty(this, "_unsubscribe");
}

export function connect(elementClass, store) {
  // store객체 등록
  Reflect.defineProperty(elementClass.prototype, "store", {
    value: store,
    writable: false, // 읽기전용
  });

  // 본래 콜백 함수가 있을경우 옮김
  elementClass.prototype.connectedCallback &&
    Reflect.defineProperty(elementClass.prototype, "_origConnectedCallback", {
      value: elementClass.prototype.connectedCallback,
      writable: false, // 읽기전용
    });
  elementClass.prototype.disconnectedCallback &&
    Reflect.defineProperty(
      elementClass.prototype,
      "_origDisconnectedCallback",
      {
        value: elementClass.prototype.disconnectedCallback,
        writable: false, // 읽기전용
      }
    );

  // store변경 구독/해제를 위해 커스텀 콜백함수 등록
  Reflect.defineProperty(elementClass.prototype, "connectedCallback", {
    value: connectedCallback,
  });

  Reflect.defineProperty(elementClass.prototype, "disconnectedCallback", {
    value: disconnectedCallback,
  });

  return elementClass;
}
