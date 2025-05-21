import * as bindings from "@ckb-js-std/bindings";
import {Script, HighLevel, log, hashCkb} from "@ckb-js-std/core";
import {
    CELL_FIELD_CAPACITY,
    CELL_FIELD_DATA_HASH,
    CELL_FIELD_LOCK,
    CELL_FIELD_LOCK_HASH,
    CELL_FIELD_TYPE,
    CELL_FIELD_TYPE_HASH,
    hex as St, INPUT_FIELD_OUT_POINT,
    loadCellData,
    loadHeaderByField,
    SOURCE_CELL_DEP,
    SOURCE_GROUP_INPUT,
    SOURCE_GROUP_OUTPUT, SOURCE_HEADER_DEP,
    SOURCE_INPUT,
    SOURCE_OUTPUT,
    SourceType,
    spawnCell
} from "@ckb-js-std/bindings";


ArrayBuffer.prototype.hasOwnProperty("toJSON") || Object.defineProperty(ArrayBuffer.prototype, "toJSON", {
    value: function () {
        return `0x${St.encode(this)}`
    }, enumerable: !1, writable: !0, configurable: !0
});
BigInt.prototype.hasOwnProperty("toJSON") || Object.defineProperty(BigInt.prototype, "toJSON", {
    value: function () {
        return this.toString()
    }, enumerable: !1, writable: !0, configurable: !0
});

function main() {
    log.setLevel(log.LogLevel.Debug);

    let inputWitness = bindings.loadWitness(0, SOURCE_INPUT);
    log.debug(`inputWitness:${JSON.stringify(inputWitness)}`);
    console.assert(JSON.stringify(inputWitness) == '"0x01"', "inputWitness is not 0x01");
    let outputWitness = bindings.loadWitness(0, SOURCE_GROUP_INPUT);
    log.debug(`outputWitness:${JSON.stringify(outputWitness)}`);
    console.assert(JSON.stringify(outputWitness) == '"0x02"', "outputWitness is not 0x02");
    let groupInputWitness = bindings.loadWitness(0, SOURCE_GROUP_INPUT);
    log.debug(`groupInputWitness:${JSON.stringify(groupInputWitness)}`);
    console.assert(JSON.stringify(groupInputWitness) == '"0x02"', "groupInputWitness is not 0x02");
    let groupOutputWitness = bindings.loadWitness(0, SOURCE_GROUP_OUTPUT);
    log.debug(`groupOutputWitness:${JSON.stringify(groupOutputWitness)}`);
    console.assert(JSON.stringify(groupOutputWitness) == '"0x02"', "groupOutputWitness is not 0x02");
    return 0;
}
bindings.exit(main());
