#!/bin/bash
INPUT=$(cat 2>/dev/null || echo '{}')
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // ""' 2>/dev/null || echo "")

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
WORK_LOG="$REPO_ROOT/.claude/work-log.md"
OPEN_PROBLEMS="$REPO_ROOT/docs/open-problems.md"
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

MSG=""

# Work-log: recent commits from other instances
if [ -f "$WORK_LOG" ] && [ -s "$WORK_LOG" ]; then
  RECENT=$(tail -5 "$WORK_LOG")
  [ -n "$RECENT" ] && MSG="[work-log] Recent commits:\n$RECENT"
fi

# Open problems: titles of anything not marked [SOLVED]
if [ -f "$OPEN_PROBLEMS" ]; then
  OPEN_TITLES=$(grep "^## " "$OPEN_PROBLEMS" | grep -v "\[SOLVED\]" | sed 's/^## /· /' | head -10)
  if [ -n "$OPEN_TITLES" ]; then
    COUNT=$(printf '%s\n' "$OPEN_TITLES" | grep -c .)
    PROBLEMS_MSG="[open-problems] $COUNT unsolved — read docs/open-problems.md before touching SVG, PDF, or BOM:\n$OPEN_TITLES"
    if [ -n "$MSG" ]; then
      MSG="$MSG\n\n$PROBLEMS_MSG"
    else
      MSG="$PROBLEMS_MSG"
    fi
  fi
fi

[ -z "$MSG" ] && exit 0

jq -n --arg msg "$MSG" '{"systemMessage": $msg}'
