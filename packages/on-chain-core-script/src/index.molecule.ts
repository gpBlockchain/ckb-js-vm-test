import * as bindings from "@ckb-js-std/bindings";
import {log, HighLevel, Script, hashTypeFrom, Transaction, WitnessArgs, bytesEq} from "@ckb-js-std/core";
import {hex as St, hex} from "@ckb-js-std/bindings";
import {mol} from "@ckb-js-std/core";

// JSON.stringify(data, (key, value) =>
//     typeof value === "bigint" ? JSON.rawJSON(value.toString()) : value,
// );


function main() {
    log.setLevel(log.LogLevel.Debug);
    // export const Uint8 = uintNumber(1, true);

    let encode0 = mol.Uint8.encode(0);
    console.log(`Uint8(0) = ${hex.encode(encode0)}`);
    console.assert(bytesEq(encode0,hex.decode("00")),"Uint8(0) = 00")
    let decode0 = mol.Uint8.decode(encode0);
    console.log(`decode0 = ${decode0}`);
    console.assert(decode0 == 0,"decode0 = 0")


    // Uint8 max
    let encode255 = mol.Uint8.encode(255);
    console.log(`Uint8(255) = ${hex.encode(encode255)}`);
    console.assert(bytesEq(encode255,hex.decode("ff")),"Uint8(255) = ff")


    let decode255 = mol.Uint8.decode(encode255);
    console.log(`decode255 = ${decode255}`);
    console.assert(decode255 == 255,"decode255 = 255")
    // 溢出不准
    let encode256 = mol.Uint8.encode(256);
    console.log(`Uint8(256) = ${hex.encode(encode256)}`);
    console.assert(bytesEq(encode256,hex.decode("00")),"Uint8(256) = 00")

    // export const Uint8Opt = option(Uint8);
    let encodeUndefined = mol.Uint8Opt.encode(undefined);
    console.log(`Uint8Opt(undefined) = ${hex.encode(encodeUndefined)}`);
    console.assert(bytesEq(encodeUndefined,new ArrayBuffer(0)),"Uint8Opt(undefined) = ")

    let decodeUndefined = mol.Uint8Opt.decode(encodeUndefined);
    console.log(`decodeUndefined = ${decodeUndefined}`);
    console.assert(decodeUndefined == undefined,"decodeUndefined = undefined")
    // todo check mol.Uint8Opt.encode(0);
    encode0 = mol.Uint8Opt.encode(0);
    console.log(`Uint8Opt(0) = ${hex.encode(encode0)}`);
    console.assert(bytesEq(encode0,hex.decode("00")),"Uint8Opt(0) = 00")
    // Uint8 max
    encode255 = mol.Uint8Opt.encode(255);
    console.log(`Uint8Opt(255) = ${hex.encode(encode255)}`);
    console.assert(bytesEq(encode255,hex.decode("ff")),"Uint8Opt(255) = ff")

    encode256 = mol.Uint8Opt.encode(256);
    console.log(`Uint8Opt(256) = ${hex.encode(encode256)}`);
    console.assert(bytesEq(encode256,hex.decode("00")),"Uint8Opt(256) = 00")
    // export const Uint8Vec = vector(Uint8);
    // empty
    let encodeEmptyVec = mol.Uint8Vec.encode([]);
    console.log(`Uint8Vec([]) = ${hex.encode(encodeEmptyVec)}`);
    console.assert(bytesEq(encodeEmptyVec,hex.decode("00000000")),"Uint8Vec([]) = 00000000")
    let decodeEmptyVec = mol.Uint8Vec.decode(encodeEmptyVec);
    console.log(`decodeEmptyVec = ${JSON.stringify(decodeEmptyVec)}`);
    console.assert(JSON.stringify(decodeEmptyVec) == "[]","decodeEmptyVec = []")
    // 1
    let encodeVec = mol.Uint8Vec.encode([0, 1, 255, 256]);
    console.log(`encodeVec([]) = ${hex.encode(encodeVec)}`);
    console.assert(bytesEq(encodeVec,hex.decode("040000000001ff00")),"encodeVec([]) = 040000000001ff00")
    let decodeVec = mol.Uint8Vec.decode(encodeVec)
    console.log(`decodeVec = ${JSON.stringify(decodeVec)}`);
    console.assert(JSON.stringify(decodeVec) == "[0,1,255,0]","decodeVec = [0,1,255,0]")

    // export const Uint16 = uintNumber(2, true);
    let encode16 = mol.Uint16.encode(0);
    console.log(`Uint16(0) = ${hex.encode(encode16)}`);
    console.assert(bytesEq(encode16,hex.decode("0000")),"Uint16(0) = 0000")
    let decode16 = mol.Uint16.decode(encode16);
    console.log(`decode16 = ${decode16}`);
    console.assert(decode16 == 0,"decode16 = 0")

    // Uint16 max
    let encode65535 = mol.Uint16.encode(65535);
    console.log(`Uint16(65535) = ${hex.encode(encode65535)}`);
    console.assert(bytesEq(encode65535,hex.decode("ffff")),"Uint16(65535) = ffff")
    let decode65535 = mol.Uint16.decode(encode65535);
    console.log(`decode65535 = ${decode65535}`);
    console.assert(decode65535 == 65535,"decode65535 = 65535")
    // 溢出不准
    let encode65536 = mol.Uint16.encode(65536);
    console.log(`Uint16(65536) = ${hex.encode(encode65536)}`);
    console.assert(bytesEq(encode65536,hex.decode("0000")),"Uint16(65536) = 0000")

    // export const Uint16Opt = option(Uint16);
    let encodeUndefined16 = mol.Uint16Opt.encode(undefined);
    console.log(`Uint16Opt(undefined) = ${hex.encode(encodeUndefined16)}`);
    console.assert(bytesEq(encodeUndefined16,new ArrayBuffer(0)),"Uint16Opt(undefined) = ")
    let decodeUndefined16 = mol.Uint16Opt.decode(encodeUndefined16);
    console.log(`decodeUndefined16 = ${decodeUndefined16}`);
    console.assert(decodeUndefined16 == undefined,"decodeUndefined16 = undefined")
    // todo check mol.Uint16Opt.encode(0);
    encode16 = mol.Uint16Opt.encode(0);
    console.log(`Uint16Opt(0) = ${hex.encode(encode16)}`);
    console.assert(bytesEq(encode16,hex.decode("0000")),"Uint16Opt(0) = 0000")

    // Uint16 max
    encode65535 = mol.Uint16Opt.encode(65535);
    console.log(`Uint16Opt(65535) = ${hex.encode(encode65535)}`);
    console.assert(bytesEq(encode65535,hex.decode("ffff")),"Uint16Opt(65535) = ffff")
    encode65536 = mol.Uint16Opt.encode(65536);
    console.log(`Uint16Opt(65536) = ${hex.encode(encode65536)}`);
    console.assert(bytesEq(encode65536,hex.decode("0000")),"Uint16Opt(65536) = 0000")

    // export const Uint16Vec = vector(Uint16);
    // empty
    encodeEmptyVec = mol.Uint16Vec.encode([]);
    console.log(`Uint16Vec([]) = ${hex.encode(encodeEmptyVec)}`);
    console.assert(bytesEq(encodeEmptyVec,hex.decode("00000000")),"Uint16Vec([]) = 00000000")
    decodeEmptyVec = mol.Uint16Vec.decode(encodeEmptyVec);
    console.log(`decodeEmptyVec = ${JSON.stringify(decodeEmptyVec)}`);
    console.assert(JSON.stringify(decodeEmptyVec) == "[]","decodeEmptyVec = []")
    // 1
    encodeVec = mol.Uint16Vec.encode([0, 1, 65535, 65536]);
    console.log(`encodeVec([]) = ${hex.encode(encodeVec)}`);
    console.assert(bytesEq(encodeVec,hex.decode("0400000000000100ffff0000")),"encodeVec([]) = 0400000000000100ffff0000")
    decodeVec = mol.Uint16Vec.decode(encodeVec)
    console.log(`decodeVec = ${JSON.stringify(decodeVec)}`);
    console.assert(JSON.stringify(decodeVec) == "[0,1,65535,0]","decodeVec = [0,1,65535,0]")


    // export const Uint32 = uintNumber(4, true);
    let encode32 = mol.Uint32.encode(0);
    console.log(`Uint32(0) = ${hex.encode(encode32)}`);
    console.assert(bytesEq(encode32,hex.decode("00000000")),"Uint32(0) = 00000000")
    let decode32 = mol.Uint32.decode(encode32);
    console.log(`decode32 = ${decode32}`);
    console.assert(decode32 == 0,"decode32 = 0")
    // Uint32 max
    let encode4294967295 = mol.Uint32.encode(4294967295);
    console.log(`Uint32(4294967295) = ${hex.encode(encode4294967295)}`);
    console.assert(bytesEq(encode4294967295,hex.decode("ffffffff")),"Uint32(4294967295) = ffffffff")

    let decode4294967295 = mol.Uint32.decode(encode4294967295);
    console.log(`decode4294967295 = ${decode4294967295}`);
    console.assert(decode4294967295 == 4294967295,"decode4294967295 = 4294967295")
    // 溢出不准
    let encode4294967296 = mol.Uint32.encode(4294967296);
    console.log(`Uint32(4294967296) = ${hex.encode(encode4294967296)}`);
    console.assert(bytesEq(encode4294967296,hex.decode("00000000")),"Uint32(4294967296) = 00000000")

    // export const Uint32Opt = option(Uint32);
    let encodeUndefined32 = mol.Uint32Opt.encode(undefined);
    console.log(`Uint32Opt(undefined) = ${hex.encode(encodeUndefined32)}`);
    console.assert(bytesEq(encodeUndefined32,new ArrayBuffer(0)),"Uint32Opt(undefined) = ")
    let decodeUndefined32 = mol.Uint32Opt.decode(encodeUndefined32);
    console.log(`decodeUndefined32 = ${decodeUndefined32}`);
    console.assert(decodeUndefined32 == undefined,"decodeUndefined32 = undefined")

    encode32 = mol.Uint32Opt.encode(0);
    console.log(`Uint32Opt(0) = ${hex.encode(encode32)}`);
    console.assert(bytesEq(encode32,hex.decode("00000000")),"Uint32Opt(0) = 00000000")
    // Uint32 max
    encode4294967295 = mol.Uint32Opt.encode(4294967295);
    console.log(`Uint32Opt(4294967295) = ${hex.encode(encode4294967295)}`);
    console.assert(bytesEq(encode4294967295,hex.decode("ffffffff")),"Uint32Opt(4294967295) = ffffffff")
    encode4294967296 = mol.Uint32Opt.encode(4294967296);
    console.log(`Uint32Opt(4294967296) = ${hex.encode(encode4294967296)}`);
    console.assert(bytesEq(encode4294967296,hex.decode("00000000")),"Uint32Opt(4294967296) = 00000000")

    // export const Uint32Vec = vector(Uint32);
    // empty
    encodeEmptyVec = mol.Uint32Vec.encode([]);
    console.log(`Uint32Vec([]) = ${hex.encode(encodeEmptyVec)}`);
    console.assert(bytesEq(encodeEmptyVec,hex.decode("00000000")),"Uint32Vec([]) = 00000000")
    decodeEmptyVec = mol.Uint32Vec.decode(encodeEmptyVec);
    console.log(`decodeEmptyVec = ${JSON.stringify(decodeEmptyVec)}`);
    console.assert(JSON.stringify(decodeEmptyVec) == "[]","decodeEmptyVec = []")
    // 1
    encodeVec = mol.Uint32Vec.encode([0, 1, 4294967295, 4294967296]);
    console.log(`encodeVec([]) = ${hex.encode(encodeVec)}`);
    console.assert(bytesEq(encodeVec,hex.decode("040000000000000001000000ffffffff00000000")),"encodeVec([]) = 040000000000000001000000ffffffff00000000")
    decodeVec = mol.Uint32Vec.decode(encodeVec)
    console.log(`decodeVec = ${JSON.stringify(decodeVec)}`);
    console.assert(JSON.stringify(decodeVec) == "[0,1,4294967295,0]","decodeVec = [0,1,4294967295,0]")
    // export const Uint64 = uint(8, true);
    let encode64 = mol.Uint64.encode(0);
    console.log(`Uint64(0) = ${hex.encode(encode64)}`);
    console.assert(bytesEq(encode64,hex.decode("0000000000000000")),"Uint64(0) = 0000000000000000")
    let decode64 = mol.Uint64.decode(encode64);
    console.log(`decode64 = ${decode64}`);
    console.assert(decode64 == 0n,"decode64 = 0")
    // Uint64 max
    // todo check uint64 max
    let encode18446744073709551615 = mol.Uint64.encode(18446744073709551615n);
    console.log(`Uint64(18446744073709551615) = ${hex.encode(encode18446744073709551615)}`);
    console.assert(bytesEq(encode18446744073709551615,hex.decode("ffffffffffffffff")),"Uint64(18446744073709551615) = ffffffffffffffff")
    let decode18446744073709551615 = mol.Uint64.decode(encode18446744073709551615);
    console.log(`decode18446744073709551615 = ${decode18446744073709551615}`);
    console.assert(decode18446744073709551615 == 18446744073709551615n,"decode18446744073709551615 = 18446744073709551615")
    // 溢出不准
    let encode18446744073709551616 = mol.Uint64.encode(18446744073709551616n);
    console.log(`Uint64(18446744073709551616) = ${hex.encode(encode18446744073709551616)}`);
    console.assert(bytesEq(encode18446744073709551616,hex.decode("0000000000000000")),"Uint64(18446744073709551616) = 0000000000000000")

    // export const Uint64Opt = option(Uint64);
    let encodeUndefined64 = mol.Uint64Opt.encode(undefined);
    console.log(`Uint64Opt(undefined) = ${hex.encode(encodeUndefined64)}`);
    console.assert(bytesEq(encodeUndefined64,new ArrayBuffer(0)),"Uint64Opt(undefined) = ")
    let decodeUndefined64 = mol.Uint64Opt.decode(encodeUndefined64);
    console.log(`decodeUndefined64 = ${decodeUndefined64}`);
    console.assert(decodeUndefined64 == undefined,"decodeUndefined64 = undefined")
    encode64 = mol.Uint64Opt.encode(0);
    console.log(`Uint64Opt(0) = ${hex.encode(encode64)}`);
    console.assert(bytesEq(encode64,hex.decode("0000000000000000")),"Uint64Opt(0) = 0000000000000000")
    // Uint64 max
    encode18446744073709551615 = mol.Uint64Opt.encode(18446744073709551615n);
    console.log(`Uint64(18446744073709551615) = ${hex.encode(encode18446744073709551615)}`);
    console.assert(bytesEq(encode18446744073709551615,hex.decode("ffffffffffffffff")),"Uint64(18446744073709551615) = ffffffffffffffff");
    encode18446744073709551616 = mol.Uint64Opt.encode(18446744073709551616n);
    console.log(`Uint64(18446744073709551616) = ${hex.encode(encode18446744073709551616)}`);
    console.assert(bytesEq(encode18446744073709551616,hex.decode("0000000000000000")),"Uint64(18446744073709551616) = 0000000000000000");
    // export const Uint64Vec = vector(Uint64);
    // empty
    encodeEmptyVec = mol.Uint64Vec.encode([]);
    console.log(`Uint64Vec([]) = ${hex.encode(encodeEmptyVec)}`);
    console.assert(bytesEq(encodeEmptyVec,hex.decode("00000000")),"Uint64Vec([]) = 00000000")
    let decodeEmptyVec1 = mol.Uint64Vec.decode(encodeEmptyVec);
    console.log(`decodeEmptyVec1 = ${JSON.stringify(decodeEmptyVec1)}`);
    console.assert(JSON.stringify(decodeEmptyVec1) == "[]","decodeEmptyVec1 = []")
    // 1
    encodeVec = mol.Uint64Vec.encode([0n, 1n, 18446744073709551615n, 18446744073709551616n]);
    console.log(`encodeVec([]) = ${hex.encode(encodeVec)}`);
    console.assert(bytesEq(encodeVec,hex.decode("0400000000000000000000000100000000000000ffffffffffffffff0000000000000000")),"encodeVec([]) = 0400000000000000000000000100000000000000ffffffffffffffff0000000000000000")
    let decodeVec1 = mol.Uint64Vec.decode(encodeVec)
    console.log(`decodeVec1 = ${decodeVec1}`);

    console.log('-------test-----');

    // todo check u128
    let encode128 = mol.Uint128.encode(0);
    console.log(`Uint128(0) = ${hex.encode(encode128)}`);
    console.assert(bytesEq(encode128,hex.decode("00000000000000000000000000000000")),"Uint128(0) =00000000000000000000000000000000");
    let decode128 = mol.Uint128.decode(encode128);
    console.log(`decode128 = ${decode128}`);
    console.assert(decode128 == 0n,"decode128 = 0")
    // // Uint128 max
    // // todo check uint128 max
    let encode340282366920938463463374607431768211455n = mol.Uint128.encode(340282366920938463463374607431768211455n);
    console.log(`Uint128(340282366920938463463374607431768211455n) = ${hex.encode(encode340282366920938463463374607431768211455n)}`);
    console.assert(bytesEq(encode340282366920938463463374607431768211455n,hex.decode("ffffffffffffffffffffffffffffffff")),"Uint128(340282366920938463463374607431768211455n) = ffffffffffffffffffffffffffffffff");
    let decode340282366920938463463374607431768211455n = mol.Uint128.decode(encode340282366920938463463374607431768211455n);
    console.log(`decode340282366920938463463374607431768211455n = ${decode340282366920938463463374607431768211455n}`);
    console.assert(decode340282366920938463463374607431768211455n == 340282366920938463463374607431768211455n,"decode340282366920938463463374607431768211455n = 340282366920938463463374607431768211455n")
    // // 溢出不准
    let encode340282366920938463463374607431768211456n = mol.Uint128.encode(340282366920938463463374607431768211456n);
    console.log(`Uint128(340282366920938463463374607431768211456) = ${hex.encode(encode340282366920938463463374607431768211456n)}`);
    console.assert(bytesEq(encode340282366920938463463374607431768211456n,hex.decode("00000000000000000000000000000000")),"Uint128(340282366920938463463374607431768211456) = 00000000000000000000000000000000");
    //
    // export const Uint128Opt = option(Uint128);
    let encodeUndefined128 = mol.Uint128Opt.encode(undefined);
    console.log(`Uint128Opt(undefined) = ${hex.encode(encodeUndefined128)}`);
    console.assert(bytesEq(encodeUndefined128,new ArrayBuffer(0)),"Uint128Opt(undefined) = ")
    let decodeUndefined128 = mol.Uint128Opt.decode(encodeUndefined128);
    console.log(`decodeUndefined128 = ${decodeUndefined128}`);
    console.assert(decodeUndefined128 == undefined,"decodeUndefined128 = undefined")
    encode128 = mol.Uint128Opt.encode(0);
    console.log(`Uint128Opt(0) = ${hex.encode(encode128)}`);
    console.assert(bytesEq(encode128,hex.decode("00000000000000000000000000000000")),"Uint128Opt(0) = 00000000000000000000000000000000");
    // // Uint128 max
    encode340282366920938463463374607431768211455n = mol.Uint128Opt.encode(340282366920938463463374607431768211455n);
    console.log(`Uint128Opt(340282366920938463463374607431768211455n) = ${hex.encode(encode340282366920938463463374607431768211455n)}`);
    console.assert(bytesEq(encode340282366920938463463374607431768211455n,hex.decode("ffffffffffffffffffffffffffffffff")),"Uint128Opt(340282366920938463463374607431768211455n) = ffffffffffffffffffffffffffffffff");
    let decode340282366920938463463374607431768211455n1 = mol.Uint128Opt.decode(encode340282366920938463463374607431768211455n);
    console.log(`decode340282366920938463463374607431768211455n1 = ${decode340282366920938463463374607431768211455n1}`);

    // // 溢出不准
    encode340282366920938463463374607431768211456n = mol.Uint128Opt.encode(340282366920938463463374607431768211456n);
    console.log(`Uint128(340282366920938463463374607431768211456) = ${hex.encode(encode340282366920938463463374607431768211456n)}`);
    console.assert(bytesEq(encode340282366920938463463374607431768211456n,hex.decode("00000000000000000000000000000000")),"Uint128(340282366920938463463374607431768211456) = 00000000000000000000000000000000");

    // // export const Uint128Vec = vector(Uint128);
    // // empty
    encodeEmptyVec = mol.Uint128Vec.encode([]);
    console.log(`Uint128Vec([]) = ${hex.encode(encodeEmptyVec)}`);
    console.assert(bytesEq(encodeEmptyVec,hex.decode("00000000")),"Uint128Vec([]) = 00000000")
    let decodeEmpty128Vec = mol.Uint128Vec.decode(encodeEmptyVec);
    console.log(`decodeEmpty128Vec = ${JSON.stringify(decodeEmptyVec)}`);
    console.assert(JSON.stringify(decodeEmpty128Vec) == "[]","decodeEmpty128Vec = []")
    // // 1
    encodeVec = mol.Uint128Vec.encode([0,1,340282366920938463463374607431768211455n,340282366920938463463374607431768211456n]);
    console.log(`encodeVec([]) = ${hex.encode(encodeVec)}`);
    console.assert(bytesEq(encodeVec,hex.decode("040000000000000000000000000000000000000001000000000000000000000000000000ffffffffffffffffffffffffffffffff00000000000000000000000000000000")),"encodeVec([]) = 040000000000000000000000000000000000000001000000000000000000000000000000ffffffffffffffffffffffffffffffff00000000000000000000000000000000")
    let decode128Vec = mol.Uint128Vec.decode(encodeVec)
    console.log(`decode128Vec = ${decode128Vec}`);

    //
    // // export const Uint256 = uint(32, true);
    let encode256_2 = mol.Uint256.encode(0);
    console.log(`Uint256(0) = ${hex.encode(encode256_2)}`);
    console.assert(bytesEq(encode256_2,hex.decode("0000000000000000000000000000000000000000000000000000000000000000")),"Uint256(0) = 0000000000000000000000000000000000000000000000000000000000000000")
    let decode256_2 = mol.Uint256.decode(encode256_2);
    console.log(`decode256_2 = ${decode256_2}`);
    console.assert(decode256_2 == 0n,"decode256_2 = 0")
    // // Uint256 max
    // //
    // // export const Uint256Opt = option(Uint256);
    let encodeUndefined256 = mol.Uint256Opt.encode(undefined);
    console.log(`Uint256Opt(undefined) = ${hex.encode(encodeUndefined256)}`);
    console.assert(bytesEq(encodeUndefined256,new ArrayBuffer(0)),"Uint256Opt(undefined) = ")
    let decodeUndefined256 = mol.Uint256Opt.decode(encodeUndefined256);
    console.log(`decodeUndefined256 = ${decodeUndefined256}`);
    console.assert(decodeUndefined256 == undefined,"decodeUndefined256 = undefined")

    encode256_2 = mol.Uint256Opt.encode(0);
    console.log(`Uint256Opt(0) = ${hex.encode(encode256_2)}`);
    console.assert(bytesEq(encode256_2,hex.decode("0000000000000000000000000000000000000000000000000000000000000000")),"Uint256Opt(0) =0000000000000000000000000000000000000000000000000000000000000000")
    // // Uint256 max
    let encode256_115792089237316195423570985008687907853269984665640564039457584007913129639935n = mol.Uint256Opt.encode(115792089237316195423570985008687907853269984665640564039457584007913129639935n);
    console.log(`Uint256Opt(115792089237316195423570985008687907853269984665640564039457584007913129639935n) = ${hex.encode(encode256_115792089237316195423570985008687907853269984665640564039457584007913129639935n)}`);
    console.assert(bytesEq(encode256_115792089237316195423570985008687907853269984665640564039457584007913129639935n,hex.decode("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")),"Uint256(115792089237316195423570985008687907853269984665640564039457584007913129639935n) = fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    encode256_2 = mol.Uint256Opt.encode(115792089237316195423570985008687907853269984665640564039457584007913129639935n);
    console.log(`Uint256Opt(115792089237316195423570985008687907853269984665640564039457584007913129639935n) = ${hex.encode(encode256_2)}`);
    console.assert(bytesEq(encode256_2,hex.decode("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")),"Uint256Opt(115792089237316195423570985008687907853269984665640564039457584007913129639935n) = fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    //
    // // export const Uint256Vec = vector(Uint256);
    // // empty
    encodeEmptyVec = mol.Uint256Vec.encode([]);
    console.log(`Uint256Vec([]) = ${hex.encode(encodeEmptyVec)}`);
    console.assert(bytesEq(encodeEmptyVec,hex.decode("00000000")),"Uint256Vec([]) = 00000000")
    let decode256EmptyVec = mol.Uint256Vec.decode(encodeEmptyVec);
    console.log(`decode256EmptyVec = ${JSON.stringify(decode256EmptyVec)}`);
    console.assert(JSON.stringify(decode256EmptyVec) == "[]","decode256EmptyVec = []")
    // // 1
    encodeVec = mol.Uint256Vec.encode([0n,1n,115792089237316195423570985008687907853269984665640564039457584007913129639935n,115792089237316195423570985008687907853269984665640564039457584007913129639936n]);
    console.log(`encodeVec([]) = ${hex.encode(encodeVec)}`);
    console.assert(bytesEq(encodeVec,hex.decode("0400000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000")),"encodeVec([]) = [0n,1n,256::max,256::max+1n]")
    let decode256Vec = mol.Uint256Vec.decode(encodeVec)
    console.log(`decode256Vec = ${decode256Vec}`);
    // //
    // // export const Uint512 = uint(64, true);
    let encode512 = mol.Uint512.encode(0);
    console.log(`Uint512(0) = ${hex.encode(encode512)}`);
    console.assert(bytesEq(encode512,hex.decode("00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")),"Uint512(0) = 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")
    let decode512 = mol.Uint512.decode(encode512);
    console.log(`decode512 = ${decode512}`);
    console.assert(decode512 == 0n,"decode512 = 0")
    // // Uint512 max
    // // todo check uint512 max
    //
    // // export const Uint512Opt = option(Uint512);
    let encodeUndefined512 = mol.Uint512Opt.encode(undefined);
    console.log(`Uint512Opt(undefined) = ${hex.encode(encodeUndefined512)}`);
    console.assert(bytesEq(encodeUndefined512,new ArrayBuffer(0)),"Uint512Opt(undefined) = ")
    let decodeUndefined512 = mol.Uint512Opt.decode(encodeUndefined512);
    console.log(`decodeUndefined512 = ${decodeUndefined512}`);
    console.assert(decodeUndefined512 == undefined,"decodeUndefined512 = undefined")

    encode512 = mol.Uint512Opt.encode(0);
    console.log(`Uint512(0) = ${hex.encode(encode512)}`);
    console.assert(bytesEq(encode512,hex.decode("00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")))
    // // Uint512 max
    encode512 = mol.Uint512Opt.encode(13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084095n);
    console.log(`Uint512Opt(13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084095n) = ${hex.encode(encode512)}`);
    console.assert(bytesEq(encode512,hex.decode("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")))

    // // export const Uint512Vec = vector(Uint512);
    // // empty
    encodeEmptyVec = mol.Uint512Vec.encode([]);
    console.log(`Uint512Vec([]) = ${hex.encode(encodeEmptyVec)}`);
    console.assert(bytesEq(encodeEmptyVec,hex.decode("00000000")),"Uint512Vec([]) = 00000000")
    let decode512EmptyVec = mol.Uint512Vec.decode(encodeEmptyVec);
    console.log(`decode512EmptyVec = ${JSON.stringify(decodeEmptyVec)}`);
    console.assert(JSON.stringify(decode512EmptyVec) == "[]","decode512EmptyVec = []")
    // // 1
    encodeVec = mol.Uint512Vec.encode([0,1,13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084095n,13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084096n]);
    console.log(`encodeVec([]) = ${hex.encode(encodeVec)}`);
    console.assert(bytesEq(encodeVec,hex.decode("040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")))
    let decode512Vec = mol.Uint512Vec.decode(encodeVec)
    // console.log(`decodeVec = ${JSON.stringify(decodeVec)}`);

    //
    // export const Bytes: Codec<BytesLike, _Bytes> = byteVec({
    //   encode: (value) => value,
    //   decode: (buffer) => buffer,
    // });
    // empty
    let encodeEmptyBytes = mol.Bytes.encode(new Uint8Array([]));
    console.log(`Bytes([]) = ${hex.encode(encodeEmptyBytes)}`);
    console.assert(bytesEq(encodeEmptyBytes,hex.decode("00000000")),"Bytes([]) = 00000000")
    let decodeEmptyBytes = mol.Bytes.decode(encodeEmptyBytes);
    console.log(`decodeEmptyBytes = ${JSON.stringify(decodeEmptyBytes)}`);
    console.assert(bytesEq(decodeEmptyBytes,new ArrayBuffer(0)),"decodeEmptyBytes")
    // 1
    let encodeBytes = mol.Bytes.encode(new Uint8Array([1, 2, 3, 4, 5]));
    console.log(`Bytes([1,2,3,4,5]) = ${hex.encode(encodeBytes)}`);
    console.assert(bytesEq(encodeBytes,hex.decode("050000000102030405")),"Bytes([1,2,3,4,5]) = 050000000102030405")
    let decodeBytes = mol.Bytes.decode(encodeBytes);
    console.log(`decodeBytes = ${JSON.stringify(decodeBytes)}`);
    console.assert(bytesEq(decodeBytes,hex.decode("0102030405")),"decodeBytes = 0102030405")


    // export const BytesOpt = option(Bytes);
    let encodeUndefinedBytes = mol.BytesOpt.encode(undefined);
    console.log(`BytesOpt(undefined) = ${hex.encode(encodeUndefinedBytes)}`);
    console.assert(bytesEq(encodeUndefinedBytes,new ArrayBuffer(0)),"BytesOpt(undefined) = ")
    let decodeUndefinedBytes = mol.BytesOpt.decode(encodeUndefinedBytes);
    console.log(`decodeUndefinedBytes = ${decodeUndefinedBytes}`);
    console.assert(decodeUndefinedBytes == undefined,"decodeUndefinedBytes = undefined")

    encodeBytes = mol.BytesOpt.encode(new Uint8Array([]));
    console.log(`BytesOpt([]) = ${hex.encode(encodeBytes)}`);
    console.assert(bytesEq(encodeBytes,hex.decode("00000000")),"BytesOpt([]) = 00000000")
    // Uint8 max
    encodeBytes = mol.BytesOpt.encode(new Uint8Array([1, 2, 3, 4, 5]));
    console.log(`BytesOpt([1,2,3,4,5]) = ${hex.encode(encodeBytes)}`);
    console.assert(bytesEq(encodeBytes,hex.decode("050000000102030405")),"BytesOpt([1,2,3,4,5]) = 050000000102030405")
    encodeBytes = mol.BytesOpt.encode(new Uint8Array([1, 2, 3, 4, 5, 6]));
    console.log(`BytesOpt([1,2,3,4,5,6]) = ${hex.encode(encodeBytes)}`);
    console.assert(bytesEq(encodeBytes,hex.decode("06000000010203040506")),"BytesOpt([1,2,3,4,5,6]) = 06000000010203040506")
    // export const BytesVec = vector(Bytes);
    // empty
    encodeEmptyVec = mol.BytesVec.encode([]);
    console.log(`BytesVec([]) = ${hex.encode(encodeEmptyVec)}`);
    console.assert(bytesEq(encodeEmptyVec,hex.decode("04000000")),"BytesVec([]) = 04000000")

    let decodeEmptyVecs = mol.BytesVec.decode(encodeEmptyVec);
    console.log(`decodeEmptyVec = ${JSON.stringify(decodeEmptyVecs)}`);
    console.assert(JSON.stringify(decodeEmptyVecs) == "[]","decodeEmptyVec = []")
    // 1
    encodeVec = mol.BytesVec.encode([new Uint8Array([1, 2, 3, 4, 5]), new Uint8Array([6, 7, 8, 9])]);
    console.log(`BytesVec([1,2,3,4,5],[6,7,8,9]) = ${hex.encode(encodeVec)}`);
    console.assert(bytesEq(encodeVec,hex.decode("1d0000000c000000150000000500000001020304050400000006070809")),"BytesVec([1,2,3,4,5],[6,7,8,9]) = 1d0000000c000000150000000500000001020304050400000006070809")
    let decodeVecs = mol.BytesVec.decode(encodeVec);
    console.log(`decodeVec = ${JSON.stringify(decodeVecs)}`);
    console.assert(bytesEq(decodeVecs[0],hex.decode("0102030405")),"decodeVec = 0102030405")
    console.assert(bytesEq(decodeVecs[1],hex.decode("06070809")),"decodeVec = 06070809")
    // export const Bool: Codec<boolean> = Codec.from({
    //   byteLength: 1,
    //   encode: (value) =>
    //     value ? new Uint8Array([1]).buffer : new Uint8Array([0]).buffer,
    //   decode: (buffer) => new Uint8Array(buffer)[0] !== 0,
    // });
    let encodeBool = mol.Bool.encode(true);
    console.log(`Bool(true) = ${hex.encode(encodeBool)}`);
    console.assert(bytesEq(encodeBool,hex.decode("01")),"Bool(true) = 01")
    let decodeBool = mol.Bool.decode(encodeBool);
    console.log(`decodeBool = ${decodeBool}`);
    console.assert(decodeBool == true,"decodeBool = true")
    // Bool false
    encodeBool = mol.Bool.encode(false);
    console.log(`Bool(false) = ${hex.encode(encodeBool)}`);
    console.assert(bytesEq(encodeBool,hex.decode("00")),"Bool(false) = 00")
    decodeBool = mol.Bool.decode(encodeBool);
    console.log(`decodeBool = ${decodeBool}`);
    console.assert(decodeBool == false,"decodeBool = false")

    // export const BoolOpt = option(Bool);
    //
    let encodeBoolOpt = mol.BoolOpt.encode(undefined)
    console.log(`BoolOpt(undefined) = ${hex.encode(encodeBoolOpt)}`);
    console.assert(bytesEq(encodeBoolOpt,new ArrayBuffer(0)),"BoolOpt(undefined) = ")
    let decodeBoolOpt = mol.BoolOpt.decode(encodeBoolOpt);
    console.log(`decodeBoolOpt = ${decodeBoolOpt}`);
    console.assert(decodeBoolOpt == undefined,"decodeBoolOpt = undefined")
    encodeBool = mol.BoolOpt.encode(true);
    console.log(`BoolOpt(true) = ${hex.encode(encodeBool)}`);
    console.assert(bytesEq(encodeBool,hex.decode("01")),"BoolOpt(true) = 01")
    decodeBool = mol.BoolOpt.decode(encodeBool)!;
    console.log(`BoolOpt = ${decodeBool}`);
    console.assert(decodeBool == true,"BoolOpt = true")
    // Bool false
    encodeBool = mol.BoolOpt.encode(false);
    console.log(`BoolOpt(false) = ${hex.encode(encodeBool)}`);
    console.assert(bytesEq(encodeBool,hex.decode("00")),"BoolOpt(false) = 00")
    decodeBool = mol.BoolOpt.decode(encodeBool)!;
    console.log(`BoolOpt = ${decodeBool}`);
    console.assert(decodeBool == false,"BoolOpt = false")
    //
    // export const Byte4: Codec<BytesLike, _Bytes> = Codec.from({
    //   byteLength: 4,
    //   encode: (value) => value,
    //   decode: (buffer) => buffer,
    // });
    let assert = false;
    try {
        let emptyEncodeByte4 = mol.Byte4.encode(new Uint8Array([]));
        console.log(`emptyEncodeByte4:${JSON.stringify(emptyEncodeByte4)}`)
        let emptyDecodeByte4 = mol.Byte4.decode(emptyEncodeByte4)
        console.log(`emptyDecodeByte4:${emptyDecodeByte4}`)

    } catch (e) {
        assert = true
    }
    console.log(`assert:${assert}`)
    console.assert(assert == true, "Byte4 encode/decode error");
    let encodeByte4 = mol.Byte4.encode(new Uint8Array([1, 2, 3, 4]).buffer);
    console.log(`Byte4([1,2,3,4]) = ${hex.encode(encodeByte4)}`);
    console.assert(bytesEq(encodeByte4,hex.decode("01020304")),"Byte4([1,2,3,4]) = 01020304")
    let decodeByte4 = mol.Byte4.decode(encodeByte4);
    console.log(`decodeByte4 = ${JSON.stringify(decodeByte4)}`);
    console.assert(bytesEq(decodeByte4,hex.decode("01020304")),"decodeByte4 = 01020304")


    // export const Byte4Opt = option(Byte4);
    //empty
    let emptyEncodeByte4Opt = mol.Byte4Opt.encode(undefined);
    console.log(`emptyEncodeByte4Opt:${JSON.stringify(emptyEncodeByte4Opt)}`)
    console.assert(bytesEq(emptyEncodeByte4Opt,new ArrayBuffer(0)),"emptyEncodeByte4Opt = ")
    let emptyDecodeByte4Opt = mol.Byte4Opt.decode(emptyEncodeByte4Opt);
    console.log(`emptyDecodeByte4Opt:${emptyDecodeByte4Opt}`)
    console.assert(emptyDecodeByte4Opt == undefined,"emptyDecodeByte4Opt = undefined")
    // 1
    let encodeByte4Opt = mol.Byte4Opt.encode(new Uint8Array([1, 2, 3, 4]).buffer);
    console.log(`Byte4Opt([1,2,3,4]) = ${hex.encode(encodeByte4Opt)}`);
    console.assert(bytesEq(encodeByte4Opt,hex.decode("01020304")),"Byte4Opt([1,2,3,4]) = 01020304")
    let decodeByte4Opt = mol.Byte4Opt.decode(encodeByte4Opt);
    console.log(`decodeByte4Opt = ${JSON.stringify(decodeByte4Opt)}`);
    console.assert(bytesEq(decodeByte4Opt!,hex.decode("01020304")),"decodeByte4Opt = 01020304")

    encodeByte4Opt = mol.Byte4Opt.encode(new Uint8Array([0, 0, 0, 0]).buffer);
    console.log(`Byte4Opt([0,0,0,0]) = ${hex.encode(encodeByte4Opt)}`);
    console.assert(bytesEq(encodeByte4Opt,hex.decode("00000000")),"Byte4Opt([0,0,0,0]) = 00000000")
    decodeByte4Opt = mol.Byte4Opt.decode(encodeByte4Opt);
    console.log(`decodeByte4Opt = ${JSON.stringify(decodeByte4Opt)}`);
    console.assert(bytesEq(decodeByte4Opt!,hex.decode("00000000")),"decodeByte4Opt = 00000000")

    // export const Byte4Vec = vector(Byte4);
    // empty
    let emptyEncodeByte4Vec = mol.Byte4Vec.encode([]);
    console.log(`Byte4Vec([]) = ${hex.encode(emptyEncodeByte4Vec)}`);
    console.assert(bytesEq(emptyEncodeByte4Vec,hex.decode("00000000")),"Byte4Vec([]) = 00000000")
    let emptyDecodeByte4Vec = mol.Byte4Vec.decode(emptyEncodeByte4Vec);
    console.log(`emptyDecodeByte4Vec = ${JSON.stringify(emptyDecodeByte4Vec)}`);
    console.assert(JSON.stringify(emptyDecodeByte4Vec) == "[]","emptyDecodeByte4Vec = []")
    // 1
    let encodeByte4Vec = mol.Byte4Vec.encode([new Uint8Array([1, 2, 3, 4]).buffer, new Uint8Array([5, 6, 7, 8]).buffer]);
    console.log(`Byte4Vec([1,2,3,4],[5,6,7,8]) = ${hex.encode(encodeByte4Vec)}`);
    console.assert(bytesEq(encodeByte4Vec,hex.decode("020000000102030405060708")),"Byte4Vec([1,2,3,4],[5,6,7,8]) = 020000000102030405060708")
    let decodeByte4Vec = mol.Byte4Vec.decode(encodeByte4Vec);
    console.log(`decodeByte4Vec = ${JSON.stringify(decodeByte4Vec)}`);
    console.assert(bytesEq(decodeByte4Vec[0],hex.decode("01020304")),"decodeByte4Vec = 01020304")
    console.assert(bytesEq(decodeByte4Vec[1],hex.decode("05060708")),"decodeByte4Vec = 05060708")

    //
    // export const Byte8: Codec<BytesLike, _Bytes> = Codec.from({
    //   byteLength: 8,
    //   encode: (value) => value,
    //   decode: (buffer) => buffer,
    // });
    // export const Byte8: Codec<BytesLike, _Bytes> = Codec.from({
//   byteLength: 8,
//   encode: (value) => value,
//   decode: (buffer) => buffer,
// });

// empty
    let emptyEncodeByte8 = mol.Byte8.encode(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]).buffer);
    console.log(`Byte8([0,0,0,0,0,0,0,0]) = ${hex.encode(emptyEncodeByte8)}`);
    console.assert(bytesEq(emptyEncodeByte8,hex.decode("0000000000000000")),"Byte8([0,0,0,0,0,0,0,0]) = 0000000000000000")
    let emptyDecodeByte8 = mol.Byte8.decode(emptyEncodeByte8);
    console.log(`emptyDecodeByte8 = ${JSON.stringify(emptyDecodeByte8)}`);
    console.assert(bytesEq(emptyDecodeByte8,hex.decode("0000000000000000")),"emptyDecodeByte8 = 0000000000000000")

// 1
    let encodeByte8 = mol.Byte8.encode(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).buffer);
    console.log(`Byte8([1,2,3,4,5,6,7,8]) = ${hex.encode(encodeByte8)}`);
    console.assert(bytesEq(encodeByte8,hex.decode("0102030405060708")),"Byte8([1,2,3,4,5,6,7,8]) = 0102030405060708")
    let decodeByte8 = mol.Byte8.decode(encodeByte8);
    console.log(`decodeByte8 = ${JSON.stringify(decodeByte8)}`);
    console.assert(bytesEq(decodeByte8,hex.decode("0102030405060708")),"decodeByte8 = 0102030405060708")

