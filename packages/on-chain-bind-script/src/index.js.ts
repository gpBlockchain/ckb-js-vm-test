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
    bindings.debug("debug test");
    let flag = true;
    bindings.evalJsScript(`console.log("hello world");`);
    // should throw error for invalid JavaScript
    try {
        bindings.evalJsScript(`console.log("hello world");console.log.asser(1==2,"failed")`);
        flag = false;
    } catch (e) {
        // @ts-ignore
        log.error("evalJsScript error:", e.toString());
    }
    console.assert(flag, "failed")
    // should evaluate simple JavaScript expression
    let script = '2 + 2';
    let result = bindings.evalJsScript(script);
    console.log("should evaluate simple JavaScript expression")
    console.assert(result === 4, "should evaluate simple JavaScript expression");

    // should evaluate JavaScript function
    script = `
      (function() {
        return "Hello, World!";
      })();
    `;
    result = bindings.evalJsScript(script);
    console.log("should evaluate JavaScript function")
    console.assert(result === 'Hello, World!', "should evaluate simple JavaScript expression");

    // should handle complex object returns
    script = `
      ({
        name: "Test",
        value: 42,
        nested: { active: true }
      })
    `;
    let jsonObj = bindings.evalJsScript(script);
    console.log("should handle complex object returns")
    log.debug(`result:${JSON.stringify(jsonObj)}`);
    console.assert(jsonObj.name === "Test", "should handle complex object returns");
    // should not return value when enableModule is true
    script = `
      export const value = 42;
    `;
    result = bindings.evalJsScript(script, true);
    console.log("should not return value when enableModule is true")
    log.debug(`result:${JSON.stringify(result)}`);
    console.assert(result === undefined, "should not return value when enableModule is true");

    // should use default enableModule=false when not specified
    script = 'const x = 10; x * 2';
    result = bindings.evalJsScript(script);
    log.debug("should use default enableModule=false when not specified")
    log.debug(`result:${JSON.stringify(result)}`);
    console.assert(result === 20, "should use default enableModule=false when not specified");
    // should handle variable declarations
    script = `
      let x1 = 5;
      const y1 = 10;
      x1 + y1;
    `;
    result = bindings.evalJsScript(script);
    console.log("should handle variable declarations")
    log.debug(`result:${JSON.stringify(result)}`);
    console.assert(result === 15, "should handle variable declarations");
    let parseJson  = bindings.parseExtJSON(JSON.stringify(jsonObj));
    log.debug(`parseJson:${JSON.stringify(parseJson)}`);
    log.debug(`jsonObj:${JSON.stringify(jsonObj)}`);
    // @ts-ignore
    console.assert(parseJson.name === "Test", "should handle complex object returns");
    return 0;
}

bindings.exit(main());
