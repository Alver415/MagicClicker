class HealthBar extends HTMLElement{
    constructor() {
        super();   
        this._stat = player.health;
        this._root = this.attachShadow({ mode: 'open' });
        this._root.innerHTML = `
        <div id="wrapper">
            <span id="healthText"></span>
            <div id="healthbarTop"></div>
            <div id="healthbarBottom"></div>
        </div>
        <style>
            #wrapper{
                position: relative;
                overflow: hidden;
                height: 20px;  
                background-color: darkgrey;
                border: 2px solid black;
                border-radius: 15px;
                text-align: center;
                font-weight: bold;
            }
            #healthText {
                position: absolute;
                z-index: 2;
                left: 0px;
                right: 0px;
                margin: auto;
            }
            #healthbarTop{
                position: absolute;
                z-index: 1;
                left: 0px;
                right: 0px;
                height: 100%;
                transition: all 0.1s;
            }
            #healthbarBottom{
                position: absolute;
                z-index: 0;
                left: 0px;
                right: 0px;
                background-color: grey;
                height: 100%;
                transition: all 1s;
            }
        </style>
        `;
    }

    get stat(){
        return this._stat;
    }

    update(){
        var currentHP = this._stat.val;
        var maximumHP = this._stat.max;
        var percent = currentHP / maximumHP;
        var text = currentHP + " / " + maximumHP;

        var r = (2 - 2 * percent) * 255;
        var g = (2 * percent) * 255;
        var b = 0;
        var color = rgb(r,g,b);
        
        this._root.querySelector('#healthText').innerHTML = text;
        this._root.querySelector('#healthbarTop').style['background-color'] = color;
        this._root.querySelector('#healthbarTop').style['width'] = (percent * 100) + "%";
        this._root.querySelector('#healthbarBottom').style['width'] = (percent * 100) + "%";
    }

}
window.customElements.define('health-bar', HealthBar);