// export const Byte8Opt = option(Byte8);
// empty
    let emptyEncodeByte8Opt = mol.Byte8Opt.encode(undefined);
    console.log(`Byte8Opt(undefined) = ${hex.encode(emptyEncodeByte8Opt)}`);
    console.assert(bytesEq(emptyEncodeByte8Opt,new ArrayBuffer(0)),"Byte8Opt(undefined) = ")
    let emptyDecodeByte8Opt = mol.Byte8Opt.decode(emptyEncodeByte8Opt);
    console.log(`emptyDecodeByte8Opt = ${emptyDecodeByte8Opt}`);
    console.assert(emptyDecodeByte8Opt == undefined,"emptyDecodeByte8Opt = undefined")

// 1
    let encodeByte8Opt = mol.Byte8Opt.encode(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).buffer);
    console.log(`Byte8Opt([1,2,3,4,5,6,7,8]) = ${hex.encode(encodeByte8Opt)}`);
    console.assert(bytesEq(encodeByte8Opt,hex.decode("0102030405060708")),"Byte8Opt([1,2,3,4,5,6,7,8]) = 0102030405060708")
    let decodeByte8Opt = mol.Byte8Opt.decode(encodeByte8Opt);
    console.log(`decodeByte8Opt = ${JSON.stringify(decodeByte8Opt)}`);
    console.assert(bytesEq(decodeByte8Opt!,hex.decode("0102030405060708")),"decodeByte8Opt = 0102030405060708")

