import * as bindings from "@ckb-js-std/bindings";
import {Script, HighLevel, log} from "@ckb-js-std/core";
import {
    CELL_FIELD_CAPACITY,
    CELL_FIELD_DATA_HASH,
    CELL_FIELD_LOCK,
    CELL_FIELD_LOCK_HASH,
    CELL_FIELD_OCCUPIED_CAPACITY,
    CELL_FIELD_TYPE,
    CELL_FIELD_TYPE_HASH,
    HEADER_FIELD_EPOCH_LENGTH,
    HEADER_FIELD_EPOCH_NUMBER,
    HEADER_FIELD_EPOCH_START_BLOCK_NUMBER, INDEX_OUT_OF_BOUND,
    INPUT_FIELD_OUT_POINT,
    INPUT_FIELD_SINCE,
    INVALID_DATA,
    INVALID_FD, ITEM_MISSING, LENGTH_NOT_ENOUGH,
    MAX_FDS_CREATED,
    MAX_VMS_SPAWNED,
    OTHER_END_CLOSED, SCRIPT_HASH_TYPE_DATA, SCRIPT_HASH_TYPE_DATA1, SCRIPT_HASH_TYPE_DATA2, SCRIPT_HASH_TYPE_TYPE,
    SOURCE_CELL_DEP,
    SOURCE_GROUP_INPUT,
    SOURCE_GROUP_OUTPUT,
    SOURCE_HEADER_DEP,
    SOURCE_INPUT,
    SOURCE_OUTPUT,
    WAIT_FAILURE
} from "@ckb-js-std/bindings";

