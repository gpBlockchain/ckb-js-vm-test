import * as bindings from "@ckb-js-std/bindings";
import {hashCkb, HighLevel, log} from "@ckb-js-std/core";
import {
    CELL_FIELD_DATA_HASH,

    CELL_FIELD_TYPE_HASH, hex, hex as St, printf,
    SCRIPT_HASH_TYPE_DATA2, Sha256, SOURCE_CELL_DEP,
    SOURCE_GROUP_INPUT, SOURCE_INPUT
} from "@ckb-js-std/bindings";

ArrayBuffer.prototype.hasOwnProperty("toJSON") || Object.defineProperty(ArrayBuffer.prototype, "toJSON", {
    value: function () {
        return `0x${St.encode(this)}`
    }, enumerable: !1, writable: !0, configurable: !0
});

function main() {
    log.setLevel(log.LogLevel.Debug);
    log.debug("begin --");

    let msgBuffer    = new ArrayBuffer(32);
    console.log(`msgBuffer:${JSON.stringify(msgBuffer)}`)

    let sha256 = new bindings.Sha256();
    sha256.update(msgBuffer);
    let hash = sha256.finalize();
    console.assert(JSON.stringify(hash) == '"0x66687aadf862bd776c8fc18b8e9f8e20089714856ee233b3902a591d0d5f2925"', 'hash should be 0x374708fff7719dd5979ec875d56cd2286f6d3cf7ec317a3b25632aab28ec37bb');

    let keccak256 = new bindings.Keccak256();
    keccak256.update(msgBuffer);
    hash = keccak256.finalize();
    console.log(`keccak256:${JSON.stringify(hash)}`)
    console.assert(JSON.stringify(hash) == '"0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563"', 'hash should be 0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563');
    let blake2b = new bindings.Blake2b("ckb-default-hash");
    blake2b.update(msgBuffer);
    hash = blake2b.finalize();
    console.log(`blake2b:${JSON.stringify(hash)}`)
    console.assert(JSON.stringify(hash) == '"0x266cec97cbede2cfbce73666f08deed9560bdf7841a7a5a51b3a3f09da249e21"', 'hash should be 0x266cec97cbede2cfbce73666f08deed9560bdf7841a7a5a51b3a3f09da249e21');
    let ripemd160 = new bindings.Ripemd160();
    ripemd160.update(msgBuffer);
    let ripemd160Msg = ripemd160.finalize()
    console.log(`ripemd160:${JSON.stringify(ripemd160Msg)}`)
    console.assert(JSON.stringify(ripemd160Msg) == '"0xd1a70126ff7a149ca6f9b638db084480440ff842"', 'hash should be 0xd1a70126ff7a149ca6f9b638db084480440ff842');
    let hexBuffer =  bindings.hex.encode(msgBuffer);
    console.log(`hexBuffer:${hexBuffer}`)
    console.assert(hexBuffer == '0000000000000000000000000000000000000000000000000000000000000000'," 'encode should be 0x0000000000000000000000000000000000000000000000000000000000000000")
    let decodeBuffer = bindings.hex.decode(hexBuffer);
    console.log(`decodeBuffer:${JSON.stringify(decodeBuffer)}`)
    console.assert(JSON.stringify(decodeBuffer) == '"0x0000000000000000000000000000000000000000000000000000000000000000"'," 'decode should be 0x0000000000000000000000000000000000000000000000000000000000000000")

    let base64Buffer = bindings.base64.encode(msgBuffer);
    console.log(`base64Buffer:${base64Buffer}`)
    console.assert(JSON.stringify(base64Buffer) == '"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="', 'base64 should be AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=');
    console.log("bindings.base64.decode(base64Buffer):")
    // let buffer = bindings.base64.decode('SGVsbG8gV29ybGQh');
    // console.log(`buffer:${JSON.stringify(buffer)}`)
    // console.assert(JSON.stringify(buffer) == '"0x0000000000000000000000000000000000000000000000000000000000000000"'," 'base64 decode should be 0x")
    // 48656c6c6f20576f726c6421
    let input = bindings.hex.decode("48656c6c6f20576f726c6421");
    let ret = bindings.base64.encode(input);
    console.log(`48656c6c6f20576f726c6421:${ret}`)
    // todo check base 64 decode failed
    let ret2 = bindings.base64.decode("SGVsbG8gV29ybGQhMTIzNA==")
    console.log(`ret2:${JSON.stringify(ret2)}`)
    return 0;
}

bindings.exit(main());
