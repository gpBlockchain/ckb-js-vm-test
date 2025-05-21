import * as bindings from "@ckb-js-std/bindings";
import {Script, HighLevel, log, bytesConcat, bytesEq} from "@ckb-js-std/core";
import {SOURCE_OUTPUT} from "@ckb-js-std/bindings";


function main() {
    log.setLevel(log.LogLevel.Debug);
    let script = bindings.loadScript();
    let data = HighLevel.loadCellData(0,SOURCE_OUTPUT);

    // 连接随机3个bytes
    let newData = bytesConcat(new ArrayBuffer(4),data,new ArrayBuffer(4))
    log.debug(`data:${JSON.stringify(data)}`);
    log.debug(`newData:${JSON.stringify(newData)}`);
    console.assert(JSON.stringify(newData)== '"0x000000000100000000000000000000000000000000000000"', "should be equal");
    let testDatas = bindings.hex.decode("000000000100000000000000000000000000000000000000")
    console.assert(bytesEq(newData,testDatas), "should be equal");


    // bytesEq
    // a,b 一致
    console.assert(bytesEq(newData,newData), "should be equal");

    // a,b 为 empty
    console.assert(bytesEq(new ArrayBuffer(),new ArrayBuffer()), "should be equal");

    // a,b 长度不一致

    console.assert(!bytesEq(newData,new ArrayBuffer()), "a,b 长度不一致,should be not equal");

    // a,b 长度一致,长度为8的倍数
    console.assert(bytesEq(bindings.hex.decode("ffffffffffffffffffffffffffffffff"),
        bindings.hex.decode("ffffffffffffffffffffffffffffffff")), "a,b 长度一致,长度为8的倍数,should be equal");

    console.assert(!bytesEq(bindings.hex.decode("fffffffffffffffffffff1ffffffffff"),
        bindings.hex.decode("ffffffffffffffffffffffffffffffff")), "a,b 长度一致,长度为8的倍数,但数据不一致,should be equal");


    // a,b 长度一致,长度不为8的倍数
    console.assert(bytesEq(bindings.hex.decode("0fffffffffffffffffffffffffffffffff"),
        bindings.hex.decode("0fffffffffffffffffffffffffffffffff")), "a,b 长度一致,长度不为8的倍数,should be equal");

    console.assert(!bytesEq(bindings.hex.decode("0fffffffffffffffffffffffffffffffff"),
        bindings.hex.decode("1fffffffffffffffffffffffffffffffff")), "a,b 长度一致,长度不为8的倍数,should be equal");

    // a,b 特别长
    console.assert(bytesEq(new ArrayBuffer(128*1024),new ArrayBuffer(128*1024)), "a,b 长度很长,should be equal");
    return 0;
}

bindings.exit(main());
