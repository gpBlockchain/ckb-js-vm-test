import * as bindings from "@ckb-js-std/bindings";
import {hex as St, SCRIPT_HASH_TYPE_DATA2, SOURCE_CELL_DEP, SOURCE_GROUP_INPUT} from "@ckb-js-std/bindings";
import {HighLevel, log} from "@ckb-js-std/core";
ArrayBuffer.prototype.hasOwnProperty("toJSON") || Object.defineProperty(ArrayBuffer.prototype, "toJSON", {
    value: function () {
        return `0x${St.encode(this)}`
    }, enumerable: !1, writable: !0, configurable: !0
});
function main() {
    log.setLevel(log.LogLevel.Debug);
    console.log('test_spawn ...');

    bindings.loadCell(0, SOURCE_GROUP_INPUT,0,4);
    const js_code = `
    import * as bindings from "@ckb-js-std/bindings";
    import { SOURCE_GROUP_INPUT } from "@ckb-js-std/bindings";
    let pid2 = bindings.processId();
    console.log("pid2:",pid2);
    console.assert(pid2 === 1);
    let fds = bindings.inheritedFds();
    let cell = bindings.loadCell(0, SOURCE_GROUP_INPUT);
    bindings.write(fds[0], cell);
    console.log("wait close ");
    bindings.close(fds[0]);
    bindings.exit(42);
    `;
    const js_code2 = `
    import * as bindings from "@ckb-js-std/bindings";
    import { SOURCE_GROUP_INPUT } from "@ckb-js-std/bindings";
    let pid2 = bindings.processId();
    console.log("pid2:",pid2);
    console.assert(pid2 === 2);
    let fds = bindings.inheritedFds();
    let cell = bindings.loadCell(0, SOURCE_GROUP_INPUT);
    bindings.write(fds[0], cell);
    console.log("wait close ");
    bindings.close(fds[0]);
    bindings.exit(42);
    `;
    let pid1 = bindings.processId();
    log.debug("pid1:",pid1);
    console.assert(pid1 === 0);
    //0x5af28d9b049d341397991fd53d6e1bf4d9819dddc6a93fd0e13328dde9d573
    let code_hash =      HighLevel.loadCellType(0, SOURCE_GROUP_INPUT)!.codeHash;

    // let code_hash = new Uint8Array([
    //     0xdf, 0x97, 0x77, 0x78, 0x08, 0x9b, 0xf3, 0x3f, 0xc5, 0x1f, 0x22, 0x45, 0xfa, 0x6d, 0xb7, 0xfa,
    //     0x18, 0x19, 0xd5, 0x03, 0x11, 0x31, 0xa8, 0x3d, 0x4e, 0xcb, 0xcb, 0x6c, 0xba, 0x07, 0xce, 0x91
    // ]);
    let fds = bindings.pipe();
    // Unlike the C version, we only need to pass in two parameters: argv and inherited_fds.
    // * There is no need to use the argc parameter.
    // * There is no need to add 0 to the end of inherited_fds as a terminator.
    // * There is no need to pass in the pid address.
    let spawn_args = {
        argv: ['-e', js_code],
        inheritedFds: [fds[1]],
    };
    let script = HighLevel.loadScript();
    log.debug(`script:${script}`)
    let pid = bindings.spawnCell(code_hash, SCRIPT_HASH_TYPE_DATA2, 0, 0, spawn_args);
    log.debug(`pid:${pid}`)
    let cell = bindings.loadCell(0, SOURCE_GROUP_INPUT);
    let txt = bindings.read(fds[0], cell.byteLength);
    log.debug(`txt:${JSON.stringify(txt)}`)
    log.debug(`cell:${JSON.stringify(cell)}`)
    console.assert(JSON.stringify(cell) == JSON.stringify(txt),"cell eq");
    let ret = bindings.wait(pid);
    log.debug(`ret:${ret}`)
    console.assert(ret == 42);
    console.log('test_spawn done');
    fds = bindings.pipe();
    // Unlike the C version, we only need to pass in two parameters: argv and inherited_fds.
    // * There is no need to use the argc parameter.
    // * There is no need to add 0 to the end of inherited_fds as a terminator.
    // * There is no need to pass in the pid address.
    spawn_args = {
        argv: ['-e', js_code2],
        inheritedFds: [fds[1]],
    };
    pid = bindings.spawn(0,SOURCE_CELL_DEP,0,0,spawn_args);
    // pid = bindings.spawnCell(code_hash, SCRIPT_HASH_TYPE_DATA2, 0, 0, spawn_args);
    log.debug(`pid:${pid}`)
    cell = bindings.loadCell(0, SOURCE_GROUP_INPUT);
    txt = bindings.read(fds[0], cell.byteLength);
    log.debug(`txt1:${JSON.stringify(txt)}`)
    log.debug(`cell1:${JSON.stringify(cell)}`)
    console.assert(JSON.stringify(cell) == JSON.stringify(txt),"cell eq");
    ret = bindings.wait(pid);
    log.debug(`ret1:${ret}`)
    console.assert(ret == 42);
    console.log('test_spawn done');
    return 0;
}

bindings.exit(main());
