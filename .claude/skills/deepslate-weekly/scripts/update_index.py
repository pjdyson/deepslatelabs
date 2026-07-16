#!/usr/bin/env python3
"""Insert (or update) a post entry in posts/index.json, newest-first.

Idempotent: an existing entry with the same --slug is replaced in place, so
re-running a weekly draft won't create duplicates. Validates JSON on the way in
and writes back with stable 2-space indentation to match the repo style.

Usage:
  python3 update_index.py --title T --slug S --file F.md --date YYYY-MM-DD \
      --category C --excerpt E [--index posts/index.json]
"""
import argparse
import json
import sys
from pathlib import Path

# repo root = three levels up from .claude/skills/deepslate-weekly/scripts/
DEFAULT_INDEX = Path(__file__).resolve().parents[4] / "posts" / "index.json"


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--title", required=True)
    p.add_argument("--slug", required=True)
    p.add_argument("--file", required=True, help="markdown filename, e.g. weekly-2026-07-16.md")
    p.add_argument("--date", required=True, help="YYYY-MM-DD")
    p.add_argument("--category", default="Weekly Radar")
    p.add_argument("--excerpt", required=True)
    p.add_argument("--index", default=str(DEFAULT_INDEX), help="path to posts/index.json")
    args = p.parse_args()

    index_path = Path(args.index)
    if not index_path.exists():
        print(f"error: index not found: {index_path}", file=sys.stderr)
        return 1

    try:
        data = json.loads(index_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        print(f"error: {index_path} is not valid JSON: {e}", file=sys.stderr)
        return 1

    posts = data.setdefault("posts", [])
    entry = {
        "title": args.title,
        "slug": args.slug,
        "file": args.file,
        "date": args.date,
        "category": args.category,
        "excerpt": args.excerpt,
    }

    # Replace any existing entry with the same slug, else it's new.
    posts = [q for q in posts if q.get("slug") != args.slug]
    posts.insert(0, entry)
    # Keep newest-first by date (stable; ties keep insertion order).
    posts.sort(key=lambda q: q.get("date", ""), reverse=True)
    data["posts"] = posts

    index_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"ok: wrote {args.slug} -> {index_path} ({len(posts)} posts)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
