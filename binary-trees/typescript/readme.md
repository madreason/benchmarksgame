# index.ts

### MAKE:
mv binarytrees.typescript binarytrees.ts
/opt/src/node-v10.5.0-linux-x64/bin/tsc --alwaysStrict --removeComments -t ESNEXT binarytrees.ts

### COMMAND LINE:
/opt/src/node-v10.5.0-linux-x64/bin/node --use_strict binarytrees.js 21

# index_multi.ts

### MAKE:
mv binarytrees.typescript binarytrees.ts
/opt/src/node-v10.5.0-linux-x64/bin/tsc --alwaysStrict --removeComments -t ESNEXT binarytrees.ts

### COMMAND LINE:
/opt/src/node-v10.5.0-linux-x64/bin/node --use_strict --experimental-worker binarytrees.js 21
