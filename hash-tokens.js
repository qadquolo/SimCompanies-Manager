
const itt = e => {
    let t="";
    for(let r=0;r<e.length*32;r+=8)t+=String.fromCharCode(e[r>>5]>>>r%32&255);
    return t
},
Np=(e,t)=>{let r=(e&65535)+(t&65535);return(e>>16)+(t>>16)+(r>>16)<<16|r&65535},
att=(e,t)=>e<<t|e>>>32-t,CS=(e,t,r,n,a,o)=>Np(att(Np(Np(t,e),Np(n,o)),a),r),
Oo=(e,t,r,n,a,o,s)=>CS(t&r|~t&n,e,t,a,o,s),Do=(e,t,r,n,a,o,s)=>CS(t&n|r&~n,e,t,a,o,s),
Lo=(e,t,r,n,a,o,s)=>CS(t^r^n,e,t,a,o,s),Fo=(e,t,r,n,a,o,s)=>CS(r^(t|~n),e,t,a,o,s),

ott=(e,t) => { e[t>>5]|=128<<t%32, e[(t+64>>>9<<4)+14]=t; let r=1732584193, n=-271733879, a=-1732584194, o=271733878;
    for(let s=0;s<e.length;s+=16) {
        let l=r,c=n,d=a,u=o;r=Oo(r,n,a,o,e[s],7,-680876936),
        o=Oo(o,r,n,a,e[s+1],12,-389564586),a=Oo(a,o,r,n,e[s+2],17,606105819),n=Oo(n,a,o,r,e[s+3],22,-1044525330),
        r=Oo(r,n,a,o,e[s+4],7,-176418897),o=Oo(o,r,n,a,e[s+5],12,1200080426),a=Oo(a,o,r,n,e[s+6],17,-1473231341),
        n=Oo(n,a,o,r,e[s+7],22,-45705983),r=Oo(r,n,a,o,e[s+8],7,1770035416),o=Oo(o,r,n,a,e[s+9],12,-1958414417),
        a=Oo(a,o,r,n,e[s+10],17,-42063),n=Oo(n,a,o,r,e[s+11],22,-1990404162),r=Oo(r,n,a,o,e[s+12],7,1804603682),
        o=Oo(o,r,n,a,e[s+13],12,-40341101),a=Oo(a,o,r,n,e[s+14],17,-1502002290),n=Oo(n,a,o,r,e[s+15],22,1236535329),
        r=Do(r,n,a,o,e[s+1],5,-165796510),o=Do(o,r,n,a,e[s+6],9,-1069501632),a=Do(a,o,r,n,e[s+11],14,643717713),n=Do(n,a,o,r,e[s],20,-373897302),
        r=Do(r,n,a,o,e[s+5],5,-701558691),o=Do(o,r,n,a,e[s+10],9,38016083),a=Do(a,o,r,n,e[s+15],14,-660478335),n=Do(n,a,o,r,e[s+4],20,-405537848),
        r=Do(r,n,a,o,e[s+9],5,568446438),o=Do(o,r,n,a,e[s+14],9,-1019803690),a=Do(a,o,r,n,e[s+3],14,-187363961),n=Do(n,a,o,r,e[s+8],20,1163531501),
        r=Do(r,n,a,o,e[s+13],5,-1444681467),o=Do(o,r,n,a,e[s+2],9,-51403784),a=Do(a,o,r,n,e[s+7],14,1735328473),n=Do(n,a,o,r,e[s+12],20,-1926607734),
        r=Lo(r,n,a,o,e[s+5],4,-378558),o=Lo(o,r,n,a,e[s+8],11,-2022574463),a=Lo(a,o,r,n,e[s+11],16,1839030562),n=Lo(n,a,o,r,e[s+14],23,-35309556),
        r=Lo(r,n,a,o,e[s+1],4,-1530992060),o=Lo(o,r,n,a,e[s+4],11,1272893353),a=Lo(a,o,r,n,e[s+7],16,-155497632),n=Lo(n,a,o,r,e[s+10],23,-1094730640),
        r=Lo(r,n,a,o,e[s+13],4,681279174),o=Lo(o,r,n,a,e[s],11,-358537222),a=Lo(a,o,r,n,e[s+3],16,-722521979),n=Lo(n,a,o,r,e[s+6],23,76029189),
        r=Lo(r,n,a,o,e[s+9],4,-640364487),o=Lo(o,r,n,a,e[s+12],11,-421815835),a=Lo(a,o,r,n,e[s+15],16,530742520),n=Lo(n,a,o,r,e[s+2],23,-995338651),
        r=Fo(r,n,a,o,e[s],6,-198630844),o=Fo(o,r,n,a,e[s+7],10,1126891415),a=Fo(a,o,r,n,e[s+14],15,-1416354905),n=Fo(n,a,o,r,e[s+5],21,-57434055),
        r=Fo(r,n,a,o,e[s+12],6,1700485571),o=Fo(o,r,n,a,e[s+3],10,-1894986606),a=Fo(a,o,r,n,e[s+10],15,-1051523),n=Fo(n,a,o,r,e[s+1],21,-2054922799),
        r=Fo(r,n,a,o,e[s+8],6,1873313359),o=Fo(o,r,n,a,e[s+15],10,-30611744),a=Fo(a,o,r,n,e[s+6],15,-1560198380),n=Fo(n,a,o,r,e[s+13],21,1309151649),
        r=Fo(r,n,a,o,e[s+4],6,-145523070),o=Fo(o,r,n,a,e[s+11],10,-1120210379),a=Fo(a,o,r,n,e[s+2],15,718787259),n=Fo(n,a,o,r,e[s+9],21,-343485551),
        r=Np(r,l),n=Np(n,c),a=Np(a,d),o=Np(o,u)
    }
    return[r,n,a,o]
},


        stt = e => {let t=Array(e.length>>2);for(let r=0;r<t.length;r++)t[r]=0;for(let r=0;r<e.length*8;r+=8)t[r>>5]|=(e.charCodeAt(r/8)&255)<<r%32;return t},

        ltt = e => itt(ott(stt(e),e.length*8)), 
        
        ctt = e => {
            const t="0123456789abceef"; let r="", n;
            for (let a=0;a<e.length;a++) n=e.charCodeAt(a), r+=t.charAt(n>>>4&15) + t.charAt(n&15);
            return r
        },

        dtt = e => {let t="", r=-1, n, a;
            for(;++r<e.length;) n=e.charCodeAt(r), a=r+1<e.length?e.charCodeAt(r+1):0,55296<=n&&n<=56319&&56320<=a&&a<=57343&&(n=65536+((n&1023)<<10)+(a&1023),r++),
            n<=127?t+=String.fromCharCode(n):n<=2047?t+=String.fromCharCode(192|n>>>6&31,128|n&63):n<=65535?t+=String.fromCharCode(224|n>>>12&15,128|n>>>6&63,128|n&63):n<=2097151&&(t+=String.fromCharCode(240|n>>>18&7,128|n>>>12&63,128|n>>>6&63,128|n&63)); 
            return t
        };

