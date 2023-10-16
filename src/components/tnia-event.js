import { LitElement, css, html } from 'lit';

import './group-session.js';

/**
 * @description Main driver component. Responsible for creating
 * sessions for each group and maintaining wall clock time.
 *
 * @type LitElement
 */
class TniaEvent extends LitElement {
  static properties = {
    _activeSession: { type: Number, state: true },
    _sessions: { type: Array, state: true },
    _showConfig: { type: Boolean, state: true },
  };

  constructor() {
    super();

    this._sessionLength = 20;
    this._checkerTime = 3;
    this._dayStart = '1:30 PM';
    this._activeSession = 0;

    this._showConfig = false;

    this.loadData();

    const now = luxon.DateTime.now();
    for (let i = 0; i < this._sessions.length; i++) {
      const sess = this._sessions[i];
      if (now > sess.start && now < sess.end) {
        this._activeSession = i;
        break;
      }
    }
  }

  get activeSession() {
    return {
      ...(this._sessions[this._activeSession] || this._sessions[0]),
      minutesRemaining: this._minutesRemaining,
    };
  }

  createSessions() {
    const xs = ['A1', 'I1', 'N1', 'A2', 'I2', 'TTL', 'N2', 'A3', 'I3', 'N3'];
    this._sessions = xs.map((x, i) => {
      const sessionStart = luxon.DateTime.fromFormat(this._dayStart, 't').plus({
        minutes: i * this._sessionLength,
      });

      let group = 'Track Tour Laps';
      switch (x[0]) {
        case 'A':
          group = 'Advanced';
          break;
        case 'I':
          group = 'Intermediate';
          break;
        case 'N':
          group = 'Novice';
          break;
      }

      let number = -1;
      if (x[0] !== 'T') {
        try {
          number = parseInt(x[1], 10);
        } catch (err) {}
      }

      return {
        group,
        number,
        start: sessionStart,
        end: sessionStart.plus({ minutes: this._sessionLength }),
      };
    });
  }

  updateSessionEnd(sessionIdx, change) {
    const sessions = [...this._sessions];
    for (let i = sessionIdx; i < sessions.length; i++) {
      if (i !== sessionIdx) {
        sessions[i].start = sessions[i].start.plus({ minutes: change });
      }
      sessions[i].end = sessions[i].end.plus({ minutes: change });
    }

    this._sessions = sessions;
    this.storeData();
  }

  reset() {
    window.localStorage.clear();
    this._sessionLength = 20;
    this._checkerTime = 3;
    this._dayStart = '1:30 PM';
    this._showConfig = false;
    this.createSessions();
  }

  storeData() {
    try {
      const today = luxon.DateTime.now().toFormat('yyyy-MM-dd');
      window.localStorage.setItem(
        `tnia-event-${today}`,
        JSON.stringify(this._sessions)
      );
      window.localStorage.setItem(
        'tnia-event-config',
        JSON.stringify({
          start: this._dayStart,
          checkered: this._checkerTime,
          length: this._sessionLength,
        })
      );
    } catch (err) {
      console.error(err);
    }
  }

  loadData() {
    const today = luxon.DateTime.now().toFormat('yyyy-MM-dd');
    let data = window.localStorage.getItem('tnia-event-config');
    if (data) {
      try {
        const config = JSON.parse(data);
        this._dayStart = config.start;
        this._newStart = config.start;
        this._checkerTime = config.checkered;
        this._sessionLength = config.length;
      } catch (err) {
        console.error(err);
      }
    }

    data = window.localStorage.getItem(`tnia-event-${today}`);
    if (data) {
      try {
        const sessions = JSON.parse(data);
        this._sessions = sessions.map((sess) => ({
          ...sess,
          start: luxon.DateTime.fromISO(sess.start),
          end: luxon.DateTime.fromISO(sess.end),
        }));
      } catch (err) {
        console.error(err);
      }
    } else {
      this.createSessions();
    }
  }

