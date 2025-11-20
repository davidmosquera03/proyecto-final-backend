#!/bin/sh

# Decode the base64 code into script.js
echo "$CODE_B64" | base64 -d > /tmp/script.js

# Run with timeout and capture output
OUT=$(timeout "$TIMEOUT" node /tmp/script.js 2>&1)
EXIT_CODE=$?

# Timeout error
if [ $EXIT_CODE -eq 124 ]; then
    echo '{"success": false, "error": "Timeout", "output": ""}'
    exit 0
fi

# Runtime error
if [ $EXIT_CODE -ne 0 ]; then
    ESCAPED=$(printf '%s' "$OUT" | sed 's/"/\\"/g' | sed 's/\\/\\\\/g')
    echo "{\"success\": false, \"error\": \"Runtime error\", \"output\": \"$ESCAPED\"}"
    exit 0
fi

# Success
ESCAPED=$(printf '%s' "$OUT" | sed 's/"/\\"/g' | sed 's/\\/\\\\/g')
echo "{\"success\": true, \"output\": \"$ESCAPED\"}"