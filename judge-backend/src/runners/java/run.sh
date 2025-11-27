#!/bin/sh
TIMEOUT=${TIMEOUT:-5}

echo "$CODE_B64" | base64 -d > /app/Main.java

# Compile
javac /app/Main.java 2>&1
if [ $? -ne 0 ]; then
  echo '{"success": false, "error": "Compilation failed"}'
  exit 0
fi

# ---- portable timing start ----
# Run with timeout + measure real time using /usr/bin/time
/usr/bin/time -f "%e" -o /tmp/time.txt timeout "$TIMEOUT" java -cp /app Main  > /tmp/out.txt 2>&1
STATUS=$?
time_s=$(cat /tmp/time.txt)
time_ms=$(printf "%.0f" "$(echo "$time_s * 1000" | bc)")
OUT=$(cat /tmp/out.txt)
# ---- portable timing end ----

# Timeout
if [ $STATUS -eq 124 ]; then
  echo "{\"success\": false, \"error\": \"Timeout\", \"timeMs\": $time_ms}"
  exit 0
fi

# Runtime error
if [ $STATUS -ne 0 ]; then
  ERR=$(printf "%s" "$OUT" | sed 's/"/\\"/g')
  echo "{\"success\": false, \"error\": \"$ERR\", \"timeMs\": $time_ms}"
  exit 0
fi

# Success
ESCAPED_OUT=$(printf "%s" "$OUT" | sed 's/"/\\"/g')
echo "{\"success\": true, \"output\": \"$ESCAPED_OUT\", \"timeMs\": $time_ms}"
