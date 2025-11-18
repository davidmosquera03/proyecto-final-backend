#!/bin/sh
TIMEOUT=${TIMEOUT:-5}

echo "$CODE_B64" | base64 -d > /app/Main.java

javac /app/Main.java 2>&1
if [ $? -ne 0 ]; then
  echo '{"success": false, "error": "Compilation failed", "output": ""}'
  exit 0
fi

OUT=$(timeout "$TIMEOUT" java -cp /app Main 2>&1)
EXIT=$?

if [ $EXIT -eq 124 ]; then
  echo '{"success": false, "error": "Timeout", "output": ""}'
  exit 0
fi

if [ $EXIT -ne 0 ]; then
  ERR=$(echo "$OUT" | sed 's/"/\\"/g' | tr '\n' ' ')
  echo "{\"success\": false, \"error\": \"$ERR\", \"output\": \"\"}"
  exit 0
fi

ESC=$(echo "$OUT" | sed 's/"/\\"/g')
echo "{\"success\": true, \"output\": \"$ESC\"}"