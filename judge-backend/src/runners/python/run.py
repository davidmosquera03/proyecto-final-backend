# run.py
import sys, subprocess, os, tempfile, json, time

def main():
    code = os.environ.get("CODE","")
    timeout_s = float(os.environ.get("TIMEOUT", "5"))  # segundos
    stdin_data = sys.stdin.read()

    with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as f:
        f.write(code.encode())
        f.flush()

        start = time.time()
        try:
            output = subprocess.check_output(
                ["python", f.name],
                input=stdin_data.encode(),
                stderr=subprocess.STDOUT,
                timeout=timeout_s
            ).decode()
            duration_ms = int((time.time() - start) * 1000)
            print(json.dumps({"success": True, "output": output, "timeMs": duration_ms}))
        except subprocess.CalledProcessError as e:
            print(json.dumps({"success": False, "error": e.output.decode()}))
        except subprocess.TimeoutExpired:
            print(json.dumps({"success": False, "error": "Timeout"}))

if __name__ == "__main__":
    main()
