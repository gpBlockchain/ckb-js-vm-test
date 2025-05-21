import {
    runServer,
    RequestHandler,
    RequestPacket,
    ResponsePacket,
} from "@ckb-js-std/ipc";
import {log, HighLevel, Script, hashTypeFrom, Transaction, WitnessArgs} from "@ckb-js-std/core";
import * as bindings from "@ckb-js-std/bindings";

class Serve implements RequestHandler {
    private callTime: number;
    constructor() {
        log.setLevel(log.LogLevel.Debug);
        this.callTime = 0;
    }
    serve(req: RequestPacket): ResponsePacket {
        let u8 = new Uint8Array(128* 1024);
        u8[0] = req.payload()[0];
        console.log(req.payload()[0])
        this.callTime+=100;
        return new ResponsePacket(this.callTime,u8);
    }
}

function main() {
    log.setLevel(log.LogLevel.Debug);
    runServer(new Serve());
}

main();