// export const Byte8Vec = vector(Byte8);
// empty
    let emptyEncodeByte8Vec = mol.Byte8Vec.encode([]);
    console.log(`Byte8Vec([]) = ${hex.encode(emptyEncodeByte8Vec)}`);
    console.assert(bytesEq(emptyEncodeByte8Vec,hex.decode("00000000")),"Byte8Vec([]) = 00000000")
    let emptyDecodeByte8Vec = mol.Byte8Vec.decode(emptyEncodeByte8Vec);
    console.log(`emptyDecodeByte8Vec = ${JSON.stringify(emptyDecodeByte8Vec)}`);
    console.assert(JSON.stringify(emptyDecodeByte8Vec) == "[]","emptyDecodeByte8Vec = []")

// 1
    let encodeByte8Vec = mol.Byte8Vec.encode([
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).buffer,
        new Uint8Array([9, 10, 11, 12, 13, 14, 15, 16]).buffer,
    ]);
    console.log(`Byte8Vec([1,2,3,4,5,6,7,8],[9,10,11,12,13,14,15,16]) = ${hex.encode(encodeByte8Vec)}`);
    console.assert(bytesEq(encodeByte8Vec,hex.decode("020000000102030405060708090a0b0c0d0e0f10")),"Byte8Vec([1,2,3,4,5,6,7,8],[9,10,11,12,13,14,15,16]) = 020000000102030405060708090a0b0c0d0e0f10")

    let decodeByte8Vec = mol.Byte8Vec.decode(encodeByte8Vec);
    console.log(`decodeByte8Vec = ${JSON.stringify(decodeByte8Vec)}`);
    console.assert(bytesEq(decodeByte8Vec[0],hex.decode("0102030405060708")),"decodeByte8Vec = 0102030405060708")
    console.assert(bytesEq(decodeByte8Vec[1],hex.decode("090a0b0c0d0e0f10")),"decodeByte8Vec = 090a0b0c0d0e0f10")


    // export const Byte16: Codec<BytesLike, _Bytes> = Codec.from({
    //   byteLength: 16,
    //   encode: (value) => value,
    //   decode: (buffer) => buffer,
    // });

    // empty
    let emptyEncodeByte16 = mol.Byte16.encode(new Uint8Array(16).buffer);
    console.log(`Byte16([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]) = ${hex.encode(emptyEncodeByte16)}`);
    console.assert(bytesEq(emptyEncodeByte16,hex.decode("00000000000000000000000000000000")))
    let emptyDecodeByte16 = mol.Byte16.decode(emptyEncodeByte16);
    console.log(`emptyDecodeByte16 = ${JSON.stringify(emptyDecodeByte16)}`);
    console.assert(bytesEq(emptyDecodeByte16,hex.decode("00000000000000000000000000000000")))

