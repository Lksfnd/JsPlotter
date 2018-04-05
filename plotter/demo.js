let p = new Plotter(document.querySelector("canvas"));
let fnc = x => Math.pow(x,2);

p.plotFunction(
    fnc,
    {
        x: 0,
        y: 0
    }, {
        x: 100,
        y: 50
    }, {
        x: 0,
        y: 0
    }
);



/*
p.plotFunction(
    fnc,
    {
        x: 0,
        y: 0
    }, {
        x: 100,
        y: 50
    }, {
        x: 0,
        y: 0
    }
);
*/