  saveConfig() {
    try {
      const checkerString = this.shadowRoot.getElementById('checker').value;
      this._checkerTime = parseInt(checkerString, 10);

      const lengthString = this.shadowRoot.getElementById('length').value;
      this._sessionLength = parseInt(lengthString, 10);

      const startString = this.shadowRoot.getElementById('start').value;
      const newStart = luxon.DateTime.fromFormat(startString, 't');

      const sessions = [...this._sessions];
      for (let i = 0; i < sessions.length; i++) {
        const s = newStart.plus({ minutes: i * this._sessionLength });
        sessions[i].start = s;
        sessions[i].end = s.plus({ minutes: this._sessionLength });
      }

      this._sessions = sessions;
      this._dayStart = startString;
      this._showConfig = false;
      this.storeData();
    } catch (err) {
      console.error(err);
    }
  }

  firstUpdated() {
    super.firstUpdated();
    const element = this.renderRoot.getElementById('slider');
    window.mySwipe = new Swipe(element, {
      startSlide: this._activeSession,
      draggable: false,
      autoRestart: false,
      continuous: false,
      disableScroll: true,
      stopPropagation: true,
      callback: function (index, element) {},
      transitionEnd: function (index, element) {},
    });

    this.loadData();
  }

  render() {
    return html`
      <div class="relative h-full overflow-hidden">
        <div id="slider" class="swipe h-full">
          <div class="swipe-wrap h-full">
            ${this._sessions.map(
              (sess, i) => html`
                <group-session
                  .session=${sess}
                  .start=${sess.start}
                  .end=${sess.end}
                  checkerTime=${this._checkerTime}
                  @decreaseTime=${() => this.updateSessionEnd(i, -1)}
                  @increaseTime=${() => this.updateSessionEnd(i, 1)}
                  class="block w-full h-full max-h-screen"
                ></group-session>
              `
            )}
          </div>
        </div>

        <div
          class="
            flex flex-col
            absolute inset-0
            bg-slate-500 z-10
            p-4
            transition duration-300 ease-in-out
            ${this._showConfig ? '' : 'translate-y-full'}
          "
        >
          <span
            @click=${() => (this._showConfig = false)}
            class="i-material-symbols-close absolute top-1 right-1 text-2xl"
          ></span>

          <h1 class="text-3xl m-0">Config</h1>

          <p class="flex flex-col">
            <label for="start">Start Time</label>
            <input
              id="start"
              type="text"
              class="
              bg-slate-700 border-0 px-3 py-2 rounded-none
                text-light text-xl
              "
              value=${this._dayStart.toLocaleString(luxon.DateTime.TIME_SIMPLE)}
            />
          </p>

          <p class="flex flex-col">
            <label for="checker">Time For Checker</label>
            <input
              id="checker"
              type="text"
              class="
              bg-slate-700 border-0 px-3 py-2 rounded-none
                text-light text-xl
              "
              value=${this._checkerTime}
            />
          </p>

          <p class="flex flex-col">
            <label for="length">Session Length</label>
            <input
              id="length"
              type="text"
              class="
              bg-slate-700 border-0 px-3 py-2 rounded-none
                text-light text-xl
              "
              value=${this._sessionLength}
            />
          </p>

          <div class="grid grid-cols-2 gap-3 mt-24">
            <button
              class="
                border-none
                bg-slate-700
                text-white text-xl
                hover:bg-slate-400
                py-2
                transition-colors
              "
              @click=${() => this.saveConfig()}
            >
              Save
            </button>

            <button
              class="
                border-none
                bg-slate-400
                text-white text-xl
                hover:bg-slate-700
                py-2
                transition-colors
              "
              @click=${() => {
                this._newStart = this._dayStart;
                this._showConfig = false;
              }}
            >
              Cancel
            </button>
          </div>

          <button
            class="
                border-none
                bg-slate-700
                text-white text-xl
                hover:bg-slate-400
                py-2
                mt-6
                transition-colors
              "
            @click=${() => this.reset()}
          >
            Reset
          </button>
        </div>

        <div
          @click=${() => (this._showConfig = true)}
          class="absolute bottom-1 left-1"
        >
          <span class="i-material-symbols-settings text-2xl"></span>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .swipe {
        overflow: hidden;
        visibility: hidden;
        position: relative;
      }
      .swipe-wrap {
        overflow: hidden;
        position: relative;
      }
      .swipe-wrap > * {
        float: left;
        width: 100%;
        position: relative;
      }

      @unocss-placeholder;
    `;
  }
}

customElements.define('tnia-event', TniaEvent);