// 1
    let encodeByte16 = mol.Byte16.encode(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer);
    console.log(`Byte16([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]) = ${hex.encode(encodeByte16)}`);
    console.assert(bytesEq(encodeByte16,hex.decode("0102030405060708090a0b0c0d0e0f10")),"Byte16([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]) = 0102030405060708090a0b0c0d0e0f10")
    let decodeByte16 = mol.Byte16.decode(encodeByte16);
    console.log(`decodeByte16 = ${JSON.stringify(decodeByte16)}`);
    console.assert(bytesEq(decodeByte16,hex.decode("0102030405060708090a0b0c0d0e0f10")),"decodeByte16 = 0102030405060708090a0b0c0d0e0f10")

// export const Byte16Opt = option(Byte16);
// empty
    let emptyEncodeByte16Opt = mol.Byte16Opt.encode(undefined);
    console.log(`Byte16Opt(undefined) = ${hex.encode(emptyEncodeByte16Opt)}`);
    console.assert(bytesEq(emptyEncodeByte16Opt,new ArrayBuffer(0)),"Byte16Opt(undefined) = ")
    let emptyDecodeByte16Opt = mol.Byte16Opt.decode(emptyEncodeByte16Opt);
    console.log(`emptyDecodeByte16Opt = ${emptyDecodeByte16Opt}`);
    console.assert(emptyDecodeByte16Opt == undefined,"emptyDecodeByte16Opt = undefined")

