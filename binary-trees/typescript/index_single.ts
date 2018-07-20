/**
 * based on Isaac Gouy typescript program
 * contributed by madreason
 * *reset*
 */

declare var process: {
  argv: string[];
}

class TreeNode {
    constructor(public left?: TreeNode, public right?: TreeNode) { }
}

// function TreeNode(left, right) {
//     return {left: left, right: right};
// }

function check(item: TreeNode): number {
    let { left, right } = item;
    return left ? 1 + check(left) + check(right) : 1;
}

function bottomUpTree(depth: number): TreeNode {
    let nextDepth = depth - 1;
    return depth > 0 ? new TreeNode(bottomUpTree(nextDepth), bottomUpTree(nextDepth)) : new TreeNode();
}

function main(): void {
    const C_N = +process.argv[2] || 21;
    const C_MINDEPTH = 4;
    const C_MAXDEPTH = Math.max(C_MINDEPTH + 2, C_N);
    const C_STRETCHDEPTH = C_MAXDEPTH + 1;
    const C_FRONTDEPTH = C_MAXDEPTH + C_MINDEPTH;

    console.log("stretch tree of depth " + C_STRETCHDEPTH + "\t check: " + check(bottomUpTree(C_STRETCHDEPTH)));
    const longLivedTree = bottomUpTree(C_MAXDEPTH);
    for (let depth = C_MINDEPTH, checkSum = 0; depth <= C_MAXDEPTH; depth += 2) {
        const iterations = 1 << (C_FRONTDEPTH - depth);
        for (let i = 1; i <= iterations; i++) {
            checkSum += check(bottomUpTree(depth));
        }
        console.log(iterations + "\t trees of depth " + depth + "\t check: " + checkSum);
    }
    console.log("long lived tree of depth " + C_MAXDEPTH + "\t check: " + check(longLivedTree));
}

main();
