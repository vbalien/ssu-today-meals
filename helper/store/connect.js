// HTMLElement에 store 연결하는 함수
export function connect(BaseElementClass, store) {
  if (typeof BaseElementClass !== "function" && !BaseElementClass.constructor)
    throw new Error("BaseElementClass는 Class이어야 합니다");

  return class extends BaseElementClass {
    constructor() {
      super();

      // store객체 등록
      // private 필드는 아직 지원하지 않는 브라우저가많기 때문에 수동으로 지정..
      Reflect.defineProperty(this, "store", {
        value: store,
        writable: false, // 읽기전용
      });
    }

    connectedCallback() {
      // 상태 변경 구독 & 구독해제 함수 등록
      Reflect.defineProperty(this, "_unsubscribe", {
        value: this.store.subscribe(this),
        writable: false, // 읽기전용
      });

      // 최초 1회 state변경 콜백 호출
      this.stateChangedCallback(null, this.store.state);

      // 원래 등록된 콜백 호출
      super.connectedCallback();
    }

    disconnectedCallback() {
      // 원래 등록된 콜백 호출
      super.disconnectedCallback();

      // 구독 해제
      this._unsubscribe();
      Reflect.deleteProperty(this, "_unsubscribe");
    }
  };
}