// 1
    let encodeByte16Opt = mol.Byte16Opt.encode(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer);
    console.log(`Byte16Opt([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]) = ${hex.encode(encodeByte16Opt)}`);
    console.assert(bytesEq(encodeByte16Opt,hex.decode("0102030405060708090a0b0c0d0e0f10")),"Byte16Opt([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]) = 0102030405060708090a0b0c0d0e0f10")

    let decodeByte16Opt = mol.Byte16Opt.decode(encodeByte16Opt);
    console.log(`decodeByte16Opt = ${JSON.stringify(decodeByte16Opt)}`);
    console.assert(bytesEq(decodeByte16Opt!,hex.decode("0102030405060708090a0b0c0d0e0f10")),"decodeByte16Opt = 0102030405060708090a0b0c0d0e0f10")

// export const Byte16Vec = vector(Byte16);
// empty
    let emptyEncodeByte16Vec = mol.Byte16Vec.encode([]);
    console.log(`Byte16Vec([]) = ${hex.encode(emptyEncodeByte16Vec)}`);
    console.assert(bytesEq(emptyEncodeByte16Vec,hex.decode("00000000")),"Byte16Vec([]) = 00000000")

    let emptyDecodeByte16Vec = mol.Byte16Vec.decode(emptyEncodeByte16Vec);
    console.log(`emptyDecodeByte16Vec = ${JSON.stringify(emptyDecodeByte16Vec)}`);
    console.assert(JSON.stringify(emptyDecodeByte16Vec) == "[]","emptyDecodeByte16Vec = []")

