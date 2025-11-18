#!/bin/sh

# Decode the base64 code into Main.java
echo "$CODE_B64" | base64 -d > /tmp/Main.java

# Compile
javac /tmp/Main.java 2>&1
if [ $? -ne 0 ]; then
    echo '{"success": false, "error": "Compilation error"}'
    exit 0
fi

# Run with timeout and capture output
OUT=$(timeout "$TIMEOUT" java -cp /tmp Main 2>&1)
EXIT_CODE=$?

# Timeout error
if [ $EXIT_CODE -eq 124 ]; then
    echo '{"success": false, "error": "Timeout"}'
    exit 0
fi

# Runtime error
if [ $EXIT_CODE -ne 0 ]; then
    ESCAPED=$(printf '%s' "$OUT" | sed 's/"/\\"/g')
    echo "{\"success\": false, \"error\": \"$ESCAPED\"}"
    exit 0
fi

# Success
ESCAPED=$(printf '%s' "$OUT" | sed 's/"/\\"/g')
echo "{\"success\": true, \"output\": \"$ESCAPED\"}"