function main() {
    log.setLevel(log.LogLevel.Debug);
    log.debug(`SOURCE_CELL_DEP:${SOURCE_CELL_DEP}`);
    console.assert(SOURCE_CELL_DEP == 3, 'SOURCE_CELL_DEP should be 3');
    log.debug(`SOURCE_HEADER_DEP:${SOURCE_HEADER_DEP}`);
    console.assert(SOURCE_HEADER_DEP == 4, 'SOURCE_HEADER_DEP should be 4');
    log.debug(`SOURCE_INPUT:${SOURCE_INPUT}`);
    console.assert(SOURCE_INPUT == 1, 'SOURCE_INPUT should be 1');
    log.debug(`SOURCE_OUTPUT:${SOURCE_OUTPUT}`);
    console.assert(SOURCE_OUTPUT == 2, 'SOURCE_OUTPUT should be 2');
    log.debug(`SOURCE_GROUP_INPUT:${SOURCE_GROUP_INPUT}`);

    // 0x0100000000000001 == 72057594037927937
    console.assert(SOURCE_GROUP_INPUT == 72057594037927937n, 'SOURCE_GROUP_INPUT should be 72057594037927937');
    log.debug(`SOURCE_GROUP_OUTPUT:${SOURCE_GROUP_OUTPUT}`);

    // 0x0100000000000002 == 72057594037927938
    console.assert(SOURCE_GROUP_OUTPUT == 72057594037927938n, 'SOURCE_GROUP_OUTPUT should be 0x0100000000000002');
    log.debug(`CELL_FIELD_CAPACITY:${CELL_FIELD_CAPACITY}`);
    console.assert(CELL_FIELD_CAPACITY == 0, 'CELL_FIELD_CAPACITY should be 0');
    log.debug(`CELL_FIELD_DATA_HASH:${CELL_FIELD_DATA_HASH}`);
    console.assert(CELL_FIELD_DATA_HASH == 1, 'CELL_FIELD_DATA_HASH should be 1');
    log.debug(`CELL_FIELD_LOCK:${CELL_FIELD_LOCK}`);
    console.assert(CELL_FIELD_LOCK == 2, 'CELL_FIELD_LOCK should be 2');
    log.debug(`CELL_FIELD_LOCK_HASH:${CELL_FIELD_LOCK_HASH}`);
    console.assert(CELL_FIELD_LOCK_HASH == 3, 'CELL_FIELD_LOCK_HASH should be 3');
    log.debug(`CELL_FIELD_TYPE:${CELL_FIELD_TYPE}`);
    console.assert(CELL_FIELD_TYPE == 4, 'CELL_FIELD_TYPE should be 4');
    log.debug(`CELL_FIELD_TYPE_HASH:${CELL_FIELD_TYPE_HASH}`);
    console.assert(CELL_FIELD_TYPE_HASH == 5, 'CELL_FIELD_TYPE_HASH should be 5');
    log.debug(`CELL_FIELD_OCCUPIED_CAPACITY:${CELL_FIELD_OCCUPIED_CAPACITY}`);
    console.assert(CELL_FIELD_OCCUPIED_CAPACITY == 6, 'CELL_FIELD_OCCUPIED_CAPACITY should be 6');

    // load_cell_by_field
    log.debug(`HEADER_FIELD_EPOCH_NUMBER:${HEADER_FIELD_EPOCH_NUMBER}`);
    console.assert(HEADER_FIELD_EPOCH_NUMBER == 0, 'HEADER_FIELD_EPOCH_NUMBER should be 0');
    log.debug(`HEADER_FIELD_EPOCH_START_BLOCK_NUMBER:${HEADER_FIELD_EPOCH_START_BLOCK_NUMBER}`);
    console.assert(HEADER_FIELD_EPOCH_START_BLOCK_NUMBER == 1, 'HEADER_FIELD_EPOCH_START_BLOCK_NUMBER should be 1');
    log.debug(`HEADER_FIELD_EPOCH_LENGTH:${HEADER_FIELD_EPOCH_LENGTH}`);
    console.assert(HEADER_FIELD_EPOCH_LENGTH == 2, 'HEADER_FIELD_EPOCH_LENGTH should be 2');

    // load_input_by_field
    log.debug(`INPUT_FIELD_OUT_POINT:${INPUT_FIELD_OUT_POINT}`);
    console.assert(INPUT_FIELD_OUT_POINT == 0, 'INPUT_FIELD_OUT_POINT should be 0');
    log.debug(`INPUT_FIELD_SINCE:${INPUT_FIELD_SINCE}`);
    console.assert(INPUT_FIELD_SINCE == 1, 'INPUT_FIELD_SINCE should be 1');

    log.debug(`SCRIPT_HASH_TYPE_DATA:${SCRIPT_HASH_TYPE_DATA}`);
    console.assert(SCRIPT_HASH_TYPE_DATA == 0, 'SCRIPT_HASH_TYPE_DATA should be 0');
    log.debug(`SCRIPT_HASH_TYPE_TYPE:${SCRIPT_HASH_TYPE_TYPE}`);
    console.assert(SCRIPT_HASH_TYPE_TYPE == 1, 'SCRIPT_HASH_TYPE_TYPE should be 1');
    log.debug(`SCRIPT_HASH_TYPE_DATA1:${SCRIPT_HASH_TYPE_DATA1}`);
    console.assert(SCRIPT_HASH_TYPE_DATA1 == 2, 'SCRIPT_HASH_TYPE_DATA1 should be 2');
    log.debug(`SCRIPT_HASH_TYPE_DATA2:${SCRIPT_HASH_TYPE_DATA2}`);
    console.assert(SCRIPT_HASH_TYPE_DATA2 == 4, 'SCRIPT_HASH_TYPE_DATA2 should be 4');


    // https://github.com/nervosnetwork/ckb-std/blob/master/src/error.rs#L3-L22
    log.debug(`INDEX_OUT_OF_BOUND:${INDEX_OUT_OF_BOUND}`);
    console.assert(INDEX_OUT_OF_BOUND == 1, 'INDEX_OUT_OF_BOUND should be 0x1');
    log.debug(`ITEM_MISSING:${ITEM_MISSING}`);
    console.assert(ITEM_MISSING == 2, 'ITEM_MISSING should be 0x2');
    log.debug(`LENGTH_NOT_ENOUGH:${LENGTH_NOT_ENOUGH}`);
    console.assert(LENGTH_NOT_ENOUGH == 3, 'LENGTH_NOT_ENOUGH should be 0x3');

    log.debug(`INVALID_DATA:${INVALID_DATA}`);
    console.assert(INVALID_DATA == 4, 'INVALID_DATA should be 0x4');

    log.debug(`WAIT_FAILURE:${WAIT_FAILURE}`);
    console.assert(WAIT_FAILURE == 5, 'WAIT_FAILURE should be 0x5');

    log.debug(`INVALID_FD:${INVALID_FD}`);
    console.assert(INVALID_FD == 6, 'INVALID_FD should be 0x6');

    log.debug(`OTHER_END_CLOSED:${OTHER_END_CLOSED}`);
    console.assert(OTHER_END_CLOSED == 7, 'OTHER_END_CLOSED should be 0x7');
    log.debug(`MAX_VMS_SPAWNED:${MAX_VMS_SPAWNED}`);
    console.assert(MAX_VMS_SPAWNED == 8, 'MAX_VMS_SPAWNED should be 0x8');
    log.debug(`MAX_FDS_CREATED:${MAX_FDS_CREATED}`);
    console.assert(MAX_FDS_CREATED == 9, 'MAX_FDS_CREATED should be 0x9');



    return 0;
}

bindings.exit(main());
