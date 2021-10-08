import {LitElement, html, css} from 'lit';

/** @typedef {import('lit').TemplateResult} MyComponent.TemplateResult */
/** @typedef {import('lit').CSSResult} MyComponent.CSSResult */

/**
 * A simple demo component in the form of a custom element.
 */
export class MyComponent extends LitElement {
  /**
   * Renders the component's CSS.
   * @return {MyComponent.CSSResult}
   */
  static get styles() {
    return css`
      *, *::before, *::after {
        box-sizing: border-box;
      }

      p {
        padding: 1rem;
        margin-bottom: 1rem;
        background-color: var(--bg-color, #00a);
        color: #fff;
      }
    `;
  }

  /**
   * Renders the component's HTML as reflected by its current state.
   * @return {MyComponent.TemplateResult}
   */
  render() {
    return html`
      <p>I am a component!</ap>
    `;
  }
}

