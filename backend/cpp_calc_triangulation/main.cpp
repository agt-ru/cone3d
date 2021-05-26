#include <nan.h>
#include <cmath>

using namespace std;
using namespace Nan;
using namespace v8;

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

// returns an object with positions and normals Float32Arrays
Local<Object> getConeDataObject(float cHeight, float cRadius, int cNumSegs) {
  int length = cNumSegs * 9;
  float** coneParams = new float*[3];
  coneParams[0] = new float[length];
  coneParams[1] = new float[length];
  coneParams[2] = new float[1];
  
  coneParams[2][0] = length;

  float B[3] = {0, 0, static_cast<float>(-pow(cRadius, 2) / cHeight)};
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
  Local<Float32Array> positions = Float32Array::New(ArrayBuffer::New(Isolate::GetCurrent(), length * 4), 0, length);
  Local<Float32Array> normals = Float32Array::New(ArrayBuffer::New(Isolate::GetCurrent(), length * 4), 0, length);

  for(int i = 0; i < length; i++) {
    Nan::Set(positions, i, Nan::New<Number>(coneParams[0][i]));
    Nan::Set(normals, i, Nan::New<Number>(coneParams[1][i]));
  }

  Local<Object> retval = Nan::New<Object>();
  Local<String> positions_prop = Nan::New<String>("positions").ToLocalChecked();
  Local<String> normals_prop = Nan::New<String>("normals").ToLocalChecked();
  Local<String> length_prop = Nan::New<String>("length").ToLocalChecked();

  Nan::Set(retval, positions_prop, positions);
  Nan::Set(retval, normals_prop, normals);
  Nan::Set(retval, length_prop, Nan::New<Number>(length));

  return retval;
}

NAN_METHOD(GetConeData) {
  float height = info[0]->NumberValue(Nan::GetCurrentContext()).FromJust();
  float radius = info[1]->NumberValue(Nan::GetCurrentContext()).FromJust();
  float segments = info[2]->NumberValue(Nan::GetCurrentContext()).FromJust();
  Local<Object> result = getConeDataObject(height, radius, segments);
  info.GetReturnValue().Set(result);
}

NAN_MODULE_INIT(Init) {
   Nan::Set(target, New<String>("get_cone_data").ToLocalChecked(),
      GetFunction(New<FunctionTemplate>(GetConeData)).ToLocalChecked());
}

NODE_MODULE(my_addon, Init)