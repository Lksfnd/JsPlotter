let p = new Plotter(document.querySelector("canvas"));

let c =0;
let dir = 1;
function make() {
    p.plotFunction(
        x => Math.pow(x,2+c),
        {
            x: 0, // Start x value
            y: AUTO_FIND // minimum y value 
        }, {
            x: 100, // End x value
            y: AUTO_FIND // maximum y value
        }, {
            x: 0, // Position of x axis
            y: 0  // Position of y axis
        }
    );
    
    for(let i=0; i < 15; i+=0.25) {
        p.addPlot(x => Math.pow(x,i+c));
    }
    c+=dir*0.02;
    if(c>1||c<-1) { dir *= -1; }
    window.requestAnimationFrame(make);
}
make();



//p.addPlot(x=>Math.pow(x,3));
//p.addPlot(x=>Math.pow(x,4));



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