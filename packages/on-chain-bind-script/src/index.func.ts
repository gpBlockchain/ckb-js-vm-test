import * as bindings from "@ckb-js-std/bindings";
import {Script, HighLevel, log, hashCkb} from "@ckb-js-std/core";
import {
    CELL_FIELD_CAPACITY,
    CELL_FIELD_DATA_HASH,
    CELL_FIELD_LOCK,
    CELL_FIELD_LOCK_HASH,
    CELL_FIELD_TYPE,
    CELL_FIELD_TYPE_HASH,
    hex as St, INPUT_FIELD_OUT_POINT,
    loadCellData,
    loadHeaderByField,
    SOURCE_CELL_DEP,
    SOURCE_GROUP_INPUT,
    SOURCE_GROUP_OUTPUT, SOURCE_HEADER_DEP,
    SOURCE_INPUT,
    SOURCE_OUTPUT,
    SourceType,
    spawnCell
} from "@ckb-js-std/bindings";


ArrayBuffer.prototype.hasOwnProperty("toJSON") || Object.defineProperty(ArrayBuffer.prototype, "toJSON", {
    value: function () {
        return `0x${St.encode(this)}`
    }, enumerable: !1, writable: !0, configurable: !0
});
BigInt.prototype.hasOwnProperty("toJSON") || Object.defineProperty(BigInt.prototype, "toJSON", {
    value: function () {
        return this.toString()
    }, enumerable: !1, writable: !0, configurable: !0
});

