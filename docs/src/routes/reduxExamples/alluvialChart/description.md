## Alluvial Style Chart

My take on creating an "alluvial" style layout.  It brings the largest value at each x coordinate to the top.
It uses the same data generator used in Mike Bostock's [stream graph example](https://bl.ocks.org/mbostock/4060954).
The tension parameter is fed to the cardinal interpolator for the areas.
See the [d3-stack](https://github.com/d3/d3-shape#curves) curves section.

[SOURCE CODE FOR THIS EXAMPLE](https://github.com/sghall/resonance/tree/master/docs/src/routes/reduxExamples/alluvialChart/components)
