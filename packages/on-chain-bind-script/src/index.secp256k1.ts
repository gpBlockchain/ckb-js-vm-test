import * as misc from "@ckb-js-std/bindings";
import * as ckb from "@ckb-js-std/bindings";

import { log} from "@ckb-js-std/core";
import {

     hex as St,
     secp256k1,
} from "@ckb-js-std/bindings";

ArrayBuffer.prototype.hasOwnProperty("toJSON") || Object.defineProperty(ArrayBuffer.prototype, "toJSON", {
    value: function () {
        return `0x${St.encode(this)}`
    }, enumerable: !1, writable: !0, configurable: !0
});

function main() {
    log.setLevel(log.LogLevel.Debug);

    const recid = 1;
    const msg = misc.hex.decode(
        '6a0024347e28905e2587c4c7598332a39' +
        'ba6684bb6b74653511656a02bd20edb');
    const sig = misc.hex.decode(
        '76e6d0e5ea61b46fe10443fe5b4d1bc6' +
        'ce2d0d49d55e810312f7c22702e0548a' +
        '3969ce72940a34632f93ebd1b8d591c3' +
        '775428f035c6577e4adf8068b04819f0');
    const s = ckb.currentCycles();
    const expected_pubkey = misc.hex.decode(
        'aca98c5822b997c15f8c974386a11b14' +
        'a0d009a4d5156e145644573e82ef7e7b' +
        '226b9eb6173d6b4504606eb8d9558bde' +
        '98d12100836e92d306a40f337ed8a0f3');
    const e = ckb.currentCycles();
    console.log(`misc.hex.decode: ${e - s}`);

    // Verify the signature
    let success = false;
    const wrong_sig = misc.hex.decode(
        '00000000000000000000000000000000' +
        '00000000000000000000000000000000' +
        '00000000000000000000000000000000' +
        '00000000000000000000000000000000');
    try {
        let success = secp256k1.recover(wrong_sig, recid, msg);
    } catch (e) {
        success = true;
    }
    console.assert(success, 'Signature recovery should fail');
    const start = ckb.currentCycles();
    const pubkey = secp256k1.recover(sig, recid, msg);
    const end = ckb.currentCycles();
    console.log(`recover cycles: ${end - start}`);
    console.assert(
        misc.hex.encode(pubkey) === misc.hex.encode(expected_pubkey),
        'Signature recovery failed');

    console.log('test_recovery ok');


    return 0;
}

ckb.exit(main());
