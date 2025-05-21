import {hexFrom, Transaction, hashTypeToBytes, epochFrom, epochToHex} from "@ckb-ccc/core";
import {readFileSync} from "fs";
import {
    Resource,
    Verifier,
    DEFAULT_SCRIPT_ALWAYS_SUCCESS,
    DEFAULT_SCRIPT_CKB_JS_VM,
    createHeaderViewTemplate
} from "ckb-testtool";


const CKB_JS_VM_PATH = DEFAULT_SCRIPT_CKB_JS_VM

async function main() {
    const resource = Resource.default();
    const tx = Transaction.default();

    const mainScript = resource.deployCell(
        hexFrom(readFileSync(CKB_JS_VM_PATH)),
        tx,
        false,
    );
    const alwaysSuccessScript = resource.deployCell(
        hexFrom(readFileSync(DEFAULT_SCRIPT_ALWAYS_SUCCESS)),
        tx,
        false,
    );
    const jsScript = resource.deployCell(
        hexFrom(readFileSync("../on-chain-script/dist/index.bc")),
        tx,
        false,
    );
    mainScript.args = hexFrom(
        "0x0000" +
        jsScript.codeHash.slice(2) +
        hexFrom(hashTypeToBytes(jsScript.hashType)).slice(2) +
        "0000000000000000000000000000000000000000000000000000000000000000",
    );
    // 1 input cell
    const inputCell = resource.mockCell(
        alwaysSuccessScript,
        mainScript,
        "0xFF000000000000000000000000000000",
    );
    tx.inputs.push(Resource.createCellInput(inputCell));

    // 2 output cells
    tx.outputs.push(Resource.createCellOutput(alwaysSuccessScript, mainScript));
    tx.outputsData.push(hexFrom("0xFE000000000000000000000000000000"));
    tx.outputs.push(Resource.createCellOutput(alwaysSuccessScript, mainScript));
    tx.outputsData.push(hexFrom("0x01000000000000000000000000000000"));

    const headerHashByHeaderDep = resource.mockHeader(
        createHeaderViewTemplate(),
        "0x00",
        [],
    );
    tx.headerDeps.push(headerHashByHeaderDep);
    const headerHashByInput = resource.mockHeader(
        createHeaderViewTemplate(),
        "0x0000",
        [inputCell],
    );
    tx.headerDeps.push(headerHashByInput);

    const verifier = Verifier.from(resource, tx);
    verifier.verifySuccess(true);
}

describe("unit test", () => {
    test("on-chain-script",async () => {
        await main();
    });
});
