/**
 * contributed by madreason
 * *reset*
 */

declare function require(val: string): any;
declare const process: any;

interface ITreeNode {
    left?: ITreeNode;
    right?: ITreeNode;
}

// doesn't work in worker
// class TreeNode implements ITreeNode {
//     constructor(public left?: TreeNode, public right?: TreeNode) { }
// }

function TreeNode(left?: ITreeNode, right?: ITreeNode): ITreeNode {
    return { left, right };
}

function check(item: ITreeNode): number {
    let { left, right } = item;
    return left ? 1 + check(left) + check(right) : 1;
}

function bottomUpTree(depth: number): ITreeNode {
    let nextDepth = depth - 1;
    return depth > 0 ? TreeNode(bottomUpTree(nextDepth), bottomUpTree(nextDepth)) : TreeNode();
}

function workerFunc() {
    // module with flag --experimental-worker from node 10.5.0
    const { parentPort, workerData } = require('worker_threads');

    parentPort.postMessage(checkTree(workerData.depth, workerData.frontDepth));

    function checkTree(depth: number, frontDepth: number): string {
        let iterations = 1 << (frontDepth - depth);
        let checkSum = 0;
        for (let i = 1; i <= iterations; i++) {
            checkSum += check(bottomUpTree(depth));
        }
        return iterations + "\t trees of depth " + depth + "\t check: " + checkSum;
    }
}

async function main(): Promise<void> {
    const C_N = +process.argv[2];
    const C_MINDEPTH = 4;
    const C_MAXDEPTH = Math.max(C_MINDEPTH + 2, C_N);
    const C_STRETCHDEPTH = C_MAXDEPTH + 1;
    const C_FRONTDEPTH = C_MAXDEPTH + C_MINDEPTH;
    const C_WORKERFUNC = TreeNode + "\n" + check + "\n" + bottomUpTree + "\n" + '(' + workerFunc + ')();';

    function createWorker(depth: number): Promise<string> {
        // module with flag --experimental-worker from node 10.5.0
        const { Worker } = require('worker_threads');
        return new Promise((resolve: (v: string) => void, reject: (v: string) => void) => {
            let worker = new Worker(C_WORKERFUNC, { eval: true, workerData: { depth: depth, frontDepth: C_FRONTDEPTH } });
            worker.on('message', (msg: string) => resolve(msg));
            worker.on('error', (err: string) => reject(err));
        });
    }

    console.log("stretch tree of depth " + C_STRETCHDEPTH + "\t check: " + check(bottomUpTree(C_STRETCHDEPTH)));
    let longLivedTree = bottomUpTree(C_MAXDEPTH);
    let stepCount = ((C_MAXDEPTH - C_MINDEPTH) >>> 1) + 1;
    let workers = new Array<Promise<string>>(stepCount);
    for (let i = 0; i < stepCount; i++) {
        workers[i] = createWorker(C_MINDEPTH + (i << 1));
    }
    for (let item of (await Promise.all(workers))) {
        console.log(item);
    }
    console.log("long lived tree of depth " + C_MAXDEPTH + "\t check: " + check(longLivedTree));
}

main().then(() => void 0, (err) => console.log(err));
