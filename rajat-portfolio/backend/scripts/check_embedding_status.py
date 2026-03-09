import argparse
import json
from urllib import parse, request


def main() -> int:
    parser = argparse.ArgumentParser(description="Check backend embedding provider status.")
    parser.add_argument(
        "--base-url",
        default="http://localhost:8000",
        help="Backend base URL, e.g. http://localhost:8000 or https://rajat-khandelwal.fly.dev",
    )
    parser.add_argument(
        "--probe",
        default="Who is Rajat Khandelwal?",
        help="Probe text used to test query embedding generation.",
    )
    args = parser.parse_args()

    encoded_probe = parse.quote(args.probe)
    url = f"{args.base_url.rstrip('/')}/api/chat/embedding-status?probe={encoded_probe}"
    with request.urlopen(url, timeout=30) as response:
        payload = json.loads(response.read().decode("utf-8"))

    print(json.dumps(payload, indent=2))

    has_errors = bool(payload.get("initialization_error") or payload.get("probe_error"))
    has_vector = bool(payload.get("probe_vector_dimension"))
    if has_errors or not has_vector:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
