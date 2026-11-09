---
name: dlp-wiki-update
description: Use when writing or changing a page of the NextDLP customer wiki (dlp-wiki), release notes included, or when a product change makes a wiki page wrong
---

# dlp-wiki-update

## Overview

The wiki is read by customers and deploys on every push to `main`. A page convinces by being clear
and honest; every claim matches the code; nothing is pushed before the user has seen the
before/after (gate G4). An earlier "push luôn" does not pass G4.

## Rules

- **Terms:** "tệp", not "file" (except inside quoted speech); khóa, hóa, tùy, xóa, số hóa; "hạn mức
  bộ nhớ"; "đăng ký" (not enroll); "điều kiện … được đánh giá"; roles "Quản trị hệ thống" and
  "Quản lý đơn vị" (never "quản trị viên"); Console strings exactly as in the product.
- **Never on the wiki:** measured performance (timings, "nhanh gấp N lần", RAM peaks, test counts;
  resource requirements on the specs page are allowed); AI model or runtime names (say "mô hình ngôn
  ngữ đa ngữ", "bộ nhận dạng chữ", "mô hình thị giác máy tính", "mô hình ngôn ngữ cỡ nhỏ trên
  server"); third-party library names (say "bộ chuyển đổi"); internal paths, branches, bug numbers,
  customer names.
- **Form:** short prose paragraphs, titled steps (a title and one sentence), feature cards, tables
  only for reference data, few callouts, "Đọc tiếp" links. No page made of bullet lists.

## Writing guide

Open with the customer's problem and what the feature does for them, then how to use it. One
concrete scenario per feature (e.g. "bản vẽ điện của một đơn vị điện lực bị gửi ra ngoài"). Short
active sentences, one idea per paragraph. State limits plainly ("Nhãn chưa được ghi vào tệp .dwg")
and never overstate. Match the voice of two or three pages the user names; ask once, and until then
follow `docs/getting-started`.

## Steps

1. Find the affected pages: grep `docs/` and `blog/` for the feature's terms.
2. Check what is released: the change is on `main` of its repo; release notes name the version.
3. Edit.
4. Check every claim against the code: each sentence that states behaviour gets a `file:line` in the
   task's `status.md` or report (never on the wiki). A claim you cannot find is removed or asked about.
5. Grep the changed files for what must not be there: `\bfile\b`, model or runtime names (MiniLM,
   Granite, Tesseract, YOLO, Qwen, Ollama, ONNX, LibreDWG), numbers with ms, s, MB, %, lần.
6. Reader pass: a `general-purpose` subagent playing an IT administrator at a Vietnamese company
   reads the changed pages and lists what is unclear or unconvincing; fix each item.
7. `npm run build` passes.
8. G4: send the before/after of every changed paragraph and wait for the reply.
9. After the reply: commit on `main`, push, watch the deploy run to green (an empty commit re-triggers
   an infrastructure failure).

## Red flags

| Thought | Reality |
|---|---|
| "The user said push, so I'll push after the build" | G4 first: before/after, then the reply. |
| "3x faster is a selling point" | No measured performance on the wiki. |
| "Quản trị viên is clearer" | The role is "Quản trị hệ thống". |
| "Naming the library shows we're open" | Describe it by role. |
| "The feature works, no need to read the code" | Every claim gets its `file:line`. |
