"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var port = 8000;
var server = http_1.default.createServer();
server.listen(port);
console.log("Now listening port " + port);
//# sourceMappingURL=index.js.map
