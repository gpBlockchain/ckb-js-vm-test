import * as bindings from "@ckb-js-std/bindings";
import {
    Script,
    HighLevel,
    log,
    bytesConcat,
    bytesEq,
    HasherCkb,
    hashCkb,
    hashTypeId,
    numFromBytes, numToBytes
} from "@ckb-js-std/core";
import {hex, Keccak256, SOURCE_GROUP_INPUT, SOURCE_OUTPUT, TextEncoder} from "@ckb-js-std/bindings";


function main() {
    log.setLevel(log.LogLevel.Debug);
    // numFromBytes
    HighLevel.loadScript();

    // numToBytes
    [

        {"input": 1n, "bytesLength": 1, "expected": "01"},
        {"input": 2n, "bytesLength": 1, "expected": "02"},
        {"input": 4n, "bytesLength": 1, "expected": "04"},
        {"input": 8n, "bytesLength": 1, "expected": "08"},
        {"input": 16n, "bytesLength": 1, "expected": "10"},
        {"input": 32n, "bytesLength": 1, "expected": "20"},
        {"input": 64n, "bytesLength": 1, "expected": "40"},
        {"input": 128n, "bytesLength": 1, "expected": "80"},
        {"input": 256n, "bytesLength": 2, "expected": "0001"},
        {"input": 512n, "bytesLength": 2, "expected": "0002"},
        {"input": 1024n, "bytesLength": 2, "expected": "0004"},
        {"input": 2048n, "bytesLength": 2, "expected": "0008"},
        {"input": 4096n, "bytesLength": 2, "expected": "0010"},
        {"input": 8192n, "bytesLength": 2, "expected": "0020"},
        {"input": 16384n, "bytesLength": 2, "expected": "0040"},
        {"input": 32768n, "bytesLength": 2, "expected": "0080"},
        {"input": 65536n, "bytesLength": 4, "expected": "00000100"},
        {"input": 131072n, "bytesLength": 4, "expected": "00000200"},
        {"input": 262144n, "bytesLength": 4, "expected": "00000400"},
        {"input": 524288n, "bytesLength": 4, "expected": "00000800"},
        {"input": 1048576n, "bytesLength": 4, "expected": "00001000"},
        {"input": 2097152n, "bytesLength": 4, "expected": "00002000"},
        {"input": 4194304n, "bytesLength": 4, "expected": "00004000"},
        {"input": 8388608n, "bytesLength": 4, "expected": "00008000"},
        {"input": 16777216n, "bytesLength": 4, "expected": "00000001"},
        {"input": 33554432n, "bytesLength": 4, "expected": "00000002"},
        {"input": 67108864n, "bytesLength": 4, "expected": "00000004"},
        {"input": 134217728n, "bytesLength": 4, "expected": "00000008"},
        {"input": 268435456n, "bytesLength": 4, "expected": "00000010"},
        {"input": 536870912n, "bytesLength": 4, "expected": "00000020"},
        {"input": 1073741824n, "bytesLength": 4, "expected": "00000040"},
        {"input": 2147483648n, "bytesLength": 4, "expected": "00000080"},
        {"input": 4294967296n, "bytesLength": 8, "expected": "0000000001000000"},
        {"input": 8589934592n, "bytesLength": 8, "expected":  "0000000002000000"},
        {"input": 17179869184n, "bytesLength": 8, "expected": "0000000004000000"},
        {"input": 34359738368n, "bytesLength": 8, "expected": "0000000008000000"},
        {"input": 68719476736n, "bytesLength": 8, "expected":  "0000000010000000"},
        {"input": 137438953472n, "bytesLength": 8, "expected": "0000000020000000"},
        {"input": 274877906944n, "bytesLength": 8, "expected": "0000000040000000"},
        {"input": 549755813888n, "bytesLength": 8, "expected": "0000000080000000"},
        {"input": 1099511627776n, "bytesLength": 8, "expected": "0000000000010000"},
        {"input": 2199023255552n, "bytesLength": 8, "expected": "0000000000020000"},
        {"input": 4398046511104n, "bytesLength": 8, "expected": "0000000000040000"},
        {"input": 8796093022208n, "bytesLength": 8, "expected":  "0000000000080000"},
        {"input": 17592186044416n, "bytesLength": 8, "expected": "0000000000100000"},
        {"input": 35184372088832n, "bytesLength": 8, "expected": "0000000000200000"},
        {"input": 70368744177664n, "bytesLength": 8, "expected": "0000000000400000"},
        {"input": 140737488355328n, "bytesLength": 8, "expected": "0000000000800000"},
        {"input": 281474976710656n, "bytesLength": 8, "expected": "0000000000000100"},
        {"input": 562949953421312n, "bytesLength": 8, "expected": "0000000000000200"},
        {"input": 1125899906842624n, "bytesLength": 8, "expected": "0000000000000400"},
        {"input": 2251799813685248n, "bytesLength": 8, "expected": "0000000000000800"},
        {"input": 4503599627370496n, "bytesLength": 8, "expected": "0000000000001000"},
        {"input": 9007199254740992n, "bytesLength": 8, "expected": "0000000000002000"},
        {"input": 18014398509481984n, "bytesLength": 8, "expected": "0000000000004000"},
        {"input": 36028797018963968n, "bytesLength": 8, "expected": "0000000000008000"},
        {"input": 72057594037927936n, "bytesLength": 8, "expected": "0000000000000001"},
        {"input": 144115188075855872n, "bytesLength": 8, "expected": "0000000000000002"},
        {"input": 288230376151711744n, "bytesLength": 8, "expected": "0000000000000004"},
        {"input": 576460752303423488n, "bytesLength": 8, "expected": "0000000000000008"},
        {"input": 1152921504606846976n, "bytesLength": 8, "expected": "0000000000000010"},
        {"input": 2305843009213693952n, "bytesLength": 8, "expected": "0000000000000020"},
        {"input": 4611686018427387904n, "bytesLength": 8, "expected": "0000000000000040"},
        {"input": 9223372036854775808n, "bytesLength": 8, "expected": "0000000000000080"},
        {"input": 18446744073709551616n, "bytesLength": 16, "expected":  "00000000000000000100000000000000"},
        {"input": 36893488147419103232n, "bytesLength": 16, "expected":  "00000000000000000200000000000000"},
        {"input": 73786976294838206464n, "bytesLength": 16, "expected":  "00000000000000000400000000000000"},
        {"input": 147573952589676412928n, "bytesLength": 16, "expected": "00000000000000000800000000000000"},
        {"input": 295147905179352825856n, "bytesLength": 16, "expected": "00000000000000001000000000000000"},
        {"input": 590295810358705651712n, "bytesLength": 16, "expected": "00000000000000002000000000000000"},
        {"input": 1180591620717411303424n, "bytesLength": 16, "expected":"00000000000000004000000000000000"},
        {"input": 2361183241434822606848n, "bytesLength": 16, "expected":"00000000000000008000000000000000"},
        {"input": 4722366482869645213696n, "bytesLength": 16, "expected":"00000000000000000001000000000000"},
        {"input": 9444732965739290427392n, "bytesLength": 16, "expected":"00000000000000000002000000000000"},
        {"input": 18889465931478580854784n, "bytesLength": 16, "expected": "00000000000000000004000000000000"},
        {"input": 37778931862957161709568n, "bytesLength": 16, "expected": "00000000000000000008000000000000"},
        {"input": 75557863725914323419136n, "bytesLength": 16, "expected": "00000000000000000010000000000000"},
        {"input": 151115727451828646838272n, "bytesLength": 16, "expected":"00000000000000000020000000000000"},
        {"input": 302231454903657293676544n, "bytesLength": 16, "expected":"00000000000000000040000000000000"},
        {"input": 604462909807314587353088n, "bytesLength": 16, "expected":"00000000000000000080000000000000"},
        {"input": 340282366920938463463374607431768211456n, "bytesLength": 32, "expected":  "0000000000000000000000000000000001000000000000000000000000000000"},
        {"input": 680564733841876926926749214863536422912n, "bytesLength": 32, "expected":  "0000000000000000000000000000000002000000000000000000000000000000"},
        {"input": 1361129467683753853853498429727072845824n, "bytesLength": 32, "expected": "0000000000000000000000000000000004000000000000000000000000000000"},
        {"input": 2722258935367507707706996859454145691648n, "bytesLength": 32, "expected": "0000000000000000000000000000000008000000000000000000000000000000"},
        {"input": 5444517870735015415413993718908291383296n, "bytesLength": 32, "expected": "0000000000000000000000000000000010000000000000000000000000000000"},
        {"input": 10889035741470030830827987437816582766592n, "bytesLength": 32, "expected": "0000000000000000000000000000000020000000000000000000000000000000"},
        {"input": 21778071482940061661655974875633165533184n, "bytesLength": 32, "expected": "0000000000000000000000000000000040000000000000000000000000000000"},
        {"input": 43556142965880123323311949751266331066368n, "bytesLength": 32, "expected": "0000000000000000000000000000000080000000000000000000000000000000"},
        {"input":13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084095n,
        "bytesLength":64,"expected":"ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        }
    ].forEach((test_case) => {
        console.log(`input: ${test_case.input}, bytesLength: ${test_case.bytesLength}, expected: ${test_case.expected}`);
        let ret1 = numToBytes(test_case.input, test_case.bytesLength);
        console.log(`numToBytes:${JSON.stringify(ret1)}`);
        let num = numFromBytes(ret1)
        console.log(`numFromBytes: ${num}`);
        console.assert(bytesEq(ret1, hex.decode(test_case.expected)), `numToBytes(${test_case.input}) != ${test_case.expected}`);
        console.assert(num=== test_case.input, `numFromBytes(${test_case.expected}) != ${test_case.input}`);
    });
    return 0;
}

bindings.exit(main());
