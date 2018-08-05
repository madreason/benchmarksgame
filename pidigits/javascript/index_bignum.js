(function main() {
    const bignum = require('bignum');
    
    let n = +process.argv[2] || 10000,
        i = 0,
        k = 0,
        acc = bignum(0),
        den = bignum(1),
        num = bignum(1);

    const chr_0 = "0".charCodeAt(),
        chr_t = "\t".charCodeAt(),
        chr_n = "\n".charCodeAt(),
        chr_c = ":".charCodeAt();

    // preallocated buffer size
    let bufsize = (10/*value of pi*/ + 2/*\t:*/ + n.toString().length/*index of slice*/ + 1/*\n*/) * (n / 10)/*line count*/;
    // croped buffer size
    for (let i = 10, ii = 10 ** (Math.log10(n) >>> 0); i < ii; i *= 10) {
        bufsize -= i - 1;
    }

    let buf = Buffer.allocUnsafe(bufsize),
        bufoffs = 0;

    while (i < n) {
        k++;

        //#region nextTerm(k)
        let k2 = (k << 2) + 1;
        acc = acc.add(num.shiftLeft(1));
        acc = acc.mul(k2);
        den = den.mul(k2);
        num = num.mul(k);
        //#endregion

        if (num > acc) continue;

        //#region extractDigit(3);
        let tmp = num.mul(3).add(acc);
        let d3 = tmp.div(den);
        //#endregion

        //#region extractDigit(4);
        tmp = tmp.add(num);
        let d4 = tmp.div(den);
        //#endregion

        if (d3.cmp(d4) !== 0) continue;

        buf.writeInt8(d3.toNumber() + chr_0, bufoffs++);

        if (++i % 10 === 0) {
            buf.writeInt8(chr_t, bufoffs++);
            buf.writeInt8(chr_c, bufoffs++);

            let str = i.toString();
            buf.write(str, bufoffs, bufoffs += str.length);

            buf.writeInt8(chr_n, bufoffs++);
        }

        //#region eliminateDigit(d)
        acc = acc.sub(den.mul(d3));
        acc = acc.mul(10);
        num = num.mul(10);
        //#endregion
    }

    process.stdout.write(buf);
})();
