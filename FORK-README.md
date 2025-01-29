# MuPDF Fork

This fork mainly to rebuild mupdf with additional feature enabled (listed below). Modifications are done on the fly through a script to avoid changes to the code itself.

# Flags Enabled

Unless specified, the flags are not modified

| Flag | Value |
| --- | --- |
| DFZ_ENABLE_HTML | 1 |
| DFZ_ENABLE_EPUB | 1 |

# How to build

```bash
export NODE_AUTH_TOKEN=your-token
export EMSDK_DIR=/your/emsdk/path
./build-with-ext.sh
```