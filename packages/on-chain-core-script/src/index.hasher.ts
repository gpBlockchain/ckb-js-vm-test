import * as bindings from "@ckb-js-std/bindings";
import {Script, HighLevel, log, bytesConcat, bytesEq, HasherCkb, hashCkb, hashTypeId} from "@ckb-js-std/core";
import {hex, Keccak256, SOURCE_OUTPUT, TextEncoder} from "@ckb-js-std/bindings";


function main() {
    log.setLevel(log.LogLevel.Debug);
    // hashCkb
    HighLevel.loadScript();
    [
        {
            input: hex.decode("30303030"),
            hash: hex.decode("2becfd4dbbc019779dae030279209614a9f9ef3f7ab69e898d877751b6d68a6f"),
            keccak256Hash: hex.decode("e8d1f6cb90fef5fc9696cc77858b42d4e99b0959246d86f4584b49f5af0fe3f9")
        },
    ].forEach((test_case) => {
        let codeHash = hashCkb(test_case.input)
        console.log(`codeHash:${codeHash}`)
        // console.assert(bytesEq(codeHash, test_case.hash), "hash eq")
        let keccak256 = new Keccak256();
        keccak256.update(test_case.input);
        let keccak256Hash = keccak256.finalize();
        console.log(`keccak256Hash:${JSON.stringify(keccak256Hash)}`);
        console.assert(bytesEq(keccak256Hash, test_case.keccak256Hash), "keccak256 hash eq")
    })

    // hashTypeId  simple udt : https://explorer.nervos.org/transaction/0xc7813f6a415144643970c2e88e0bb6ca6a8edc5dd7c1022746f628284a9936d5
    let codeHash = hashTypeId({
        previousOutput: {
            txHash: hex.decode("635c0159484f639b78da1d042e1785a1486b51dba116bc3d47a7624f0df609c0"),
            index: 0
        }
    }, 0)
    console.log(`type id:${JSON.stringify(codeHash)}`)
    console.assert(bytesEq(codeHash, hex.decode("cf37df53ec0eb890937879ad5587521f737dc3d95eb1c22194b958ecbcf39a8b")), "hashTypeId eq")
    return 0;
}

bindings.exit(main());
