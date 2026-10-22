#!/bin/sh
# Starts Surah Lessons on this computer and opens it in your browser.
cd "$(dirname "$0")" || exit 1
PORT=8765
URL="http://localhost:$PORT"
if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 was not found. You can still open index.html by double-clicking it."
  exit 1
fi
echo "Surah Lessons is running at $URL"
echo "Sign in with the username and password you were given."
echo "Press Ctrl+C in this window to stop."
( sleep 1; (open "$URL" || xdg-open "$URL") >/dev/null 2>&1 ) &
python3 -m http.server "$PORT"
