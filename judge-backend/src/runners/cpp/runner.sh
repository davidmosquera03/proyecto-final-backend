#!/bin/sh
CODE="$CODE"
echo "$CODE" > /tmp/code.cpp

g++ -o /tmp/program /tmp/code.cpp -std=c++17 2>&1
if [ $? -ne 0 ]; then
    echo '{"success": false, "error": "Compilation error"}'
    exit 0
fi

timeout 5 /tmp/program 2>&1
if [ $? -eq 124 ]; then
    echo '{"success": false, "error": "Timeout"}'
else
    echo '{"success": true, "output": "'"$(timeout 5 /tmp/program 2>&1 | sed 's/"/\\"/g')"'"}'
fi