// 1
    let encodeByte16Vec = mol.Byte16Vec.encode([
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).buffer,
        new Uint8Array([17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]).buffer,
    ]);
    console.log(`Byte16Vec([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],[17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]) = ${hex.encode(encodeByte16Vec)}`);
    console.assert(bytesEq(encodeByte16Vec,hex.decode("020000000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20")),"Byte16Vec([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],[17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]) = 020000000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20")

    let decodeByte16Vec = mol.Byte16Vec.decode(encodeByte16Vec);
    console.log(`decodeByte16Vec = ${JSON.stringify(decodeByte16Vec)}`);
    console.assert(bytesEq(decodeByte16Vec[0],hex.decode("0102030405060708090a0b0c0d0e0f10")),"decodeByte16Vec = 0102030405060708090a0b0c0d0e0f10")
    //
    // export const Byte32: Codec<BytesLike, _Bytes> = Codec.from({
    //   byteLength: 32,
    //   encode: (value) => value,
    //   decode: (buffer) => buffer,
    // });

// empty
    let emptyEncodeByte32 = mol.Byte32.encode(new Uint8Array(32).buffer);
    console.log(`Byte32([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]) = ${hex.encode(emptyEncodeByte32)}`);
    console.assert(bytesEq(emptyEncodeByte32,hex.decode("0000000000000000000000000000000000000000000000000000000000000000")));
    let emptyDecodeByte32 = mol.Byte32.decode(emptyEncodeByte32);
    console.log(`emptyDecodeByte32 = ${JSON.stringify(emptyDecodeByte32)}`);
    console.assert(bytesEq(emptyDecodeByte32,hex.decode("0000000000000000000000000000000000000000000000000000000000000000")));

