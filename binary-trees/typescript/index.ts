/**
 * based on Isaac Gouy typescript program
 * contributed by madreason
 * *reset*
 */

declare var process: {
  argv: string[];
}

interface ITreeNode {
  left?: ITreeNode;
  right?: ITreeNode;
}

function check(item: ITreeNode): number {
  let { left, right } = item;
  return left ? 1 + check(left) + check(right) : 1;
}

function bottomUpTree(depth: number): ITreeNode {
  return depth > 0 ? { left: bottomUpTree(depth - 1), right: bottomUpTree(depth - 1) } : {};
}

const n = +process.argv[2];
const minDepth = 4;
const maxDepth = Math.max(minDepth + 2, n);
const stretchDepth = maxDepth + 1;
const frontDepth = maxDepth + minDepth;

let checkSum = check(bottomUpTree(stretchDepth));
console.log("stretch tree of depth " + stretchDepth + "\t check: " + checkSum);

const longLivedTree = bottomUpTree(maxDepth);
for (let depth = minDepth; depth <= maxDepth; depth += 2) {
  let iterations = 1 << (frontDepth - depth);

  checkSum = 0;
  for (let i = 1; i <= iterations; i++) {
    checkSum += check(bottomUpTree(depth));
  }
  console.log(iterations + "\t trees of depth " + depth + "\t check: " + checkSum);
}
console.log("long lived tree of depth " + maxDepth + "\t check: " + check(longLivedTree));
