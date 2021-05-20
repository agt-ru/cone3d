#include <iostream>
#include <string>
#include <cmath>
#include "utils.h"

const double PI = 3.141592653589793;

float* calcPiPos(float R, int N, int i) {
    float* result = new float[3];
    result[0] = R * cos(2 * PI * i / N);
    result[1] = R * sin(2 * PI * i / N);
    result[2] = 0;
    return result;
}

float* calcPiNormal(float B[3], float Pi[3]) {
    float NiMag = sqrt(
        pow((Pi[0] - B[0]), 2) + pow((Pi[1] - B[1]), 2) + pow((Pi[2] - B[2]), 2)
    );
    float* Ni = new float[3];
    Ni[0] = Pi[0] - B[0];
    Ni[1] = Pi[1] - B[1];
    Ni[2] = Pi[2] - B[2];
    float* result = new float[3];
    result[0] = Ni[0] / NiMag;
    result[1] = Ni[1] / NiMag;
    result[2] = Ni[2] / NiMag;
    return result;
}

float** getConeData(float cHeight, float cRadius, int cNumSegs) {
  int length = cNumSegs * 9;
  float** coneParams = new float*[3];
  coneParams[0] = new float[length];
  coneParams[1] = new float[length];
  coneParams[2] = new float[1];
  
  coneParams[2][0] = length;

  float B[3] = {0, 0, -pow(cRadius, 2) / cHeight};
  float coneUpPos[3] = {0, 0, cHeight};

  for (int i = 0; i < cNumSegs; i++) {
    float* PiPos = calcPiPos(cRadius, cNumSegs, i);
    float* PnextPos = calcPiPos(cRadius, cNumSegs, i + 1);
  
    float* normal1 = calcPiNormal(B, coneUpPos);
    float* normal2 = calcPiNormal(B, PiPos);
    float* normal3 = calcPiNormal(B, PnextPos);

    for(int j = 0; j < 3; j++) {
      coneParams[0][i * 9 + j] = coneUpPos[j];
      coneParams[0][i * 9 + j + 3] = PiPos[j];
      coneParams[0][i * 9 + j + 6] = PnextPos[j];

      coneParams[1][i * 9 + j] = normal1[j];
      coneParams[1][i * 9 + j + 3] = normal2[j];
      coneParams[1][i * 9 + j + 6] = normal3[j];
    }
  }
  return coneParams;
}

std::string getConeStr(float cHeight, float cRadius, int cNumSegs) {
  float** ptr3 = getConeData(cHeight, cRadius, cNumSegs);

  std::string result = "";

  for(int i = 0; i < 2; i++) {
        for(int j = 0; j < ptr3[2][0]; j++) {
          result += std::to_string(ptr3[i][j]) + " ";
        }
  }

  result = result.substr(0, result.size() - 1);

  return result;
}