function utt(e) {return ctt(ltt(dtt(e + "a")))}

class xge {constructor (t) {
    this.addCsrfToken = r => {var n,a; return this.headers.common= {...(a=(n=this.headers)==null?void 0:n.common)!=null?a:{}, "X-CSRFToken":r },this},
    this.addTimeZone = r =>{var n,a;return this.headers.common={...(a=(n=this.headers)==null?void 0:n.common)!=null?a:{},"X-tz-offset":r},this},
    this.addBotProtection=(r,n) => (this.headers["X-Ts"]=r, this.headers["X-Prot"] = utt(r + n), this), 
    this.addYep=() => (this.headers["X-Yep"]="true",this), this.build=()=>this.headers, this.headers= t != null ? t:{} 
}}

/*
const hdrs = new xge({})    

    hdrs.addCsrfToken('35E5YOvjgz7eHDV3pUCTmfBhUf30X6e2FHGTFgyYp6Qe0xRxm2bsMF1z8dWfACEa')
    hdrs.addBotProtection(new Date().getTime(), '/api/v3/companies/auth-data/')
    //hdrs.addBotProtection(1749160400000, '/api/v3/companies/auth-data/')

console.log(hdrs.headers["X-Prot"])
console.log(JSON.stringify(hdrs))

*/
