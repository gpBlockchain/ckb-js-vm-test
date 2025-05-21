import * as bindings from "@ckb-js-std/bindings";
import {
    Script,
    HighLevel,
    log,
    bytesConcat,
    bytesEq,
    HasherCkb,
    hashCkb,
    hashTypeId,
    numFromBytes, numToBytes
} from "@ckb-js-std/core";
import {hex, Keccak256, SOURCE_GROUP_INPUT, SOURCE_OUTPUT, TextEncoder} from "@ckb-js-std/bindings";


function main() {
    log.setLevel(log.LogLevel.Debug);
    // numFromBytes
    HighLevel.loadScript();
    // let ret = numFromBytes(hex.decode("0fffff"));
    // console.log(`numFromBytes: ${ret}`);
    let bts = numToBytes(16776975,1)
    console.log(`numToBytes: ${hex.encode(bts)}`);
    let newBts =numFromBytes(bts);
    console.log(`numFromBytes: ${newBts}`);
    console.log(`length:`,hex.decode("ffffffffffffffffff00000000000000").byteLength)

    let nfb = numFromBytes(hex.decode("ffffffffffffffffff00000000000000"))
    console.log(`bfb: ${nfb}`);
    return 0;
}

bindings.exit(main());
