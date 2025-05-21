
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



function run_js_code(path: string): Verifier {
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
        hexFrom(readFileSync(path)),
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
    const inputCell1 = resource.mockCell(
        alwaysSuccessScript,
        undefined,
        "0xFF000000000000000000000000000001", 1n
    );
    tx.inputs.push(Resource.createCellInput(inputCell1));

    const inputCell = resource.mockCell(
        alwaysSuccessScript,
        mainScript,
        "0xFF000000000000000000000000000002", 2n
    );
    tx.inputs.push(Resource.createCellInput(inputCell));

    // 2 output cells
    tx.outputs.push(Resource.createCellOutput(alwaysSuccessScript, undefined, 11n));
    tx.outputsData.push(hexFrom("0x01000000000000000000000000000000"));
    tx.outputs.push(Resource.createCellOutput(alwaysSuccessScript, mainScript, 22n));
    tx.outputsData.push(hexFrom("0x02000000000000000000000000000000"));
    tx.outputs.push(Resource.createCellOutput(alwaysSuccessScript, mainScript, 33n));
    tx.outputsData.push(hexFrom("0x03000000000000000000000000000000"));
    const headerHashByHeaderDep = resource.mockHeader(
        createHeaderViewTemplate(),
        "0x00",
        [],
    );
    tx.headerDeps.push(headerHashByHeaderDep);
    let mockHeader = createHeaderViewTemplate();
    mockHeader.epoch = epochToHex([3, 1, 1000]);
    mockHeader.number = `0x${6}`;
    const headerHashByInput = resource.mockHeader(
        mockHeader,
        "0x0000",
        [inputCell],
    );
    tx.headerDeps.push(headerHashByInput);
    return Verifier.from(resource, tx);
    // verifier.verifySuccess(true);
}

function run_js_code_with_witness(path: string): Verifier {
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
        hexFrom(readFileSync(path)),
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
    const inputCell1 = resource.mockCell(
        alwaysSuccessScript,
        undefined,
        "0xFF000000000000000000000000000001", 1n
    );
    tx.inputs.push(Resource.createCellInput(inputCell1));

    const inputCell = resource.mockCell(
        alwaysSuccessScript,
        mainScript,
        "0xFF000000000000000000000000000002", 2n
    );
    tx.inputs.push(Resource.createCellInput(inputCell));

    // 2 output cells
    tx.outputs.push(Resource.createCellOutput(alwaysSuccessScript, undefined, 11n));
    tx.outputsData.push(hexFrom("0x01000000000000000000000000000000"));
    tx.outputs.push(Resource.createCellOutput(alwaysSuccessScript, mainScript, 22n));
    tx.outputsData.push(hexFrom("0x02000000000000000000000000000000"));
    tx.outputs.push(Resource.createCellOutput(alwaysSuccessScript, mainScript, 33n));
    tx.outputsData.push(hexFrom("0x03000000000000000000000000000000"));
    const headerHashByHeaderDep = resource.mockHeader(
        createHeaderViewTemplate(),
        "0x00",
        [],
    );
    tx.headerDeps.push(headerHashByHeaderDep);
    let mockHeader = createHeaderViewTemplate();
    mockHeader.epoch = epochToHex([3, 1, 1000]);
    mockHeader.number = `0x${6}`;
    const headerHashByInput = resource.mockHeader(
        mockHeader,
        "0x0000",
        [inputCell],
    );
    console.log(headerHashByInput)
    console.log("mockHeader:", resource.header.get(headerHashByInput))
    tx.headerDeps.push(headerHashByInput);
    tx.witnesses.push(hexFrom("0x01"))
    tx.witnesses.push(hexFrom("0x02"))
    return Verifier.from(resource, tx);
    // verifier.verifySuccess(true);
}




describe('on-chain-bind-script', ()=> {
    test("const", async () => {
        await run_js_code("../on-chain-bind-script/dist/index.bc")
            .verifySuccess(true);
    })
    test("exit", async () => {
        await run_js_code("../on-chain-bind-script/dist/index.exit.bc")
            .verifyFailure(-128);
    })
    test("func", async () => {
        let tx = run_js_code("../on-chain-bind-script/dist/index.func.bc");
        await tx.verifySuccess(true);
    })
    test("func-witness", async () => {
        let tx = run_js_code_with_witness("../on-chain-bind-script/dist/index.func.witness.bc");
        await tx.verifySuccess(true);
    })

    test("exec", async () => {
        let tx = run_js_code("../on-chain-bind-script/dist/index.exec.bc");
        await tx.verifySuccess(true);
    })

    test("spawn", async () => {
        let tx = run_js_code("../on-chain-bind-script/dist/index.spawn.bc");
        await tx.verifySuccess(true);
    })

    test("js", async () => {
        let tx = run_js_code("../on-chain-bind-script/dist/index.js.bc");
        await tx.verifySuccess(true);
    })

    test("hash", async () => {
        let tx = run_js_code("../on-chain-bind-script/dist/index.hash.bc");
        await tx.verifySuccess(true);
    })

    test("smt", async () => {
        let tx = run_js_code("../on-chain-bind-script/dist/index.smt.bc");
        await tx.verifySuccess(true);
    })

    test("TextDecoder", async () => {
        let tx = run_js_code("../on-chain-bind-script/dist/index.TextDecoder.bc")
        await tx.verifySuccess(true)
    })
    test("base64", () => {
        let tx = run_js_code("../on-chain-bind-script/dist/index.base64.bc")
        tx.verifySuccess(true)
    })
    test("schnorr", () => {
        let tx = run_js_code("../on-chain-bind-script/dist/index.schnorr.bc")
        tx.verifySuccess(true)
    })
    test("secp256k1", async () => {
        let tx = run_js_code("../on-chain-bind-script/dist/index.secp256k1.bc")
        await tx.verifySuccess(true)
    })

});
