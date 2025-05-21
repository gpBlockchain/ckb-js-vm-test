import * as bindings from "@ckb-js-std/bindings";
import * as misc from "@ckb-js-std/bindings";

import {log} from "@ckb-js-std/core";
import {
    currentCycles, hex as St,
} from "@ckb-js-std/bindings";

ArrayBuffer.prototype.hasOwnProperty("toJSON") || Object.defineProperty(ArrayBuffer.prototype, "toJSON", {
    value: function () {
        return `0x${St.encode(this)}`
    }, enumerable: !1, writable: !0, configurable: !0
});


function main() {
    log.setLevel(log.LogLevel.Debug);


    let test_data = [
        {
            keys: ['381dc5391dab099da5e28acd1ad859a051cf18ace804d037f12819c6fbc0e18b'],
            values: ['9158ce9b0e11dd150ba2ae5d55c1db04b1c5986ec626f2e38a93fe8ad0b2923b'],
            root: 'ebe0fab376cd802d364eeb44af20c67a74d6183a33928fead163120ef12e6e06',
            proof: '4c4fff51ff322de8a89fe589987f97220cfcb6820bd798b31a0b56ffea221093d35f909e580b00000000000000000000000000000000000000000000000000000000000000'
        },
        {
            keys: ['e8c0265680a02b680b6cbc880348f062b825b28e237da7169aded4bcac0a04e5'],
            values: ['2ca41595841e46ce8e74ad749e5c3f1d17202150f99c3d8631233ebdd19b19eb'],
            root: 'c8f513901e34383bcec57c368628ce66da7496df0a180ee1e021df3d97cb8f7b',
            proof: '4c4fff51fa8aaa2aece17b92ec3f202a40a09f7286522bae1e5581a2a49195ab6781b1b8090000000000000000000000000000000000000000000000000000000000000000'
        },
        // {
        //     // keys: ['66aa31f38d0467c448aea16a71f35b5774ae0e67d8d45004dbc4b17aed348e6d', '4ab223a74afc158a964e769e37cd8c4661e48861d8fd77829d6c4f0fdf068033', '5452b4789ce034893abc21361d2325c67903a9f2a67f5fbaefc923d67a21488e', '332b1d769baf3e465eeb3cba39a519fc0ebd854aaac6677343df4bd778382f3f', '0d0040b15d5dee8868cd2af3be757919b790a388cd9f6b613d46094481297a1a'],
        //     // values: ['c79da2bb04a805471e954c4cd92e07e24e98d719fc95ade2955bcb9eb9b1d2ec', 'cfa70e7c25dcb48f8d56e56bb75c4bbc0b84d90d1ba853bab726fc3bebe07234', '13ab3722a76ee01349a5fb0e40db4199485c98dae76f04fa03606153837732d7', '0af1c60ccfc1206f7a6a72946f536fce814b8ef43186b2dd9db9607f2ae3b3e7', 'eaaae85d3bc6549ab646b19b0c0acec2ac40d689deb9350427fa4e194223953f'],
        //     // root: '2180ae74e508a7ed34a8ac94a2c1c8e63415e5e4f343fa918822ec10fc741d22',
        //     // proof: '4c4ffa51fa4228157be05981ce1040eae678103de1b4249292c2f4ca7f69f1c618d5ff7c0fb22e393f9bce915b53f43799f19b3dc17b7ae2810dab48f3b44553ca1850dc0251fb2949c673b0901c8033fe4e021f1493c975897a7a418b2857a5d052751d34ed9db513f737991d2eae86e552cd1b918833204bbb7faa2a2723024172792694bd02508e37d9c254aeea2a38c0cd9720f62a4999d093e1e61fe7c785cee27f2064e83b4c4ff851f8f3cea00473e6824c244c3e05e0ef2346765829029c93a88e2509bf37ce8c43853bf6a3dd9d99bf27dc87ba4c09e6377f550a2f2d94017a92a005a115f7bfb2004f024c4ffb485022def9088cb49173a6b81e0e68b03a265e2f5ffc1536689629312c83ac0ee99e484c4ff651f62452c7f0235211e409a93b526c4c3b6afc170591f98e23d4b13912a56b1f662df69ae37d4f30ea2b92ab594638149e54d4f31054beb0c0869651a88e1ffe00004f0451fbf350b40c8c4c97a64b6c3109d5752132e73b8350a179ffd1d7b4bfff0f5e0c72223db6e0d2c1b2d05e27adbf08c8a65b99c1e412ebc99f830cff1ef0d6dba30351fc2533df41d305c68fcdfdbd16f94a651c0e996940ee3a57d954ef6d3c72e869274042e86748026a28c5fbed59126987ecb3cd149b5b6983de98bb715540379f0850635f3b92afa54816f69ce81466e83bcd4702bee9acab751ac28f2e14c11c913d484c4ff551f5fb9d8c48e5912d4ba41162415f1a8e714759634e3cb224d27517f104d618e75f0ce7c91df6828fcdb68515125ab1cc7f2e6e38064a4560aea17a51cf01921f004f0251f86e7c510590527789989960f1d066455d6e34ac508a35243b7fdbd132b96e52db2b1b5c7607fbbc67a19b51a19cfe475fbf50ff50b3ba38543d48edd7c4d7c2004f025101853ede74275303b1658c922b10e8aaa329d7a797bb98e71f43e2372dfe1d39f50000000000000000000000000000000000000000000000000000000000000004509effeaf343f32152e65a77d98f91eed08202d0302772c33923c39111c3af8f92500782fe0d3447b488804278c1821c772a45bb7c3e0e45b4ae6db40a5747ecb358508a9719eb92e5af931de1269a326bd61e093bd418a5ea8253c1dac474ede4db8c48'
        //     keys: ['c5d6a9da775c92d36893a9c40369f89a806220565257d70f3daf5cff9e77197d'],
        //     values: ['4c46e6484f6617b3274fe6b8e8953c3046f28a75a69a084ef4e89b514ec1c680'],
        //     root: '10033aa02a6a6c58b27aefe24aebde16b7e4f453f045f385f4330715a54fd668',
        //     proof: '4c4ffe51feaf6c0854827e99b4eb639c199d034b05f270775e4aac0c96f7b44415fb1a1ab5000c8f145435d11a136b2ebad5ee86aca9a834c0552e16afe0b2ddc009756b2d50d51c6c7f8dc9f24344cfdd4bc8a8d0fd1a2f0455dfcd627f1ebc27a843b03092'
        //
        // },

    ]
    for (let i = 0; i < test_data.length; i++) {
        console.log(`SMT insert cycles: ${i}`);

        // Update the conversions to use misc.hex.decode

        const rootHash = misc.hex.decode(test_data[i].root);
        const proof = misc.hex.decode(test_data[i].proof);

        // Create new SMT instance
        const smt = new misc.Smt();

        // Insert key-value pair and measure cycles
        const startInsert = currentCycles();
        for (let j = 0; j < test_data[i].keys.length; j++) {
            const key = misc.hex.decode(test_data[i].keys[j]);
            const value = misc.hex.decode(test_data[i].values[j]);
            smt.insert(key, value);
        }
        const endInsert = currentCycles();
        console.log(`SMT insert cycles: ${endInsert - startInsert}`);


        // Verify proof and measure cycles
        const startVerify = currentCycles();
        const isValid = smt.verify(rootHash, proof);
        const endVerify = currentCycles();
        console.log(`SMT verify cycles: ${endVerify - startVerify}`);
        console.assert(isValid === true, 'SMT verification failed');
        console.log('test_ckb_smt_verify1 ok');


    }


    return 0;
}

bindings.exit(main());
