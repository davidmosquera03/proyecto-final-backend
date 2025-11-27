#!/bin/sh

# Decode JS code
echo "$CODE_B64" | base64 -d > /tmp/script.js

# ---- timing start ----
start=$(date +%s%3N)

OUT=$(timeout "$TIMEOUT" node /tmp/script.js 2>&1)
EXIT_CODE=$?

end=$(date +%s%3N)
time_ms=$((end - start))
# ---- timing end ----

# Timeout
if [ $EXIT_CODE -eq 124 ]; then
    echo "{\"success\": false, \"error\": \"Timeout\", \"timeMs\": $time_ms}"
    exit 0
fi

# Runtime error
if [ $EXIT_CODE -ne 0 ]; then
    ESCAPED=$(printf '%s' "$OUT" | sed 's/"/\\"/g' | sed 's/\\/\\\\/g')
    echo "{\"success\": false, \"error\": \"$ESCAPED\", \"timeMs\": $time_ms}"
    exit 0
fi

# Success
ESCAPED=$(printf '%s' "$OUT" | sed 's/"/\\"/g' | sed 's/\\/\\\\/g')
echo "{\"success\": true, \"output\": \"$ESCAPED\", \"timeMs\": $time_ms}"
