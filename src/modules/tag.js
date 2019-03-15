import {createElement} from './common/utils';

export class Tag {
  constructor(tag) {
    this._name = tag;
    this._element = null;
  }

  mount() {
    if (this._element) {
      this.unmount();
    }

    this._element = createElement(this.template);
    return this._element;
  }

  unmount() {
    this._element = null;
  }

  get template() {
    return `
    <span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="repeat"
        class="card__hashtag-hidden-input"
      />
      <button type="button" class="card__hashtag-name">
        #${this._name}
      </button>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>
    `;
  }
}
