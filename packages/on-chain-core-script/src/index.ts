import * as bindings from "@ckb-js-std/bindings";
import {Script, HighLevel, log,} from "@ckb-js-std/core";


function main() {
    log.setLevel(log.LogLevel.Debug);

    return 0;
}

bindings.exit(main());
