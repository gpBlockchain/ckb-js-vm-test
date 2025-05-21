import {
    CELL_FIELD_DATA_HASH,
    hex,
    SCRIPT_HASH_TYPE_DATA2,
    SOURCE_CELL_DEP,
    SOURCE_GROUP_INPUT, SOURCE_GROUP_OUTPUT
} from "@ckb-js-std/bindings";
import { Channel, RequestPacket, spawnCellServer } from "@ckb-js-std/ipc";
import {hashCkb, HasherCkb, HighLevel, log} from "@ckb-js-std/core"
import * as bindings from "@ckb-js-std/bindings";
function main() {
    let script = HighLevel.loadCellType(0, SOURCE_GROUP_INPUT);

    let serverCode = HighLevel.loadCellData(1,SOURCE_CELL_DEP)! // Your server code hash
    let group_output_data_hash = bindings.loadCellByField(1, SOURCE_CELL_DEP, CELL_FIELD_DATA_HASH);
    console.log(`group_output_data_hash:${JSON.stringify(group_output_data_hash)}`);
    let serverCodeHash = hashCkb(serverCode)
    console.log(`hashCkb:${JSON.stringify(serverCodeHash)}`);

    // let serverCode = 'var E=Object.defineProperty;var R=(r,e)=>{for(var t in e)E(r,t,{get:e[t],enumerable:!0})};function a(r){let e=new Uint8Array(8);if(r<0)throw new Error("VLQ does not support negative numbers");let t=0;do{let n=r&127;r>>>=7,r!==0&&(n|=128),e[t++]=n}while(r!==0);return e.slice(0,t)}function _(r,e=0){let t=r instanceof ArrayBuffer?new Uint8Array(r):r,n=0,o=0,s=0,m;do{if(e+s>=t.length)throw new Error("Incomplete VLQ value");if(m=t[e+s++],n|=(m&127)<<o,o+=7,o>56)throw new Error("VLQ value exceeds maximum supported size")}while((m&128)!==0);return{value:n,bytesRead:s}}function h(r){let e=[];for(;;){let n=r.readExact(1);if(e.push(n[0]),(n[0]&128)===0)break}return _(new Uint8Array(e)).value}var p=class r{constructor(e,t=0,n=0){this.version_=n,this.methodId_=t,this.payload_=e}static readFrom(e){let t=h(e),n=h(e),o=h(e),s=e.readExact(o);return new r(s,n,t)}version(){return this.version_}payload(){return this.payload_}methodId(){return this.methodId_}serialize(){let e=a(this.version_),t=a(this.methodId_),n=a(this.payload_.length),o=new Uint8Array(e.length+t.length+n.length+this.payload_.length),s=0;return o.set(e,s),s+=e.length,o.set(t,s),s+=t.length,o.set(n,s),s+=n.length,o.set(this.payload_,s),o}toString(){return\`RequestPacket, method_id: ${this.methodId_}, ${this.payload_.length} bytes payload\`}},c=class r{constructor(e,t,n=0){this.version_=n,this.errorCode_=e,this.payload_=t}static readFrom(e){let t=h(e),n=h(e),o=h(e),s=e.readExact(o);return new r(n,s,t)}version(){return this.version_}payload(){return this.payload_}errorCode(){return this.errorCode_}serialize(){let e=a(this.version_),t=a(this.errorCode_),n=a(this.payload_.length),o=new Uint8Array(e.length+t.length+n.length+this.payload_.length),s=0;return o.set(e,s),s+=e.length,o.set(t,s),s+=t.length,o.set(n,s),s+=n.length,o.set(this.payload_,s),o}toString(){return\`ResponsePacket, error_code: ${this.errorCode_}, ${this.payload_.length} bytes payload\`}};var f=class{constructor(e,t){this.reader=e,this.writer=t}execute(e){for(;;){let t=this.receiveRequest(),n=e.serve(t);this.sendResponse(n)}}call(e){return this.sendRequest(e),this.receiveResponse()}sendRequest(e){let t=e.serialize();this.writer.write(t),this.writer.flush()}sendResponse(e){let t=e.serialize();this.writer.write(t),this.writer.flush()}sendErrorCode(e){let t=new c(e,new Uint8Array(0));console.log("Sending error code:",e);let n=t.serialize();this.writer.write(n),this.writer.flush()}receiveRequest(){return p.readFrom(this.reader)}receiveResponse(){return c.readFrom(this.reader)}};import{read as b,write as v}from"@ckb-js-std/bindings";var l=class r{constructor(e){this.id=e}fd(){return this.id}readable(){return this.id%2===0}writable(){return this.id%2===1}read(e){let t=b(this.id,e);return new Uint8Array(t)}readExact(e){let t=new Uint8Array(e),n=0;for(;n<e;){let o=e-n,s=this.read(o);if(s.length===0)throw new Error("Unexpected end of stream");t.set(s,n),n+=s.length}return t}write(e){return v(this.id,e.buffer),e.length}flush(){}static from(e){return new r(e)}};import{pipe as W,inheritedFds as I,spawnCell as X,spawn as Q}from"@ckb-js-std/bindings";function x(r){let e=I();if(e.length!==2)throw new Error("Expected exactly 2 inherited file descriptors");let t=new l(e[0]),n=new l(e[1]);new f(t,n).execute(r)}var u={};R(u,{LogLevel:()=>i,debug:()=>A,error:()=>q,info:()=>B,setLevel:()=>U,warn:()=>S});import{sprintf as w,printf as y}from"@ckb-js-std/bindings";var i;(function(r){r[r.Debug=1]="Debug",r[r.Info=2]="Info",r[r.Warn=3]="Warn",r[r.Error=4]="Error"})(i||(i={}));var d=i.Info;function A(r,...e){if(d<=i.Debug){let t=w(r,...e);y("[DEBUG] %s",t)}}function B(r,...e){if(d<=i.Info){let t=w(r,...e);y("[INFO] %s",t)}}function S(r,...e){if(d<=i.Warn){let t=w(r,...e);y("[WARN] %s",t)}}function q(r,...e){if(d<=i.Error){let t=w(r,...e);y("[ERROR] %s",t)}}function U(r){d=r}var g=class{serve(e){return console.log("---- server ----"),new c(0,new Uint8Array([42]))}};function C(){u.setLevel(u.LogLevel.Debug),x(new g)}C();'
    console.log('--- spawnCellServer--- ');
    // spawn server
    let [readPipe, writePipe] = spawnCellServer(
        script!.codeHash,
        SCRIPT_HASH_TYPE_DATA2,
        ["-t", `${hex.encode(serverCodeHash)}04`],
        // ["-e", serverCode],
    );
    for (let i = 0; i < 10; i++) {

        let channel = new Channel(readPipe, writePipe);
        let req = new RequestPacket(new Uint8Array([i, 2, 3]));
        let res = channel.call(req);
        console.log("call succ");
        // let decode = new bindings.TextDecoder().decode(res.payload())
        // let data1 = JSON.parse(decode)
        console.log(`res: ${JSON.stringify(res.payload().length)}`);
        console.log(`res 0:`,res.payload()[0])
        console.log(`errorCode:${res.errorCode()}`)
    }

}

main();