function main() {

    // loadScript
    // offset 和length 为空，预期：返回所有的loadScript
    log.setLevel(log.LogLevel.Debug);
    let script = bindings.loadScript();
    log.debug(`raw current script: ${JSON.stringify(script)}`);
    console.assert(JSON.stringify(script).endsWith("0000000000000000000000000000000000000000000000000000000000000000\""))

    // 0,2,预期：返回前2个字节
    let flag = bindings.loadScript(0, 2);
    log.debug(`flag:${JSON.stringify(flag)}`);
    log.debug(`JSON.stringify(script).slice(0,7):${JSON.stringify(script).slice(0, 7)}`);
    console.assert(JSON.stringify(flag) == JSON.stringify(script).slice(0, 7) + "\"", "");

    // offset 大于script长度，预期：返回0x
    script = bindings.loadScript(script.byteLength, 34);
    console.assert(JSON.stringify(script) == "\"0x\"")

    // loadTransaction
    // offset 和length 为空，预期：返回transaction 的txHash 和loadTxHash 一致
    let tx = bindings.loadTransaction();
    log.debug(`tx:${JSON.stringify(tx)}`)
    // raw tx :除去witness 的数据
    tx = tx.slice(12)
    tx = tx.slice(0, tx.byteLength - 4)
    let hash = hashCkb(tx);
    log.debug(`hash:${JSON.stringify(hash)}`)
    let txHash = bindings.loadTxHash();
    log.debug(`txHash:${JSON.stringify(txHash)}`);
    console.assert(JSON.stringify(hash) == JSON.stringify(txHash), "hash eq");

    // offset:0,length:2,预期：返回前2个字节
    let tx0_2 = bindings.loadTransaction(0, 2);
    tx = bindings.loadTransaction();
    log.debug(`offset:0,length:2:${JSON.stringify(tx0_2)}`)
    console.assert(JSON.stringify(tx.slice(0, 2)) == JSON.stringify(tx0_2))

    // offset 大于tx长度，预期：返回0x
    let txOutOfOffset = bindings.loadTransaction(tx.byteLength, tx.byteLength);
    console.assert(JSON.stringify(txOutOfOffset) == "\"0x\"", "")

    // loadScriptHash
    //  和loadScript计算的txHash 预期一致
    let scriptHash = bindings.loadScriptHash();
    let scriptArray = bindings.loadScript();
    let calcScriptHash = hashCkb(scriptArray)
    log.debug(`scriptHash:${JSON.stringify(scriptHash)}`)
    log.debug(`calcScriptHash:${JSON.stringify(calcScriptHash)}`)
    console.assert(JSON.stringify(scriptHash) == JSON.stringify(calcScriptHash));

    // loadCell
    // export const SOURCE_INPUT: SourceType;
    let inputCell = bindings.loadCell(0, SOURCE_INPUT);
    log.debug(`inputCell:${JSON.stringify(inputCell)}`);
    let highInputCell = HighLevel.loadCell(0, SOURCE_INPUT);
    log.debug(`inputCell:${JSON.stringify(highInputCell)}`);
    console.assert(highInputCell.capacity.toString() == "1", "capacity eq");
    console.assert(highInputCell.lock.hashType.toString() == "4", "hashType eq 4");
    console.assert(highInputCell.lock.hashType.toString() == "4", "hashType eq 4");
    console.assert(JSON.stringify(highInputCell.lock.args) == "\"0x\"", "args eq");
    console.assert(highInputCell.type == undefined, "hashType eq undefined");

    // export const SOURCE_OUTPUT: SourceType;
    let highOutputCell = HighLevel.loadCell(0, SOURCE_OUTPUT);
    log.debug(`SOURCE_OUTPUT:highOutputCell:${JSON.stringify(highOutputCell)}`);
    console.assert(highOutputCell.capacity.toString() == "11", "first capacity eq");
    // export const SOURCE_GROUP_INPUT: SourceType;
    let highGroupInputCell = HighLevel.loadCell(0, SOURCE_GROUP_INPUT);
    log.debug(`SOURCE_GROUP_INPUT:highGroupInputCell:${JSON.stringify(highGroupInputCell)}`);
    console.assert(highGroupInputCell.capacity.toString() == "2", "group input capacity eq");
    // export const SOURCE_GROUP_OUTPUT: SourceType;
    let highGroupOutputCell = HighLevel.loadCell(0, SOURCE_GROUP_OUTPUT);
    log.debug(`SOURCE_GROUP_OUTPUT:highGroupOutputCell:${JSON.stringify(highGroupOutputCell)}`);
    console.assert(highGroupOutputCell.capacity.toString() == "22", "group output capacity eq");

    // 不存在的index，预期：Error: ckb syscall error
    try {
        let source_input_cell = bindings.loadCell(99, SOURCE_INPUT);
    } catch (e) {
        // @ts-ignore
        console.assert(e.toString().includes("Error: ckb syscall error"), "Error: ckb syscall error");
    } finally {
        log.debug(`out of bound finally`);
    }

    // offset 为0 length 为2，预期：返回前2个字节的cell
    let cell02 = bindings.loadCell(0, SOURCE_INPUT, 0, 2);
    let cell = bindings.loadCell(0, SOURCE_INPUT);
    console.assert(JSON.stringify(cell.slice(0, 2)) == JSON.stringify(cell02), "cell eq");


    // loadInput
    // export const SOURCE_INPUT: SourceType;
    let input_input = HighLevel.loadInput(0, SOURCE_INPUT);
    log.debug(`input_input:${JSON.stringify(input_input)}`);
    console.assert(JSON.stringify(input_input.previousOutput.txHash) == '"0x0000000000000000000000000000000000000000000000000000000000000000"', "input_input hash eq");
    console.assert(JSON.stringify(input_input.previousOutput.index) == '3', "input_input index eq");

    // export const SOURCE_OUTPUT: SourceType;
    try {
        bindings.loadInput(0, SOURCE_OUTPUT);
    } catch (e) {
        // @ts-ignore
        console.assert(e.toString().includes("Error: ckb syscall error"), "Error: ckb syscall error");
    }
    // export const SOURCE_GROUP_INPUT: SourceType;
    let input_group_input = HighLevel.loadInput(0, SOURCE_GROUP_INPUT);
    log.debug(`input_group_input:${JSON.stringify(input_group_input)}`);
    console.assert(JSON.stringify(input_group_input.previousOutput.txHash) == '"0x0000000000000000000000000000000000000000000000000000000000000000"', "input_input hash eq");
    console.assert(JSON.stringify(input_group_input.previousOutput.index) == '4', "input_input index eq");


    // export const SOURCE_GROUP_OUTPUT: SourceType;
    try {
        bindings.loadInput(0, SOURCE_GROUP_OUTPUT);
    } catch (e) {
        // @ts-ignore
        console.assert(e.toString().includes("Error: ckb syscall error"), "Error: ckb syscall error");
    }

    // offset 为0 length 为2，预期：返回前2个字节的input
    let loadInput02 = bindings.loadInput(0, SOURCE_INPUT, 0, 2);
    let loadInput = bindings.loadInput(0, SOURCE_INPUT);
    console.assert(JSON.stringify(loadInput.slice(0, 2)) == JSON.stringify(loadInput02), "loadInput eq");


    // todo loadHeader
    // try {
    let inputHeader = bindings.loadHeader(1, SOURCE_INPUT);
    log.debug(`inputHeader:${JSON.stringify(inputHeader)}`);
    // }catch (e){
    //     // @ts-ignore
    //     log.debug(`loadHeader error:${e.toString()}`);
    //     // @ts-ignore
    //     console.assert(e.toString().includes("Error: ckb syscall error"), "Error: ckb syscall error");
    // }
    // let groupInputHeader = bindings.loadHeader(0, SOURCE_GROUP_INPUT);
    // log.debug(`groupInputHeader:${JSON.stringify(groupInputHeader)}`);
    // let outputHeader = bindings.loadHeader(0, SOURCE_OUTPUT);
    // log.debug(`outputHeader:${JSON.stringify(outputHeader)}`);
    // let groupOutputHeader = bindings.loadHeader(0, SOURCE_GROUP_OUTPUT);
    // log.debug(`groupOutputHeader:${JSON.stringify(groupOutputHeader)}`);

    // loadCellData
    // export const SOURCE_INPUT: SourceType;
    let inputData = bindings.loadCellData(0, SOURCE_INPUT);
    log.debug(`inputData:${JSON.stringify(inputData)}`);
    console.assert(JSON.stringify(inputData) == '"0xff000000000000000000000000000001"', "inputData eq");
    // export const SOURCE_OUTPUT: SourceType;
    let outputData = bindings.loadCellData(0, SOURCE_OUTPUT);
    log.debug(`outputData:${JSON.stringify(outputData)}`);
    console.assert(JSON.stringify(outputData) == '"0x01000000000000000000000000000000"', "outputData eq");
    // export const SOURCE_GROUP_INPUT: SourceType;
    let groupInputData = bindings.loadCellData(0, SOURCE_GROUP_INPUT);
    log.debug(`groupInputData:${JSON.stringify(groupInputData)}`);
    console.assert(JSON.stringify(groupInputData) == '"0xff000000000000000000000000000002"', "groupInputData eq");
    // export const SOURCE_GROUP_OUTPUT: SourceType;
    let groupOutputData = bindings.loadCellData(0, SOURCE_GROUP_OUTPUT);
    log.debug(`groupOutputData:${JSON.stringify(groupOutputData)}`);
    console.assert(JSON.stringify(groupOutputData) == '"0x02000000000000000000000000000000"', "groupOutputData eq");
    //
    let groupOutputData02 = bindings.loadCellData(0, SOURCE_GROUP_OUTPUT, 0, 2);
    log.debug(`groupOutputData02:${JSON.stringify(groupOutputData02)}`);
    console.assert(JSON.stringify(groupOutputData.slice(0, 2)) == JSON.stringify(groupOutputData02), "groupOutputData eq");

    // loadCellByField
    // export const SOURCE_INPUT: SourceType;
    let input_cell_field_capacity = bindings.loadCellByField(0, SOURCE_INPUT, CELL_FIELD_CAPACITY);
    log.debug(`input_cell_field_capacity:${JSON.stringify(input_cell_field_capacity)}`);
    console.assert(JSON.stringify(input_cell_field_capacity) == `"0x0100000000000000"`, "input_cell_field_capacity eq");

    // export const SOURCE_OUTPUT: SourceType;
    let output_cell_field_capacity = bindings.loadCellByField(0, SOURCE_OUTPUT, CELL_FIELD_CAPACITY);
    log.debug(`output_cell_field_capacity:${JSON.stringify(output_cell_field_capacity)}`);
    console.assert(JSON.stringify(output_cell_field_capacity) == `"0x0b00000000000000"`, "output_cell_field_capacity eq");
    // export const SOURCE_GROUP_INPUT: SourceType;
    let groupInput_cell_field_capacity = bindings.loadCellByField(0, SOURCE_GROUP_INPUT, CELL_FIELD_CAPACITY);
    log.debug(`groupInput_cell_field_capacity:${JSON.stringify(groupInput_cell_field_capacity)}`);
    console.assert(JSON.stringify(groupInput_cell_field_capacity) == `"0x0200000000000000"`, "groupInput_cell_field_capacity eq");
    // export const SOURCE_GROUP_OUTPUT: SourceType;
    let groupOutput_cell_field_capacity = bindings.loadCellByField(0, SOURCE_GROUP_OUTPUT, CELL_FIELD_CAPACITY);
    log.debug(`groupOutput_cell_field_capacity:${JSON.stringify(groupOutput_cell_field_capacity)}`);
    console.assert(JSON.stringify(groupOutput_cell_field_capacity) == `"0x1600000000000000"`, "groupOutput_cell_field_capacity eq");

    //     CELL_FIELD_CAPACITY,
    groupOutput_cell_field_capacity = bindings.loadCellByField(0, SOURCE_GROUP_OUTPUT, CELL_FIELD_CAPACITY);
    log.debug(`groupOutput_cell_field_capacity:${JSON.stringify(groupOutput_cell_field_capacity)}`);
    console.assert(JSON.stringify(groupOutput_cell_field_capacity) == `"0x1600000000000000"`, "groupOutput_cell_field_capacity eq");

    //     CELL_FIELD_DATA_HASH,
    let group_output_data_hash = bindings.loadCellByField(0, SOURCE_GROUP_OUTPUT, CELL_FIELD_DATA_HASH);
    log.debug(`group_output_data_hash:${JSON.stringify(group_output_data_hash)}`);
    let cellData = bindings.loadCellData(0, SOURCE_GROUP_OUTPUT);
    let cellDataHash = hashCkb(cellData);
    log.debug(`cellDataHash:${JSON.stringify(cellDataHash)}`);
    console.assert(JSON.stringify(group_output_data_hash) == JSON.stringify(cellDataHash), "group_output_data_hash eq");
    //     CELL_FIELD_LOCK,
    let group_output_lock = HighLevel.loadCellLock(0, SOURCE_GROUP_OUTPUT)
    log.debug(`group_output_lock:${JSON.stringify(group_output_lock)}`);
    console.assert(JSON.stringify(group_output_lock.hashType) == "4", "group_output_lock.hashType eq");
    console.assert(JSON.stringify(group_output_lock.args) == "\"0x\"", "group_output_lock.args eq");
    //     CELL_FIELD_LOCK_HASH,
    let group_output_lock_hash = bindings.loadCellByField(0, SOURCE_GROUP_OUTPUT, CELL_FIELD_LOCK_HASH);
    log.debug(`group_output_lock_hash:${JSON.stringify(group_output_lock_hash)}`);
    let group_output_lock_buffer = bindings.loadCellByField(0, SOURCE_GROUP_OUTPUT, CELL_FIELD_LOCK);
    let group_output_lock_buffer_hash = hashCkb(group_output_lock_buffer);
    log.debug(`group_output_lock_buffer_hash:${JSON.stringify(group_output_lock_buffer_hash)}`);
    console.assert(JSON.stringify(group_output_lock_hash) == JSON.stringify(group_output_lock_buffer_hash), "group_output_lock_hash eq");
    //     CELL_FIELD_OCCUPIED_CAPACITY,
    let group_output_occupied_capacity = HighLevel.loadCellOccupiedCapacity(0, SOURCE_GROUP_OUTPUT);
    log.debug(`group_output_occupied_capacity:${JSON.stringify(group_output_occupied_capacity)}`);
    console.assert(JSON.stringify(group_output_occupied_capacity) == `"15700000000"`, "group_output_occupied_capacity eq");

    //     CELL_FIELD_TYPE,
    let group_output_type = HighLevel.loadCellType(0, SOURCE_GROUP_OUTPUT);
    log.debug(`group_output_type:${JSON.stringify(group_output_type)}`);
    console.assert(JSON.stringify(group_output_type?.hashType) == "4", "group_output_type.hashType eq");
    console.assert(JSON.stringify(group_output_type?.args).endsWith('0000000000000000000000000000000000000000000000000000000000000000"'), "group_output_type.args eq");

    //     CELL_FIELD_TYPE_HASH,
    let group_output_type_hash = bindings.loadCellByField(0, SOURCE_GROUP_OUTPUT, CELL_FIELD_TYPE_HASH);
    log.debug(`group_output_type_hash:${JSON.stringify(group_output_type_hash)}`);
    let cell_type_byte = bindings.loadCellByField(0, SOURCE_GROUP_OUTPUT, CELL_FIELD_TYPE);
    let cell_type_byte_hash = hashCkb(cell_type_byte);
    console.assert(JSON.stringify(group_output_type_hash) == JSON.stringify(cell_type_byte_hash), "group_output_type_hash eq");

    //
    let input_cell_field_capacity02 = bindings.loadCellByField(0, SOURCE_INPUT, CELL_FIELD_CAPACITY, 0, 2);
    log.debug(`input_cell_field_capacity02:${JSON.stringify(input_cell_field_capacity02)}`);
    console.assert(JSON.stringify(input_cell_field_capacity02) == JSON.stringify(input_cell_field_capacity.slice(0, 2)), "input_cell_field_capacity02 eq");

    // loadHeaderByField
    let header = bindings.loadHeader(1, SOURCE_INPUT);
    console.log("header:",JSON.stringify(header))
    let length = HighLevel.loadHeaderEpochLength(1, SOURCE_INPUT);
    console.log("loadHeaderEpochLength:", length);
    console.assert(length == 1000n, "loadHeaderEpochLength eq");
    let number = HighLevel.loadHeaderEpochNumber(1, SOURCE_INPUT);
    console.log("loadHeaderEpochNumber:", number);
    console.assert(number == 3n, "loadHeaderEpochNumber eq");
    let startBlockNum = HighLevel.loadHeaderEpochStartBlockNumber(1, SOURCE_INPUT);
    console.log("loadHeaderEpochStartBlockNumber:", startBlockNum);
    console.assert(startBlockNum == 5n, "loadHeaderEpochStartBlockNumber eq");

    // loadInputByField
    // export const SOURCE_INPUT: SourceType;
    let inputSince = HighLevel.loadInputSince(0, SOURCE_INPUT);
    log.debug(`inputSince:${JSON.stringify(inputSince)}`);
    console.assert(JSON.stringify(inputSince) == '"0"', "inputSince eq");
    // export const SOURCE_OUTPUT: SourceType;
    try {
        bindings.loadInputByField(0, SOURCE_OUTPUT, CELL_FIELD_LOCK);
    } catch (e) {
        // @ts-ignore
        console.assert(e.toString().includes("Error: ckb syscall error"), "Error: ckb syscall error");
    }
    // export const SOURCE_GROUP_INPUT: SourceType;
    let groupInputSince = HighLevel.loadInputSince(0, SOURCE_GROUP_INPUT);
    log.debug(`groupInputSince:${JSON.stringify(groupInputSince)}`);
    console.assert(JSON.stringify(groupInputSince) == '"0"', "groupInputSince eq");
    // export const SOURCE_GROUP_OUTPUT: SourceType;
    try {
        bindings.loadInputByField(0, SOURCE_GROUP_OUTPUT, CELL_FIELD_LOCK);
    } catch (e) {
        // @ts-ignore
        console.assert(e.toString().includes("Error: ckb syscall error"), "Error: ckb syscall error");
    }
    // offset 为0 length 为2，预期：返回前2个字节的input
    let inputOutput02 = bindings.loadInputByField(0, SOURCE_INPUT, INPUT_FIELD_OUT_POINT, 0, 2);
    let inputOutput = bindings.loadInputByField(0, SOURCE_INPUT, INPUT_FIELD_OUT_POINT);
    log.debug(`inputOutput02:${JSON.stringify(inputOutput02)}`);
    log.debug(`inputOutput:${JSON.stringify(inputOutput)}`);
    console.assert(JSON.stringify(inputOutput.slice(0, 2)) == JSON.stringify(inputOutput02), "inputOutput eq");
    // OutPoint = 0,
    let inputOutpoint = HighLevel.loadInputOutPoint(0, SOURCE_INPUT);
    log.debug(`inputOutpoint:${JSON.stringify(inputOutpoint)}`);
    console.assert(JSON.stringify(inputOutpoint.txHash) == '"0x0000000000000000000000000000000000000000000000000000000000000000"', " inputOutpoint txHash eq");
    console.assert(JSON.stringify(inputOutpoint.index) == "3", "inputOutpoint index eq");
    //     Since = 1,
    let since = HighLevel.loadInputSince(0, SOURCE_INPUT);
    log.debug(`since:${JSON.stringify(since)}`);
    console.assert(JSON.stringify(since) == '"0"', "since eq");

    // vmVersion
    let version = bindings.vmVersion();
    log.debug(`vmVersion:${JSON.stringify(version)}`);
    console.assert(JSON.stringify(version) == "2", "vmVersion eq");
    let currentCycle = bindings.currentCycles();
    log.debug(`currentCycles:${JSON.stringify(currentCycle)}`);
    console.assert(currentCycle > 0, "currentCycles gt 0");


    // loadBlockExtension
    let extension1 = bindings.loadBlockExtension(0,SOURCE_HEADER_DEP);
    console.log("extension:",JSON.stringify(extension1))

    let extension2 = bindings.loadBlockExtension(1,SOURCE_HEADER_DEP);
    console.log("extension:",JSON.stringify(extension2))

    return 0;
}

bindings.exit(main());
