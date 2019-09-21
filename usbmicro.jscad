// title      : usbmicro
// author     : Michael Cohen
// license    : ISC License
// file       : usbmicro.jscad

/* exported main, getParameterDefinitions */

function getParameterDefinitions() {
  return [
    {
      name: "resolution",
      type: "choice",
      values: [0, 1, 2, 3, 4],
      captions: [
        "very low (6,16)",
        "low (8,24)",
        "normal (12,32)",
        "high (24,64)",
        "very high (48,128)"
      ],
      initial: 2,
      caption: "Resolution:"
    }
  ];
}

function main(params) {
  util.init(CSG);
  const usbT = cube([6, 12, 1]).fillet(0.4, "z+");
  const usbB = cube([6, 12, 1]).fillet(0.8, "z+");
  usbT.properties.myConnector = new CSG.Connector(
    [3, 6, 0],
    [0, 0, 1],
    [1, 0, 0]
  );
  usbB.properties.myConnector = new CSG.Connector(
    [3, 6, 0],
    [0, 0, -1],
    [1, 0, 0]
  );

  const matrix = usbT.properties.myConnector.getTransformationTo(
    usbB.properties.myConnector,
    false, // mirror
    0 // normalrotation
  );
  const microUsb = union(usbT.transform(matrix), usbB);
  return microUsb.lieFlat();
}

// ********************************************************
// Other jscad libraries are injected here.  Do not remove.
// Install jscad libraries using NPM
// ********************************************************
// include:js
// endinject
