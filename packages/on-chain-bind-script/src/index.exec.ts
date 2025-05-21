import * as bindings from "@ckb-js-std/bindings";
import {HighLevel, log} from "@ckb-js-std/core";
import {
    CELL_FIELD_DATA_HASH,

    CELL_FIELD_TYPE_HASH, printf,
    SCRIPT_HASH_TYPE_DATA2, SOURCE_CELL_DEP,
    SOURCE_GROUP_INPUT, SOURCE_INPUT
} from "@ckb-js-std/bindings";

function main() {
    log.setLevel(log.LogLevel.Debug);
    const js_code = `
             import * as bindings from "@ckb-js-std/bindings";
             let version = bindings.vmVersion();
             console.assert(version === 2, "vmVersion should be 0x1");
    `;
    let script = HighLevel.loadCellType(0, SOURCE_GROUP_INPUT);
    bindings.execCell(script!.codeHash, SCRIPT_HASH_TYPE_DATA2, 0, 0, "-e", js_code);
    return 0;
}

bindings.exit(main());
