import sys, subprocess, os, tempfile, json

def main():
    code = os.environ["CODE"]
    with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as f:
        f.write(code.encode())
        f.flush()
        try:
            output = subprocess.check_output(
                ["python", f.name],
                stderr=subprocess.STDOUT,
                timeout=5
            ).decode()
            print(json.dumps({"success": True, "output": output}))
        except subprocess.CalledProcessError as e:
            print(json.dumps({"success": False, "error": e.output.decode()}))
        except subprocess.TimeoutExpired:
            print(json.dumps({"success": False, "error": "Timeout"}))

if __name__ == "__main__":
    main()