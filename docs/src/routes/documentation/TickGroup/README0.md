[Checkout the project on Github](https://github.com/sghall/resonance)

## TickGroup 

The TickGroup is a more specialized type of transition group than NodeGroup.
It was created as a helper for custom animated scales in data visualizations but may have other applications.
The main difference between a TickGroup and a NodeGroup is that a TickGroup treats a scale prop as immutable and updates when the scale changes (rendering each tick as a child) whereas the NodeGroup treats the data prop as immtuable.     
