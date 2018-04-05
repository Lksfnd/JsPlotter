const AUTO_FIND = 'FIND_AUTO';
class Plotter {
    constructor(canvas, theme = PlotTheme.DEFAULT) {
        this.canvas = canvas;
        this._theme = theme;
        this._ctx = canvas.getContext("2d");
    }

    plotFunction(fnc, minValue, maxValue, axePosition) {
        // Usables
        let c = this.canvas;
        let ctx = this._ctx;
        const t = this._theme;
        // Setup
        this._applyTheme();
        // Calculations
        const view = {
            width: c.width - t.margin.x*2,
            height: c.height - t.margin.y*2,
            top: t.margin.y,
            left: t.margin.x
        };
        ctx.fillStyle = t.backgroundColor;
        ctx.fillRect(view.left-25, view.top-25, view.width+50,view.height+50);
        const resolution = view.width;
        const values = this._getValues(fnc,minValue.x,maxValue.x,resolution);
        const medianVal = median(pureY(values));
        const maxVal = max(pureY(values));
        const minVal = min(pureY(values));
        const xAxisValue = axePosition.x;
        const yAxisValue = axePosition.y;

        /**
         * Draw Wireframe
         */
        this._applyWireFrameStyle();
        // Calculate the amount above the yAxis
        const yAboveCount = amountAbove(pureY(values), yAxisValue);
        const yBelowCount = amountBelow(pureY(values), yAxisValue);
        const yAmount = yAboveCount + yBelowCount;
        const xAboveCount = amountAbove(pureX(values), xAxisValue);
        const xBelowCount = amountBelow(pureX(values), xAxisValue);
        const xAmount = xAboveCount + xBelowCount;

        // Calculate the pixel position of the axis
        // This looks a bit confusing because x and y are mixed, the reason for that is
        // the calculated position of the X axis is the position on the Y axis.
        const xAxisPosition = (yAboveCount / yAmount) * view.height; // from top
        const yAxisPosition = (xBelowCount / xAmount) * view.width; // from left

        // Actually draw the axes
        // draw the x axis
        ctx.moveTo(view.left, view.top + xAxisPosition);
        ctx.lineTo(view.left + view.width, view.top + xAxisPosition);
        ctx.stroke();
        // draw the y axis
        ctx.moveTo(view.left + yAxisPosition, view.top);
        ctx.lineTo(view.left + yAxisPosition, view.top + view.height);
        ctx.stroke();

        /**
         * Draw graph
         */
        this._applyStrokeStyle(0);
        for(let x = 0; x < values.length; x++) {
            const y = values[x].y / maxValue.y;
            if(x==0) {
                ctx.moveTo(view.left + x, int(view.height + view.top - y * view.height));
            } else {
                ctx.lineTo(view.left + x, int(view.height + view.top - y * view.height));
            }
        }
        ctx.stroke();
    }

    _applyStrokeStyle(index) {
        let ctx = this._ctx;
        const t = this._theme;
        ctx.beginPath();
        ctx.strokeStyle = t.stroke[index].color;
        ctx.lineWidth = t.stroke[index].lineWidth;
        ctx.setLineDash(t.stroke[index].lineDash);
    }
    _applyWireFrameStyle() {
        let ctx = this._ctx;
        const t = this._theme;
        ctx.beginPath();
        ctx.strokeStyle = t.wireframe.color;
        ctx.lineWidth = t.wireframe.lineWidth;
        ctx.setLineDash(t.wireframe.lineDash);
    }

    /**
     * Applies the current theme
     */
    _applyTheme() {
        const t = this._theme;
        let c = this.canvas;
        let ctx = this._ctx;

        if(t.fullScreen || true) {
            c.width = window.innerWidth;
            c.height = window.innerHeight;
        }

        c.style.backgroundColor = "#000000";
        ctx.fillStyle = t.backgroundColor;
        ctx.strokeStyle = t.stroke[0].color;
        ctx.fillStyle = t.fill[0].color;
        ctx.lineWidth = t.lineWidth;
    }

    _getValues(fnc, min, max, resolution) {
        let values = [];
        let width = max - min;
        let increase = width / resolution;
        for(let i=min; i < max; i += increase) {
            values.push({x:i*increase + min,y:fnc(i*increase + min)});
        }
        return values;
    }

}

function amountAbove(arr, x) {
    let amount = 0;
    for(let el of arr) {
        if(el > x) {
            amount++;
        }
    }
    return amount;}
function amountBelow(arr, x) {
    let amount = 0;
    for(let el of arr) {
        if(el < x) {
            amount++;
        }
    }
    return amount;}
function pureX(arr) {
    let p = [];
    for(let x of arr) {
        p.push(x.x);
    }
    return p;}
function pureY(arr) {
    let p = [];
    for(let x of arr) {
        p.push(x.y);
    }
    return p;}
function int(x){
    return parseInt(x);}
function max(arr) {
    let max = Number.MIN_SAFE_INTEGER;
    for(let x of arr) {
        max = (x > max) ? x : max;
    }
    return max;}
function min(arr) {
    let min = Number.MAX_SAFE_INTEGER;
    for(let x of arr) {
        min = (x < min) ? x : min;
    }
    return min;}
function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;}