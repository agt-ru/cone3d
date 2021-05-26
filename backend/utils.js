const { get_cone_data } = require('./cpp_calc_triangulation/build/Release/addon');

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
  const coneData = get_cone_data(cHeight, cRadius, cNumSegs);
  const conePositions = [];
  const coneNormals = [];
  for(let i = 0; i < coneData.length; i++) {
    conePositions.push(coneData.positions[i]);
    coneNormals.push(coneData.normals[i]);
  }
  return {conePositions, coneNormals};
}

module.exports = {getConeData, getConeDataFromCPP};
