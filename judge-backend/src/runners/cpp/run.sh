#!/bin/sh

echo "$CODE_B64" | base64 -d > /tmp/code.cpp

g++ -std=c++17 /tmp/code.cpp -o /tmp/program 2>/tmp/compile_err
if [ $? -ne 0 ]; then
    err=$(sed 's/"/\\"/g' /tmp/compile_err)
    echo "{\"success\": false, \"error\": \"Compilation error: $err\"}"
    exit 0
fi

chmod +x /tmp/program

# ---- timing start ----
start=$(date +%s%3N)

output=$(timeout "$TIMEOUT" /tmp/program 2>&1)
status=$?

end=$(date +%s%3N)
time_ms=$((end - start))
# ---- timing end ----

if [ $status -eq 124 ]; then
    echo "{\"success\": false, \"error\": \"Timeout\", \"timeMs\": $time_ms}"
    exit 0
fi

escaped_output=$(printf "%s" "$output" | sed 's/"/\\"/g')

echo "{\"success\": true, \"output\": \"$escaped_output\", \"timeMs\": $time_ms}"
