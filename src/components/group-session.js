import { LitElement, css, html } from 'lit';

import './button-group';

export class GroupSession extends LitElement {
  static properties = {
    selected: { type: Boolean },
    session: { type: Object },
    start: { type: Object },
    end: { type: Object },
    checkerTime: { type: Number },
    active: { type: Boolean, state: true },
  };

  constructor() {
    super();

    setInterval(() => this.requestUpdate(), 1000);
  }

  get active() {
    const now = luxon.DateTime.now();
    return now > this.start && now < this.end;
  }

  get sessionLength() {
    return Math.floor(this.end.diff(this.start, 'minutes').as('minutes'));
  }

  render() {
    const checkerTime = this.end.minus({ minutes: this.checkerTime });

    let minutesRemaining = luxon.Duration.fromObject({ minutes: 0 });
    let tillChecker = luxon.Duration.fromObject({ minutes: 0 });

    try {
      const now = luxon.DateTime.now();
      minutesRemaining =
        now > this.end
          ? luxon.Duration.fromObject({ minutes: 0 })
          : now > this.start
          ? this.end.diff(now, 'minutes')
          : this.end.diff(this.start, 'minutes');

      tillChecker =
        minutesRemaining.as('minutes') < this.checkerTime
          ? luxon.Duration.fromObject({ minutes: 0 })
          : minutesRemaining.minus({ minutes: this.checkerTime });
    } catch (err) {
      console.error(err);
    }

    return html`
      <div class="flex flex-col p-4 mt-5 overflow-hidden">
        <h1
          class="${this.active
            ? 'text-red-400'
            : 'text-slate-400'} text-center mb-10"
        >
          ${this.session.group}
          <br />
          ${this.session.number > 0 ? html`Session ${this.session.number}` : ''}
        </h1>

        <div class="text-lg">
          <span class="font-bold">
            Start${this.start < luxon.DateTime.now() ? 'ed' : 's'}
          </span>
          ${this.start.toLocaleString(luxon.DateTime.TIME_SIMPLE)}
          (${this.sessionLength} mins)
        </div>

        ${this.active
          ? html`
              <div
                class="text-lg ${tillChecker.as('minutes') <= 0
                  ? 'text-red-400'
                  : ''}"
              >
                <span class="font-bold">
                  Checker${checkerTime < luxon.DateTime.now() ? 'ed' : ''}
                </span>
                ${checkerTime.toRelative()}
              </div>
            `
          : ''}

        <div
          class="text-lg ${minutesRemaining.as('minutes') <= 0
            ? 'text-red-400'
            : ''}"
        >
          <span class="font-bold">
            End${this.end < luxon.DateTime.now() ? 'ed' : 's'}
          </span>
          ${this.end.toRelative()}
        </div>

        ${this.active
          ? html`
              <div class="mt-2 mb-10">
                <button-group
                  @minus=${() => this.dispatchEvent(new Event('decreaseTime'))}
                  @plus=${() => this.dispatchEvent(new Event('increaseTime'))}
                ></button-group>
              </div>
            `
          : ''}
      </div>
    `;
  }

  static get styles() {
    return css`
      @unocss-placeholder;
    `;
  }
}

customElements.define('group-session', GroupSession);
