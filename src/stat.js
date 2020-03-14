class Stat{

    constructor(min, max, val){
        this._min = min;
        this._max = max;
        this._val = val;
    }

    get min(){
        return this._min;
    }
    get max(){
        return this._max;
    }
    get val(){
        return Math.min(Math.max(this._min, this._val), this._max);
    }

    set min(min){
        this._min = min;
    }
    set max(max){
        this._max = max;
    }
    set val(val){
        this._val = Math.min(Math.max(this._min, val), this._max);;
    }
}