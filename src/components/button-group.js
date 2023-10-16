import { LitElement, css, html } from 'lit';

export class ButtonGroup extends LitElement {
  render() {
    return html`
      <div class="grid items-center grid-cols-2 mt-8">
        <button
          class="
            rounded-s-lg
            text-2xl
            py-6
            text-white
            bg-slate-400
            hover:bg-slate-700
            transition-colors
            border-0
            cursor-pointer
          "
          @click=${() => this.dispatchEvent(new Event('minus'))}
        >
          <span class="i-material-symbols-remove pointer-events-none"></span>
        </button>

        <button
          class="
            rounded-e-lg
            text-2xl
            py-6
            text-white
            bg-slate-400
            hover:bg-slate-700
            transition-colors
            border-black
            border-0 border-s-1
            cursor-pointer
          "
          @click=${() => this.dispatchEvent(new Event('plus'))}
        >
          <span class="i-material-symbols-add pointer-events-none"></span>
        </button>
      </div>
    `;
  }

  static get styles() {
    return css`
      @unocss-placeholder;
    `;
  }
}

customElements.define('button-group', ButtonGroup);
