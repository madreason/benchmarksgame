# index.ts

### MAKE:
mv mandelbrot.typescript mandelbrot.ts

/opt/src/node-v10.5.0-linux-x64/bin/tsc --alwaysStrict --removeComments -t ESNEXT mandelbrot.ts

### COMMAND LINE:
/opt/src/node-v10.5.0-linux-x64/bin/node --use_strict --experimental-worker mandelbrot.js 16000
