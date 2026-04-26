#!/bin/bash
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
WORK_LOG="$REPO_ROOT/.claude/work-log.md"
BRANCH=$(git -C "$REPO_ROOT" branch --show-current 2>/dev/null || echo "unknown")
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
MSG=$(git -C "$REPO_ROOT" log -1 --pretty=format:"%s" 2>/dev/null || echo "")
[ -n "$MSG" ] && echo "$TIMESTAMP | $BRANCH | $MSG" >> "$WORK_LOG"
