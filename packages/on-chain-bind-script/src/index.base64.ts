import * as bindings from "@ckb-js-std/bindings";

import {
    base64,
    TextEncoder,
    TextDecoder,
     hex as St,
} from "@ckb-js-std/bindings";

ArrayBuffer.prototype.hasOwnProperty("toJSON") || Object.defineProperty(ArrayBuffer.prototype, "toJSON", {
    value: function () {
        return `0x${St.encode(this)}`
    }, enumerable: !1, writable: !0, configurable: !0
});

function main() {
    // should encode a string to base64
    let input = new TextEncoder().encode("Hello, world!");
    let result = base64.encode(input.buffer);
    console.assert(result === "SGVsbG8sIHdvcmxkIQ==", "should encode a string to base64");

    // should encode an empty ArrayBuffer to empty base64 string
    let input1 = new ArrayBuffer(0);
    let result1 = base64.encode(input1);
    console.assert(result1 === "", "should encode an empty ArrayBuffer to empty base64 string");

    // should encode binary data with special characters
    // let input2 = new TextEncoder().encode("\x00\xFF\x7F");
    // console.log("should encode binary data with special characters:",JSON.stringify(input2));
    // const result2 = base64.encode(input2.buffer);
    // console.log(result2)
    // console.assert(result2 === "AP9/", "should encode binary data with special characters");

    // should handle non-ASCII characters (UTF-8)
    const input3 = new TextEncoder().encode("こんにちは");
    const result3 = base64.encode(input3.buffer);
    console.assert(result3 === "44GT44KT44Gr44Gh44Gv", "should handle non-ASCII characters (UTF-8)");

    // should decode a base64 string to ArrayBuffer
    let input4 = "SGVsbG8sIHdvcmxkIQ==";
    const result4 = base64.decode(input4);
    const decoded4 = new TextDecoder().decode(new Uint8Array(result4));
    console.assert(decoded4 === "Hello, world!", "should decode a base64 string to ArrayBuffer");

    // should decode an empty base64 string to empty ArrayBuffer
    try {
        const result5 = base64.decode("");
        console.log("result5:",result5)
    }catch (e) {
        console.log("should decode an empty base64 string to empty ArrayBuffer error:",e)

    }

    // console.assert(result5.byteLength === 0, "should decode an empty base64 string to empty ArrayBuffer");
    // console.assert(result5 instanceof ArrayBuffer, "should decode an empty base64 string to empty ArrayBuffer");

    // should decode base64 with special characters
    console.log("should decode base64 with special characters");
    let input6 = "AP9/";
    let result6 = base64.decode(input6);
    console.log("result6:",result6)
    const decoded6 = new Uint8Array(result6);
    console.assert(decoded6[0] === 0, "should decode base64 with special characters");
    console.assert(decoded6[1] === 255, "should decode base64 with special characters");
    console.assert(decoded6[2] === 127, "should decode base64 with special characters");
    let data = base64.encode(decoded6.buffer);
    console.log("data:",data)


    // should decode base64 with non-ASCII characters (UTF-8)
    console.log("should decode base64 with non-ASCII characters (UTF-8)");
    const input7 = "44GT44KT44Gr44Gh44Gv";
    const result7 = base64.decode(input7);
    const decoded7 = new TextDecoder().decode(new Uint8Array(result7));
    console.log("decoded7:",decoded7)
    // console.assert(decoded7 === "こんにちは", "should decode base64 with non-ASCII characters (UTF-8)");

    // should throw an error for invalid base64 string
    const invalidInputs = [
        "SGVsbG8sIHdvcmxkIQ==", // Valid, but we'll test malformed ones
        "Invalid!@", // Invalid characters
        "SGVsbG8=", // Incorrect padding
        "SGVsbG8", // Missing padding
    ];
    for (let i = 0; i < invalidInputs.length; i++) {
        try {
            base64.decode(invalidInputs[i]);
        } catch (e) {
            console.log(`Error decoding "${invalidInputs[i]}": ${e}`);
        }
    }


    // should encode and decode back to the same data

    const inputs = [
        "Hello, world!",
        "简简单单",
        "こんにちは",
        "表情包✋",
        "特别长的字符串，测试一下编码和解码的性能和准确性。特别长的字符串，测试一下编码和解码的性能和准确性。特别长的字符串，测试一下编码和解码的性能和准确性。再来一段，saadadnadnalndlandlasndlnasldnladnlanldnaldnlasdnaldnaldnlanda",
    ];
    for (const input of inputs) {
        const buffer = new TextEncoder().encode(input).buffer;
        const encoded = base64.encode(buffer);
        const decoded = base64.decode(encoded);
        const decodedText = new TextDecoder().decode(new Uint8Array(decoded));
        console.log(`input:${input} Encoded: ${encoded}, Decoded: ${decodedText}`);
        console.assert(decodedText === input, `Failed to encode/decode: ${input}`);
    }
    return 0;
}

bindings.exit(main());
