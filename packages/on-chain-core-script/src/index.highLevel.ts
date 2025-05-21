import * as bindings from "@ckb-js-std/bindings";
import {log, HighLevel, Script, hashTypeFrom, Transaction, WitnessArgs, hashCkb} from "@ckb-js-std/core";
import {hex, SOURCE_CELL_DEP, SOURCE_GROUP_INPUT, SOURCE_INPUT, SOURCE_OUTPUT} from "@ckb-js-std/bindings";


declare global {
    interface BigInt {
        toJSON(): number ;
    }
}

// 实现 toJSON 方法
BigInt.prototype.toJSON = function ():  number {
    return Number(this);
};
function main() {
    log.setLevel(log.LogLevel.Debug);
    // loadCell
    let inputScript = HighLevel.loadCell(0, SOURCE_GROUP_INPUT)
    console.log(`inputScript:${JSON.stringify(inputScript)}`);
    console.assert(inputScript.capacity == 2, "inputScript capacity should be 2");
    // loadInput
    let loadInput = HighLevel.loadInput(0, SOURCE_GROUP_INPUT);
    console.log(`loadInput:${JSON.stringify(loadInput)}`);
    console.assert(JSON.stringify(loadInput) =='{"previousOutput":{"txHash":"0x0000000000000000000000000000000000000000000000000000000000000000","index":4},"since":0}',"")
    // loadWitness
    let loadWitness = HighLevel.loadWitness(0, SOURCE_GROUP_INPUT);
    console.log(`loadWitness:${JSON.stringify(loadWitness)}`);
    console.assert(JSON.stringify(loadWitness) == '"0x02"', "loadWitness should be 0x02");
    // loadWitnessArgs
    // todo

    // loadTransaction
    let loadTx = HighLevel.loadTransaction()
    console.log(`loadTx:${JSON.stringify(loadTx)}`);

    // loadTxHash
    let loadTxHash = HighLevel.loadTxHash();
    console.log(`loadTxHash:${JSON.stringify(loadTxHash)}`);
    // loadScriptHash
    let loadScriptHash = HighLevel.loadScriptHash();
    console.log(`loadScriptHash:${JSON.stringify(loadScriptHash)}`);
    // loadCellCapacity
    let loadCellCapacity = HighLevel.loadCellCapacity(0, SOURCE_GROUP_INPUT);
    console.log(`loadCellCapacity:${loadCellCapacity}`);
    console.assert(loadCellCapacity == 2n, "loadCellCapacity should be 2");
    // loadCellOccupiedCapacity
    let loadCellOccupiedCapacity = HighLevel.loadCellOccupiedCapacity(0, SOURCE_GROUP_INPUT);
    console.log(`loadCellOccupiedCapacity:${loadCellOccupiedCapacity}`);
    console.assert(loadCellOccupiedCapacity == 15700000000n, "loadCellOccupiedCapacity should be 15700000000");
    // loadCellData
    let loadCellData = HighLevel.loadCellData(0, SOURCE_GROUP_INPUT);
    console.log(`loadCellData:${JSON.stringify(loadCellData)}`);
    console.assert(JSON.stringify(loadCellData) == '"0xff000000000000000000000000000002"',"loadCellData should be 0xff000000000000000000000000000002");
    // loadCellTypeHash
    let loadCellTypeHash = HighLevel.loadCellTypeHash(0, SOURCE_GROUP_INPUT);
    console.log(`loadCellTypeHash:${JSON.stringify(loadCellTypeHash)}`);

    // loadCellLock
    let loadCellLock = HighLevel.loadCellLock(0, SOURCE_GROUP_INPUT);
    console.log(`loadCellLock:${JSON.stringify(loadCellLock)}`);
    // loadCellLockHash
    let loadCellLockHash = HighLevel.loadCellLockHash(0, SOURCE_GROUP_INPUT);
    console.log(`loadCellLockHash:${JSON.stringify(loadCellLockHash)}`);
    // loadCellType
    let loadCellType = HighLevel.loadCellType(0, SOURCE_GROUP_INPUT);
    console.log(`loadCellType:${JSON.stringify(loadCellType)}`);
    let header = HighLevel.loadHeader(0, SOURCE_GROUP_INPUT);
    console.log(`header:${JSON.stringify(header)}`);
    // loadHeaderEpochNumber
    let loadHeaderEpochNumber = HighLevel.loadHeaderEpochNumber(0, SOURCE_GROUP_INPUT);
    console.log(`loadHeaderEpochNumber:${loadHeaderEpochNumber}`);
    console.assert(loadHeaderEpochNumber == 3n, "loadHeaderEpochNumber should be 3");
    // loadHeaderEpochStartBlockNumber
    let loadHeaderEpochStartBlockNumber = HighLevel.loadHeaderEpochStartBlockNumber(0, SOURCE_GROUP_INPUT);
    console.log(`loadHeaderEpochStartBlockNumber:${loadHeaderEpochStartBlockNumber}`);
    console.assert(loadHeaderEpochStartBlockNumber == 5n, "loadHeaderEpochStartBlockNumber should be 1000");
    // loadHeaderEpochLength
    let loadHeaderEpochLength = HighLevel.loadHeaderEpochLength(0, SOURCE_GROUP_INPUT);
    console.log(`loadHeaderEpochLength:${loadHeaderEpochLength}`);
    console.assert(loadHeaderEpochLength == 1000n, "loadHeaderEpochLength should be 1000");
    // loadInputSince
    let loadInputSince = HighLevel.loadInputSince(0, SOURCE_GROUP_INPUT);
    console.log(`loadInputSince:${loadInputSince}`);
    console.assert(loadInputSince == 0n, "loadInputSince should be 0");
    // loadInputOutPoint
    let loadInputOutPoint = HighLevel.loadInputOutPoint(0, SOURCE_GROUP_INPUT);
    console.log(`loadInputOutPoint:${JSON.stringify(loadInputOutPoint)}`);
    console.assert(JSON.stringify(loadInputOutPoint) == '{"txHash":"0x0000000000000000000000000000000000000000000000000000000000000000","index":4}',"loadInputOutPoint should be 0x")
    // loadScript
    let loadScript = HighLevel.loadScript();
    console.log(`loadScript:${JSON.stringify(loadScript)}`);
    // QueryIter
    let iter = new HighLevel.QueryIter(HighLevel.loadCellCapacity, SOURCE_INPUT);
    const inputsCapacities = iter.toArray().reduce((sum: bigint, cap: bigint) => sum + cap, 0n);
    console.log(`inputsCapacities:${inputsCapacities}`);
    console.assert(inputsCapacities == 3n, "inputsCapacities should be 6");
    //     next
    //     toArray
    // findCellByDataHash
    // HighLevel.load
    let scrip  = HighLevel.loadCell(0,SOURCE_OUTPUT);

    let dataHash = scrip.lock.codeHash
    console.log(`dataHash:${JSON.stringify(dataHash)}`);
    let dataHashNum = HighLevel.findCellByDataHash(dataHash, SOURCE_CELL_DEP);
    console.log(`dataHashNum:${JSON.stringify(dataHashNum)}`);
    console.assert(dataHashNum == 1, "dataHashNum should be 1");

    // lookForDepWithHash2
    let lookForDepWithHash2 = HighLevel.lookForDepWithHash2(dataHash, 0x0)
    console.log(`lookForDepWithHash2:${lookForDepWithHash2}`);
    console.assert(lookForDepWithHash2 == 1, "lookForDepWithHash2 should be 1");
    // lookForDepWithDataHash
    let lookForDepWithDataHash = HighLevel.lookForDepWithDataHash(dataHash)
    console.log(`lookForDepWithDataHash:${lookForDepWithDataHash}`);
    console.assert(lookForDepWithDataHash == 1, "lookForDepWithDataHash should be 1");
    return 0;
}

bindings.exit(main());
