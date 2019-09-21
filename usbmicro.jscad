// title      : usbmicro
// author     : Michael Cohen
// license    : ISC License
// file       : usbmicro.jscad

/* exported main, getParameterDefinitions */

function getParameterDefinitions() {
  return [
    {
      name: 'resolution',
      type: 'choice',
      values: [0, 1, 2, 3, 4],
      captions: [
        'very low (6,16)',
        'low (8,24)',
        'normal (12,32)',
        'high (24,64)',
        'very high (48,128)'
      ],
      initial: 2,
      caption: 'Resolution:'
    }
  ];
}

function main(params) {
  var resolutions = [[6, 16], [8, 24], [12, 32], [24, 64], [48, 128]];
  CSG.defaultResolution3D = resolutions[params.resolution][0];
  CSG.defaultResolution2D = resolutions[params.resolution][1];
  util.init(CSG);

  var box1 = Parts.Cube([10, 10, 10])
    .fillet(1, 'z+')
    .color('orange');

  var box2 = Parts.Cube([5, 5, 5])
    .snap(box1, 'z', 'outside-')
    .align(box1, 'xy');

  var cyl1 = Parts.Cylinder(5, 10)
    .chamfer(2, 'z+')
    .rotateX(90)
    .snap(box2, 'y', 'outside+')
    .align(box2, 'xz')
    .color('green');
  return box1.union([box2.fillet(-1, 'z-').color('blue'), cyl1]);
}

// ********************************************************
// Other jscad libraries are injected here.  Do not remove.
// Install jscad libraries using NPM
// ********************************************************
// include:js
// endinject
