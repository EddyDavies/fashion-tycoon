#!/bin/bash
INPUT=$(cat 2>/dev/null || echo '{}')
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // ""' 2>/dev/null || echo "")

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
WORK_LOG="$REPO_ROOT/.claude/work-log.md"
LAST_FETCH_FILE="$REPO_ROOT/.claude/.last-fetch-${SESSION_ID:-default}"

NOW=$(date +%s)
LAST_FETCH=0
if [ -f "$LAST_FETCH_FILE" ]; then
  LAST_FETCH=$(cat "$LAST_FETCH_FILE" | tr -d '[:space:]')
fi

if [ $((NOW - LAST_FETCH)) -lt 60 ]; then
  exit 0
fi

git -C "$REPO_ROOT" fetch --quiet 2>/dev/null
echo "$NOW" > "$LAST_FETCH_FILE"

[ -f "$WORK_LOG" ] && [ -s "$WORK_LOG" ] || exit 0

RECENT=$(tail -5 "$WORK_LOG")
[ -n "$RECENT" ] || exit 0

jq -n --arg msg "[work-log] Recent commits from other instances:
$RECENT" '{"systemMessage": $msg}'
