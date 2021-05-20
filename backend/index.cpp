#include <napi.h>
#include <string>
#include "utils.h"

Napi::String getConeDataStr(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    float cHeight = (float) info[0].ToNumber();
    float cRadius = (float) info[1].ToNumber();
    float cNumSegs = (int) info[2].ToNumber();

    std::string result = getConeStr( cHeight, cRadius, cNumSegs );

    return Napi::String::New(env, result);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {

    exports.Set(
        Napi::String::New(env, "getConeDataStr"),
        Napi::Function::New(env, getConeDataStr)
    );

    return exports;
}

NODE_API_MODULE(utils, Init)
