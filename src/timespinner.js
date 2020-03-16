class TimeSpinner extends HTMLElement {
  constructor() {
    super();
    const stroke = this.getAttribute('stroke');
    const color = this.getAttribute('color');
    const radius = this.getAttribute('radius');
    const radius_norm = radius - stroke;
    this._circumference = 2 * Math.PI * radius_norm;
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML = `
         <svg class="spinner">
           <circle class="path" fill="transparent" stroke-width="${stroke}" cx="${radius}" cy="${radius}" r="${radius_norm}" stroke="url(#gradient)"/>
           <circle class="path" fill="${color}" cx="${radius}" cy="${stroke}" r="${stroke}"/>
           <linearGradient id="gradient">
             <stop offset="0%" stop-color="${color}" stop-opacity="1"/>
             <stop offset="50%" stop-color="${color}" stop-opacity=".5"/>
             <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
           </linearGradient>
        </svg> 
      <style>
        .path {
          stroke-dasharray: ${this._circumference};
          stroke-dashoffset: ${this._circumference / 4};
        }
        .spinner {
          width:${radius * 2}px;
          height:${radius * 2}px;
          animation-name: spin;
          animation-duration: 1000ms;
          animation-iteration-count: infinite;
          animation-timing-function: linear; 
        }

        @keyframes spin{
          from {
              transform:rotate(0deg);
          }
          to {
              transform:rotate(360deg);
          }
        }

      </style>
    `;
  }

  setProgress(percent) {
    const timespinner = this._root.querySelector('svg.spinner');
    timespinner.style.transform = `rotate(${(percent / 100) * 360}deg)`;
  }

  static get observedAttributes() {
    return ['progress'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'progress') {
      this.setProgress(newValue);
    }
  }
}
window.customElements.define('time-spinner', TimeSpinner);