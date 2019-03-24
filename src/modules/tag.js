import {Component} from './common/component';

export class Tag extends Component {
  constructor(tag) {
    super();

    this._name = tag;
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
