import * as bindings from "@ckb-js-std/bindings";
import { Script, HighLevel, log } from "@ckb-js-std/core";

function main() {
  log.setLevel(log.LogLevel.Debug);
  let scipt = HighLevel.loadScript();
  let script = bindings.loadScript();
  log.debug(`raw current script: ${JSON.stringify(script)}`);
  let flag = bindings.loadScript(0,2);
  log.debug(`flag:${flag}`)
  let codeHash = bindings.loadScript(2,34);
  log.debug(`codeHash:${codeHash}`)
  let type = bindings.loadScript(34,1);
  log.debug(`type:${type}`)
  return 0;
}

bindings.exit(main());
