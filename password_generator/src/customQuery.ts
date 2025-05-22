// $on is shortcut for element.addEventListener(event, callback, options)
const $on: TEvent = function(this, event, callback, options) {this.addEventListener(event,callback, options)};
// $off is shortcut for element.removeEventListener(event, callback, options)
const $off: TEvent = function(this, event, callback, options) {this.removeEventListener(event,callback, options)};

// _$_ is a shortcut for element.querySelector(selector);
export const _$_:TCustomSelector = function(this, selector) {
  const parent = (this||document) as Element | Document;
  const elements = (parent||document).querySelectorAll(selector);
  if(elements.length === 1) return elements[0]
  if(!elements.length) return null;
  return elements;
}
Node.prototype._$_ = _$_;
Node.prototype.$on = $on;
Node.prototype.$off = $off;
window._$_ = _$_;
window.$on = $on;
window.$off = $off;