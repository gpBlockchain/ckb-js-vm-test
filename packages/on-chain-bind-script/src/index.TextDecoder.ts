import * as bindings from "@ckb-js-std/bindings";
import * as misc from "@ckb-js-std/bindings";


// todo check contract can use TextEncoder
function main() {

    const encoder = new misc.TextEncoder();
    const encoded = encoder.encode("你好世界");
    // Each Chinese character takes 3 bytes in UTF-8
    const expected = new Uint8Array([
        0xe4, 0xbd, 0xa0,  // 你
        0xe5, 0xa5, 0xbd,  // 好
        0xe4, 0xb8, 0x96,  // 世
        0xe7, 0x95, 0x8c   // 界
    ]);
    console.assert(
        encoded.byteLength === expected.length, 'Encoded length mismatch');
    for (let i = 0; i < encoded.length; i++) {
        console.assert(encoded[i] === expected[i], `Byte mismatch at position ${i}`);
    }
    console.log('test_text_encoder ok');

    const decoder = new misc.TextDecoder();
    const decoded = decoder.decode(encoded);
    console.assert(decoded === "你好世界", 'TextDecoder failed');
    console.log('test_text_decoder ok');
    return 0;
}

bindings.exit(main());
