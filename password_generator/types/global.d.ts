declare global {
  type TEvent = {(this: Document | Element | Window, event: string, callback: (e: Event) => void, options?: boolean | EventListenerOptions): void};
  type TCustomSelector = {(this: Document | HTMLElement | Element | void, selector: string): HTMLElement | Element |  NodeListOf<Element> | null}
  interface ICustomQuery {
    _$_:TCustomSelector
    $on: typeof TEvent; 
    $off: typeof TEvent;
  }
  interface Node extends ICustomQuery{};
  interface Element extends ICustomQuery{};
  interface Document extends ICustomQuery{};
  interface Window extends ICustomQuery{};
  interface globalThis extends ICustomQuery{};
}

export default global;