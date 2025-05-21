import * as bindings from "@ckb-js-std/bindings";
import {Script, HighLevel, log, bytesConcat, bytesEq} from "@ckb-js-std/core";
import {hex, SOURCE_OUTPUT} from "@ckb-js-std/bindings";
import {mol} from "@ckb-js-std/core";


function main() {
    log.setLevel(log.LogLevel.Debug);
    HighLevel.loadScript();
    // mol.Uint8Opt.encode(0) == 0x ,expected 0x00?
    let ret1 = mol.Uint8.encode(0);
    log.debug(`ret:${JSON.stringify(ret1)}`);
    let ret = mol.Uint8Opt.encode(0);
    log.debug(`ret:${JSON.stringify(ret)}`);
    console.log(ret)

    // uint64 max can't encode,should use bigint?
    let encode18446744073709551615 = mol.Uint64.encode(18446744073709551615n);
    console.log(`Uint64(18446744073709551615) = ${hex.encode(encode18446744073709551615)}`);

    // Uint128 encode return err
    let encode128 = mol.Uint128.encode(0);
    console.log(`Uint128(0) = ${hex.encode(encode128)}`);
    let encode340282366920938463463374607431768211455n = mol.Uint128.encode(340282366920938463463374607431768211455n);
    console.log(`Uint128(encode340282366920938463463374607431768211455n) = ${hex.encode(encode340282366920938463463374607431768211455n)}`);
    let decode340282366920938463463374607431768211455n = mol.Uint128.decode(encode340282366920938463463374607431768211455n);
    console.log(`decode340282366920938463463374607431768211455n = ${decode340282366920938463463374607431768211455n}`);


    // Uint256 encode return err
    let encode256 = mol.Uint256.encode(0);
    console.log(`Uint256(0) = ${hex.encode(encode256)}`);
    let encode115792089237316195423570985008687907853269984665640564039457584007913129639935n = mol.Uint256.encode(115792089237316195423570985008687907853269984665640564039457584007913129639935n);
    console.log(`Uint256(encode115792089237316195423570985008687907853269984665640564039457584007913129639935n) = ${hex.encode(encode115792089237316195423570985008687907853269984665640564039457584007913129639935n)}`);
    let decode115792089237316195423570985008687907853269984665640564039457584007913129639935n = mol.Uint256.decode(encode115792089237316195423570985008687907853269984665640564039457584007913129639935n);
    console.log(`decode115792089237316195423570985008687907853269984665640564039457584007913129639935n = ${decode115792089237316195423570985008687907853269984665640564039457584007913129639935n}`);

    let encode512 = mol.Uint512.encode(0);
    console.log(`Uint512(0) = ${hex.encode(encode512)}`);
    let encode512Max = mol.Uint512.encode(13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084095n);
    console.log(`encode512Max = ${hex.encode(encode512Max)}`);
    let decode512Max = mol.Uint512.decode(encode512Max);
    console.log(`decode512Max = ${decode512Max}`);


    let encodeBytes = mol.BytesOpt.encode(new Uint8Array([]));
    console.log(`BytesOpt([]) = ${hex.encode(encodeBytes)}`);

    // bool encode failed
    let encodeBool = mol.BoolOpt.encode(false);
    log.debug(`ret:${JSON.stringify(ret)}`);
    console.log(`BoolOpt(false) = ${hex.encode(encodeBool)}`);

    // string encode
    let emptyStr = mol.String.encode("");
    console.log(`String("") = ${hex.encode(emptyStr)}`);

    return 0;
}

bindings.exit(main());