// 1
    let encodeByte32 = mol.Byte32.encode(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]).buffer);
    console.log(`Byte32([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]) = ${hex.encode(encodeByte32)}`);
    console.assert(bytesEq(encodeByte32,hex.decode("0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20")),"Byte32([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]) = 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20")
    let decodeByte32 = mol.Byte32.decode(encodeByte32);
    console.log(`decodeByte32 = ${JSON.stringify(decodeByte32)}`);
    console.assert(bytesEq(decodeByte32,hex.decode("0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20")),"decodeByte32 = 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20")
// export const Byte32Opt = option(Byte32);
// empty
    let emptyEncodeByte32Opt = mol.Byte32Opt.encode(undefined);
    console.log(`Byte32Opt(undefined) = ${hex.encode(emptyEncodeByte32Opt)}`);
    console.assert(bytesEq(emptyEncodeByte32Opt,new ArrayBuffer(0)),"Byte32Opt(undefined) = ")
    let emptyDecodeByte32Opt = mol.Byte32Opt.decode(emptyEncodeByte32Opt);
    console.log(`emptyDecodeByte32Opt = ${emptyDecodeByte32Opt}`);
    console.assert(emptyDecodeByte32Opt == undefined,"emptyDecodeByte32Opt = undefined")

// 1
    let encodeByte32Opt = mol.Byte32Opt.encode(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]).buffer);
    console.log(`Byte32Opt([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]) = ${hex.encode(encodeByte32Opt)}`);
    console.assert(bytesEq(encodeByte32Opt,hex.decode("0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20")),"Byte32Opt([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]) = 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20")
    let decodeByte32Opt = mol.Byte32Opt.decode(encodeByte32Opt);
    console.log(`decodeByte32Opt = ${JSON.stringify(decodeByte32Opt)}`);
    console.assert(bytesEq(decodeByte32Opt!,hex.decode("0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20")),"decodeByte32Opt = 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20");

