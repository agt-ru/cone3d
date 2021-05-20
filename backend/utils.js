const addonUtils = require('bindings')('utils');

// prettier-ignore
function calcPiPos(R, N, i) {
  return [R * Math.cos(2 * Math.PI * i / N), R * Math.sin(2 * Math.PI * i / N), 0];
}

function calcPiNormal(B, Pi) {
  const NiMag = Math.sqrt(
    (Pi[0] - B[0]) ** 2 + (Pi[1] - B[1]) ** 2 + (Pi[2] - B[2]) ** 2
  );
  const Ni = [Pi[0] - B[0], Pi[1] - B[1], Pi[2] - B[2]];
  return [Ni[0] / NiMag, Ni[1] / NiMag, Ni[2] / NiMag];
}

function getConeData(cHeight, cRadius, cNumSegs) {
  const conePositions = [];
  const coneNormals = [];
  const B = [0, 0, -(cRadius ** 2) / cHeight];
  const coneUpPos = [0, 0, cHeight];

  for (let i = 0; i < cNumSegs; i++) {
    const PiPos = calcPiPos(cRadius, cNumSegs, i);
    const PnextPos = calcPiPos(cRadius, cNumSegs, i + 1);
  
    conePositions.push(...coneUpPos);
    conePositions.push(...PiPos);
    conePositions.push(...PnextPos);
  
    coneNormals.push(...calcPiNormal(B, coneUpPos));
    coneNormals.push(...calcPiNormal(B, PiPos));
    coneNormals.push(...calcPiNormal(B, PnextPos));
  }

  return {conePositions, coneNormals};
}

function getConeDataFromCPP(cHeight, cRadius, cNumSegs) {
  const coneDataFromCPP = addonUtils.getConeDataStr(cHeight, cRadius, cNumSegs);
  const floatsArr = coneDataFromCPP.split(" ");
  const conePositions = [];
  const coneNormals = [];

  for(let i = 0; i < floatsArr.length / 2; i++) {
    conePositions.push(parseFloat(floatsArr[i]));
  }

  for(let i = floatsArr.length / 2; i < floatsArr.length; i++) {
    coneNormals.push(parseFloat(floatsArr[i]));
  }

  return {conePositions, coneNormals};
}

module.exports = {getConeData, getConeDataFromCPP};
