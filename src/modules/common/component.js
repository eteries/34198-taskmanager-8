import {createElement} from './utils';

export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
  }

  render() {
    if (this._element) {
      this.unrender();
    }

    this._element = createElement(this.template);
    this._appendChildren();
    this.createListeners();
    return this._element;
  }

  unrender() {
    this.removeListeners();
    this._element.remove();
    this._element = null;
  }

  createListeners() {}

  removeListeners() {}

  _appendChildren() {}

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }
}
