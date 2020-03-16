class Spell extends HTMLElement{
    constructor(name, manaCost, effect, rulesText) {
        super();
        this._name = name;
        this._manaCost = manaCost;
        this._effect = effect;
        this._rulesText = rulesText;        

        this.style['position'] = 'relative';
        this.style['display'] = 'inline-block';
        this._root = this.attachShadow({ mode: 'open' });
        this._root.innerHTML = `
        <div class="spell">
            <div class="titleBar">
                <span class="name">${name}</span>
                <span class="manaCost"></span>
            </div>
            <div class="typeBar">Sorcery</div>
            <div class="rulesText">${rulesText}</div>
        </div>
        <style>
            * {
                padding: 1px;
                font-family: 'Beleren';
                vertical-align: baseline;
            }
            .spell{
                background: lightgrey;
                width:  200px;
                height: 150px;
                border: 1px solid black;
                border-radius: 2px;
                transition: all 0.1s;
            }
            .spell:hover{
                box-shadow: black 0px 0px 5px;
            }
            .titleBar {
                width:  100%;
                height: 20px;
                border-bottom: 1px solid grey;
                border-radius: 2px;
            }
            .name{
                float: left;
            }
            .manaCost{
                float: right;
            }
            .typeBar{
                font-size: 12px;
                border-bottom: 1px solid grey;
            }
            .rulesText{
                font-size: 12px;
                font-family: Plain;
            }
            img{
                width: 12px;
                height: 12px;
            }
        </style>
        `;

        var manaMap = {
            colorless : 'resources/C.svg',
            white :     'resources/W.svg',
            blue :      'resources/U.svg',
            black :     'resources/B.svg',
            red :       'resources/R.svg',
            green :     'resources/G.svg'
        }

        var span = this._root.querySelector('.manaCost');
        for (var m in manaCost){
            for (var i=0; i < manaCost[m]; i++){
                var img = document.createElement('IMG');
                img.src = manaMap[m];
                span.append(img);
            }
        }
        
        var self = this;
        this._root.querySelector('.spell').onclick = function(){
            player.cast(self);
        };

    }

    get name() {
        return this._name;
    }
    get manaCost() {
        return this._manaCost;
    }
    get effect() {
        return this._effect;
    }
    get hoverText() {
        return this._hoverText;
    }

    do(target){
        this._effect(target);
    }

}
window.customElements.define('spell-element', Spell);