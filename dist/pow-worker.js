async function minePoW(t,e){let n=0;const o=Date.now();let s=o,r=0,a=0,c="";for(;;){t.tags[0][1]=n.toString(),t.created_at=Math.floor(Date.now()/1e3);const i=calculateId(t),l=countLeadingZeroes(i);if(r++,l>a&&(a=l,c=i),Date.now()-s>1e3&&(reportProgress(o,r,c,a),s=Date.now()),l===e){t.id=i,self.postMessage({type:"result",event:t});break}n++}}function calculateId(t){const e=[0,t.pubkey,t.created_at,t.kind,t.tags,t.content],n=JSON.stringify(e);return CryptoJS.SHA256(n).toString(CryptoJS.enc.Hex)}function countLeadingZeroes(t){let e=0;for(let n=0;n<t.length;n++){const o=parseInt(t[n],16);if(0!==o){e+=Math.clz32(o)-28;break}e+=4}return e}function reportProgress(t,e,n,o){const s=e/((Date.now()-t)/1e3);self.postMessage({type:"progress",hashRate:s,bestHash:n,bestLeadingZeroes:o})}importScripts("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"),self.onmessage=function(t){const{event:e,difficulty:n}=t.data;minePoW(e,n)};