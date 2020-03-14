class TimeSpinner extends HTMLElement {
  constructor() {
    super();
    const stroke = 2;
    const radius = 30;
    const color = this.getAttribute('color');
    const background = this.getAttribute('background');
    const normalizedRadius = radius - stroke / 2;
    this._circumference = normalizedRadius * 2 * Math.PI;

    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML = `
        <svg height="${radius * 2}" width="${radius * 2}">
          <circle
            stroke="${color}"
            stroke-dasharray="${this._circumference} ${this._circumference}"
            style="stroke-dashoffset:${this._circumference}"
            stroke-width="${stroke}"
            fill="transparent"
            r="${normalizedRadius}"
            cx="${radius}"
            cy="${radius}"
          />   
          <text id="amount"
          dy=".35em"
          x="50%" 
          y="50%" 
          text-anchor="middle" 
          fill="white"
          stroke="black" 
          stroke-width="0.5px">0</text>
        </svg>
      <style>
        .mana-button {
          display: inline-block;
          height: 60px;
          width: 60px;
          line-height: 60px;
          border-radius: 50%;
          color: white;
          text-align: center;
          font-size: 2.5em;
          cursor: pointer;
          opacity: 0.6;        
          transition: opacity 0.5s;
        }
        .mana-button:hover{
          opacity: 1;
        }
        .mana-button svg{
          position:relative;
          top:0px;
          left:0px;
        }
        .mana-button svg circle {
          transition: stroke-dashoffset 0.35s;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
      </style>
    `;
  }
}

window.customElements.define('time-spinner', TimeSpinner);