// export const Byte32Vec = vector(Byte32);
// empty
    let emptyEncodeByte32Vec = mol.Byte32Vec.encode([]);
    console.log(`Byte32Vec([]) = ${hex.encode(emptyEncodeByte32Vec)}`);
    console.assert(bytesEq(emptyEncodeByte32Vec,hex.decode("00000000")),"Byte32Vec([]) = 00000000")
    let emptyDecodeByte32Vec = mol.Byte32Vec.decode(emptyEncodeByte32Vec);
    console.log(`emptyDecodeByte32Vec = ${JSON.stringify(emptyDecodeByte32Vec)}`);
    console.assert(JSON.stringify(emptyDecodeByte32Vec) == "[]","emptyDecodeByte32Vec = []")

// 1
    let encodeByte32Vec = mol.Byte32Vec.encode([
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]).buffer,
        new Uint8Array([33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64]).buffer,
    ]);
    console.log(`Byte32Vec([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],[33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64]) = ${hex.encode(encodeByte32Vec)}`);
    console.assert(bytesEq(encodeByte32Vec,hex.decode("020000000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f40")),"Byte32Vec([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],[17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]) = 020000000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f40")

    let decodeByte32Vec = mol.Byte32Vec.decode(encodeByte32Vec);
    console.log(`decodeByte32Vec = ${JSON.stringify(decodeByte32Vec)}`);
    console.assert(bytesEq(decodeByte32Vec[0],hex.decode("0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20")),"decodeByte32Vec = 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20")
    console.assert(bytesEq(decodeByte32Vec[1],hex.decode("2122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f40")),"decodeByte32Vec = 2122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f40")
    //
    // export const String = byteVec({
    //   encode: (value: string) => {
    //     return new TextEncoder().encode(value);
    //   },
    //   decode: (buffer) => new TextDecoder().decode(buffer),
    // });
    // 空字符串
    let emptyStr = mol.String.encode("");
    console.log(`String("") = ${hex.encode(emptyStr)}`);
    console.assert(bytesEq(emptyStr,hex.decode("00000000")),'"String("") = 00"')
    let decodeEmptyStr = mol.String.decode(emptyStr);
    console.log(`decodeEmptyStr = ${JSON.stringify(decodeEmptyStr)}`);
    console.assert(decodeEmptyStr == "","decodeEmptyStr = ")
    // 1
    let str = mol.String.encode("hello world");
    console.log(`String("hello world") = ${hex.encode(str)}`);
    console.assert(bytesEq(str,hex.decode("0b00000068656c6c6f20776f726c64")),'"String("hello world") = 0b00000068656c6c6f20776f726c64"')
    let decodeStr = mol.String.decode(str);
    console.log(`decodeStr = ${JSON.stringify(decodeStr)}`);
    console.assert(decodeStr == "hello world","decodeStr = hello world")
    // export const StringOpt = option(String);
    let encodeUndefinedStr = mol.StringOpt.encode(undefined);
    console.log(`StringOpt(undefined) = ${hex.encode(encodeUndefinedStr)}`);
    console.assert(bytesEq(encodeUndefinedStr,new ArrayBuffer(0)),"StringOpt(undefined) = ")
    let decodeUndefinedStr = mol.StringOpt.decode(encodeUndefinedStr);
    console.log(`decodeUndefinedStr = ${JSON.stringify(decodeUndefinedStr)}`);
    console.assert(decodeUndefinedStr == undefined,"decodeUndefinedStr = undefined")

    let encodeStr = mol.StringOpt.encode("");
    console.log(`StringOpt("") = ${hex.encode(encodeStr)}`);
    console.assert(bytesEq(encodeStr,hex.decode("00000000")),'"StringOpt("") = 00000000"')
    encodeStr = mol.StringOpt.encode("hello world");
    console.log(`StringOpt("hello world") = ${hex.encode(encodeStr)}`);
    console.assert(bytesEq(encodeStr,hex.decode("0b00000068656c6c6f20776f726c64")),'"StringOpt("hello world") = 0b00000068656c6c6f20776f726c64"')
    let decodeStr1 = mol.StringOpt.decode(encodeStr);
    console.log(`decodeStr = ${JSON.stringify(decodeStr1)}`);
    console.assert(decodeStr1 == "hello world","decodeStr = hello world");

    // export const StringVec = vector(String);
    // export const StringOpt = option(String);
    return 0;
}

bindings.exit(main());
