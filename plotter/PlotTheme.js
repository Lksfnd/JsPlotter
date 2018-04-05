const PlotTheme = {
    DEFAULT: {
        margin: { x: 100, y: 100 }, // px
        backgroundColor: '#ffffff',
        stroke: [ // Each line is a graph
            { color: "#00cc00", lineWidth: 2, lineDash: [] },
            { color: "#cc0000", lineWidth: 2, lineDash: [] },
            { color: "#0000cc", lineWidth: 2, lineDash: [] },
        ],
        fill: [
            "#ff0000"
        ],
        wireframe: {
            color: '#000000',
            lineWidth: 0.75,
            lineDash: [8,3]
        },
        drawWireFrames: true,
        fullScreen: true
    }
};