#!/bin/sh

# Decode Base64
echo "$CODE_B64" | base64 -d > /tmp/code.cpp

# Compile
g++ -std=c++17 /tmp/code.cpp -o /tmp/program 2>/tmp/compile_err
if [ $? -ne 0 ]; then
    err=$(cat /tmp/compile_err | sed 's/"/\\"/g')
    echo "{\"success\": false, \"error\": \"Compilation error: $err\"}"
    exit 0
fi

# FIX: give execution permissions
chmod +x /tmp/program

# Run with timeout
output=$(timeout "$TIMEOUT" /tmp/program 2>&1)
status=$?

if [ $status -eq 124 ]; then
    echo '{"success": false, "error": "Timeout"}'
    exit 0
fi

escaped_output=$(printf "%s" "$output" | sed 's/"/\\"/g')
echo "{\"success\": true, \"output\": \"$escaped_output\"}"
