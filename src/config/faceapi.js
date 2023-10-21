const faceapi = require("face-api.js");
const canvas = require("canvas");
const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const loadModels = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk("./faceModels");
};

module.exports = loadModels;
