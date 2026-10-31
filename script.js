// =========================================================
// George Jameson Obed — website interactions
// Each numbered part below is one feature of the site.
// =========================================================

const root = document.documentElement;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
};

// ---------------------------------------------------------
// 1. LANGUAGES
//    English text lives in index.html. All other languages live in
//    translations.js. The menu below switches between them.
// ---------------------------------------------------------
const LANGS = [
  { code: "en", label: "English",   short: "EN", flag: "gb", html: "en" },
  { code: "sw", label: "Kiswahili", short: "SW", flag: "tz", html: "sw" },
  { code: "ar", label: "العربية",    short: "AR", flag: "sa", html: "ar", rtl: true },
  { code: "fr", label: "Français",  short: "FR", flag: "fr", html: "fr" },
  { code: "zh", label: "中文",       short: "中文", flag: "cn", html: "zh-CN" },
  { code: "pt", label: "Português", short: "PT", flag: "pt", html: "pt-PT" }
];
// Flag pictures are built into the code (no separate image files needed)
const FLAGS = {"gb": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWdiIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iIzAxMjE2OSIgZD0iTTAgMGg2NDB2NDgwSDB6Ii8+CiAgPHBhdGggZmlsbD0iI0ZGRiIgZD0ibTc1IDAgMjQ0IDE4MUw1NjIgMGg3OHY2Mkw0MDAgMjQxbDI0MCAxNzh2NjFoLTgwTDMyMCAzMDEgODEgNDgwSDB2LTYwbDIzOS0xNzhMMCA2NFYweiIvPgogIDxwYXRoIGZpbGw9IiNDODEwMkUiIGQ9Im00MjQgMjgxIDIxNiAxNTl2NDBMMzY5IDI4MXptLTE4NCAyMCA2IDM1TDU0IDQ4MEgwek02NDAgMHYzTDM5MSAxOTFsMi00NEw1OTAgMHpNMCAwbDIzOSAxNzZoLTYwTDAgNDJ6Ii8+CiAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTTI0MSAwdjQ4MGgxNjBWMHpNMCAxNjB2MTYwaDY0MFYxNjB6Ii8+CiAgPHBhdGggZmlsbD0iI0M4MTAyRSIgZD0iTTAgMTkzdjk2aDY0MHYtOTZ6TTI3MyAwdjQ4MGg5NlYweiIvPgo8L3N2Zz4K", "tz": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLXR6IiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPGRlZnM+CiAgICA8Y2xpcFBhdGggaWQ9InR6LWEiPgogICAgICA8cGF0aCBmaWxsLW9wYWNpdHk9Ii43IiBkPSJNMTAgMGgxNjB2MTIwSDEweiIvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+CiAgPGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utd2lkdGg9IjFwdCIgY2xpcC1wYXRoPSJ1cmwoI3R6LWEpIiB0cmFuc2Zvcm09Im1hdHJpeCg0IDAgMCA0IC00MCAwKSI+CiAgICA8cGF0aCBmaWxsPSIjMDlmIiBkPSJNMCAwaDE4MHYxMjBIMHoiLz4KICAgIDxwYXRoIGZpbGw9IiMwOTAiIGQ9Ik0wIDBoMTgwTDAgMTIweiIvPgogICAgPHBhdGggZmlsbD0iIzAwMDAwMSIgZD0iTTAgMTIwaDQwbDE0MC05NVYwaC00MEwwIDk1eiIvPgogICAgPHBhdGggZmlsbD0iI2ZmMCIgZD0iTTAgOTEuNSAxMzcuMiAwaDEzLjVMMCAxMDAuNXpNMjkuMyAxMjAgMTgwIDE5LjV2OUw0Mi44IDEyMHoiLz4KICA8L2c+Cjwvc3ZnPgo=", "sa": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLXNhIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPGRlZnM+CiAgICA8Y2xpcFBhdGggaWQ9InNhLWEiPgogICAgICA8cGF0aCBmaWxsLW9wYWNpdHk9Ii43IiBkPSJNLTg1LjMgMGg2ODIuNnY1MTJILTg1LjN6Ii8+CiAgICA8L2NsaXBQYXRoPgogIDwvZGVmcz4KICA8ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcGF0aD0idXJsKCNzYS1hKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODApc2NhbGUoLjkzNzUpIj4KICAgIDxwYXRoIGZpbGw9IiMxNjVkMzEiIGQ9Ik0tMTI4IDBoNzY4djUxMmgtNzY4eiIvPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTY1LjUgMTQ1LjFjLS44IDEyLTIgMzMgOC4zIDM1LjIgMTIuMyAxLjIgNS41LTIwLjggMTAtMjQuOC44LTIgMi4zLTIgMi40LjV2MTguN2MwIDYgNCA3LjggNyA5IDMuMi0uMiA1LjQgMCA2LjYgM2wxLjYgMzIuM3M3LjQgMi4yIDcuOC0xOC4xYy4zLTEyLTIuNC0yMS45LS44LTI0LjIgMC0yLjMgMy0yLjQgNS0xLjMgMy4yIDIuMiA0LjYgNSA5LjYgNCA3LjYtMi4yIDEyLjItNS45IDEyLjMtMTEuN2E0NyA0NyAwIDAgMC0zLjUtMTYuNmMuNC0xLTEuNC0zLjctMS00LjcgMS4zIDIuMiAzLjQgMiAzLjggMC0xLjMtNC4yLTMuMy04LjMtNi41LTEwLTIuNy0yLjQtNi43LTItOCAzLS44IDUuNyAyIDEyLjQgNi4xIDE4IC45IDIuMSAyLjEgNS43IDEuNiA4LjktMi4yIDEuMy00LjQuNy02LjMtMS4yIDAgMC02LTQuNS02LTUuNiAxLjYtMTAuMi4zLTExLjQtLjYtMTQuMy0uNi0zLjktMi41LTUuMi00LTcuOC0xLjUtMS42LTMuNS0xLjYtNC41IDAtMi43IDQuNi0xLjQgMTQuNS41IDE5IDEuNCA0LjEgMy41IDYuNyAyLjUgNi43LS44IDIuMy0yLjUgMS43LTMuOC0xYTY2LjYgNjYuNiAwIDAgMS0yLjEtMTcuNGMtLjUtNC42LTEuMS0xNC40LTQuMi0xNy0xLjgtMi40LTQuNS0xLjItNS41IDFhODIuNCA4Mi40IDAgMCAwIC4zIDEzLjRjMiA3LjQgMi43IDE0IDMuNyAyMS41LjMgMTAuMS01LjggNC40LTUuNS0uN2E0NSA0NSAwIDAgMC0uMy0xOS40Yy0xLTIuNi0yLjEtMy4yLTQuNi0yLjgtMS45IDAtNi44IDUuMy04LjIgMTQuMyAwIDAtMS4yIDQuNi0xLjcgOC43LS43IDQuNi0zLjcgOC01LjktLjYtMS44LTYuMy0zLTIxLjYtNi0xOHoiLz4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Im05OSAxOTQuMi0zMiAxNS40Yy4zLTcuMyAxNS4xLTIwLjQgMjUuMy0yMC41IDYuNS4xIDQuOSAyLjUgNi42IDUuMXoiLz4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik05My4zIDIwNC4yYy0xNi44IDQzLjUgMzkuNSA0OS42IDQ1LjggMS44LjYtMiAzLTMuOSAzLjQtLjctMS4zIDQzLjMtNDMuNiA0Ni4yLTUwLjggMzIuNmE0MS45IDQxLjkgMCAwIDEtMi41LTE0LjZjLTEtOC41LTUuNS01LjItNi4yIDMuMi0uNyA0LjctLjUgNi0uNSAxMC41IDIuMiAzNC4yIDU2LjcgMTkuNSA2NS42LTguNyA0LjctMTUuNi0uOC0yNy4xIDEuNy0yNy4xIDUuNCA1LjggMTMgLjggMTQuNy0xLjIuNy0xIDIuNS0xLjcgMy43LS40IDQuMiAzIDExLjYgMS42IDEzLjItMy43LjktNS4zIDEuNi0xMC43IDEuOC0xNi4yLTMuNSAxLTYgMS43LTYuMyAzLjJsLS43IDQuNmMtLjMgMS41LTMuMiAxLjUtMy40LS40LTEuMy02LTYuNy02LjctMTAgMi41LTIuMSAxLjgtNi4xIDIuMi02LjUtLjUuNS02LjItMi03LTctNC4xbC00LjgtMzYuMmMyIDAgNCAxLjUgNS45LS45LTItNi41LTYuNS0xOS43LTktMjAuNy0xLjEtMS40LTIuMS0uNS0zLjctLjEtMi42LjgtNSAzLTQuMiA3LjQgMyAxOC44IDUgMzMuMSA4LjEgNTIgLjUgMi4xLTEuMyA1LTMuNyA0LjctNC0yLjctNS04LjItMTItOC01IDAtMTAuNiA1LjUtMTEuMyAxMC43LS45IDQuMi0xLjIgOC43IDAgMTIuMyAzLjUgNC4yIDcuNyAzLjggMTEuNCAyLjkgMy0xLjMgNS41LTQuMyA2LjYtMy42LjcuOS4xIDEwLjktMTQuMyAxOC41LTguNyA0LTE1LjcgNC44LTE5LjQtMi4zLTIuMy00LjUuMi0yMS40LTUuNi0xNy41Ii8+CiAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTY1IDE2MGMzLjMtMS4yIDE5LjMtMTkuNiAxOS4zLTE5LjZsLTIuNC0yYy0uOS0uNy0uOC0xLjUgMC0yLjIgNC0yLjQgMi43LTcuNC43LTkuOGE5LjcgOS43IDAgMCAwLTguNy4xYy0yLjggMi43LTMuNCA3LTEuMiA5LjYgMi4xIDEgNC4yIDMuMiAyLjggNC40LTYuNiA3LTI0LjUgMTkuMS0yMi40IDE5LjUuNC42IDExLjUuNiAxMS44IDB6bS05NyA2NWMtNiA5LjYtNi41IDIzLjktMy4yIDI4LjIgMS44IDIgNC43IDIuOSA2LjggMi4yIDMuOC0xLjYgNS41LTkuMyA0LjYtMTItMS4zLTItMi4zLTIuMy0zLjYtLjctMi42IDUuNC0zLjcgMS43LTQtMS4zYTcwIDcwIDAgMCAxIC44LTE1LjJjLjctNC4yIDAtMy0xLjQtMS4ybTI1Ny4xLTE1LjNjLTUuOC0xMi42LTEzLjktMjUtMTYuNC0yOS43YTU1Ny42IDU1Ny42IDAgMCAwLTI0LjgtMzZjLTYuMi03LjQgMTAuMiAzLjEtMi0xMS43bC04LjktNy41Yy0yLTEuNC02LjgtNC03LjYuMi0uNCAzLjgtLjIgNS44LjQgOC45LjUgMiAzLjUgNS41IDUgNy41YTU2NSA1NjUgMCAwIDEgNTMuOCA4Ni41YzIuNi0xLjMgMi0xNi4xLjUtMTguMiIvPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI5OS42IDI1MS41Yy0xLjIgMS4zIDIuOCA2LjggOCA2LjggOC42LTEgMTYuMi01LjggMjMuMi0xOC42YTMzIDMzIDAgMCAwIDUuMy0xNC4yIDMxNyAzMTcgMCAwIDAtNS44LTcyLjRjLS4zLTIgMC00LjQuMi01IC42LS43IDIuNSAwIDMuNS0xLjcgMS41LTEuNS00LTE0LTctMTguNy0xLTIuMi0xLjUtMy42LTMuMy4yYTI3IDI3IDAgMCAwLTMgMTMuNmM0LjEgMjguNSA1LjQgNTMuNCA4IDgxLjkuMyAyLjgtLjEgNi44LTIgOC40YTgwLjIgODAuMiAwIDAgMS0yNy4xIDE5LjdtMTE2LjUtLjFjLTYuMiAzLjYtNi4yIDcuNy0xLjIgNy44IDguNi0xIDE4LjgtMS43IDI1LjgtMTIuM2E0MSA0MSAwIDAgMCA0LjItMTYgMzAzIDMwMyAwIDAgMC00LjctNzEuNGMtLjItMi0xLjEtNi43LS44LTcuMy42LTEuNCAzLjQuMSA0LjQtMS41IDEuNC0xLjUtNy4zLTEyLjctMTAuNC0xNy41LTEtMi4yLTEuNC0zLjYtMy4zLjJhMjIuMyAyMi4zIDAgMCAwLTEuOCAxMy42YzQuNiAzMSA4IDU0LjIgOC43IDgxLjYtLjQgMi42LS41IDQtMS43IDcuMy0yLjcgMy40LTUuNyA3LjgtOC41IDkuOS0yLjggMi04LjggNC0xMC43IDUuNiIvPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQyMC43IDIyMy43YzAtNy4zLjEtMTMuNS0uMS0xOWEzNCAzNCAwIDAgMC0zLTEzLjVjLTEuOC00LjEtLjctNy40LTEuNi0xMS44LS44LTQuNC0uNi0xMS0xLjgtMTYuMS0uNC0yLTEuNC04LjUtMS4xLTkuMi41LTEuNCAyLjQgMCAzLjQtMS42IDEuNC0xLjUtNS0xOC04LjItMjIuNy0xLjEtMi4xLTMuMy0xLjQtNS44IDItMi41IDIuMy0xLjYgNy40LS42IDEyLjMgNi4xIDMyLjMgMTAuOCA2MS42IDkuOCA5Mi4zLS40IDIuNiA5LTcuOCA5LTEyLjdtLTQ1LjctNDBjLTMuOS0uMi0xMi03LjctMTQuNC0xMmE4IDggMCAwIDEgLjQtNi41YzEuNS0xIDMuNy0yIDUuNC0xIDAgMCAxLjcgMi40IDEuNCAyLjcgMiAxIDMgLjUgMy4yLS40LjEtMS41LS42LTIuNC0uNi00IC45LTQuNiA2LTUuMyA4LTIuNCAxLjQgMS44IDIgNS41IDIuMSA4IDAgMS4zLTItLjItMy4zIDAtMS4xLjQtMS40IDEuOC0xLjUgMy0uMiAzLjMtLjYgOC42LS43IDEyLjV6bS03MS44IDQ4YzEtOS44LS40LTI3LjMtLjUtMzMuMUE0NzcgNDc3IDAgMCAwIDI5OSAxNTRjLTEuMi04LjQgMy40LjkgMi44LTQtMS41LTguMy02LjEtMTQtMTEuNi0yMS41LTEuNy0yLjUtMS43LTMtNC40LjYtMyA2LjctLjQgMTEuNC40IDE2LjcgMy45IDE3LjIgNi4yIDMzIDcuMyA0OC43YTM5My40IDM5My40IDAgMCAxIC40IDQ5YzMgLjEgNy42LTQuNyA5LjMtMTEuOCIvPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQzNCAyMTZjLTYuOS0xMS42LTE3LjItMjQtMjAtMjguN2E2NTggNjU4IDAgMCAwLTI5LjItMzcuOGMtOC41LTkgNC0xLjUtMS42LTguNS00LjctNS4xLTYtNi44LTEwLjEtOS45LTItMS4zLTMuMi0zLjgtNCAuNWE4MyA4MyAwIDAgMC0uMiAxMS4yYzAgMS43IDEuOCA1IDMuNCA3IDIwLjcgMjUuNSA0My40IDUxLjUgNjEuNiA4NC4yIDIuNi0xLjMgMS43LTE2IDAtMTh6Ii8+CiAgICA8cGF0aCBmaWxsPSIjMTY1ZDMxIiBkPSJNMTIyLjYgMTk0LjdjLS41LjktMS42IDItMS4yIDMuMS43IDEgMS40IDEuMyAyLjYgMS4zIDEuMSAwIDIuNy4zIDMtLjMuNi0uNyAxLTIgLjYtMy4zLTEuMi0zLTQuNC0xLjgtNS0uOCIvPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTM1NC4yIDM2Mi41YzkuMi40IDE1LjIuNSAyMy4zIDEuNGw5LjYtMWMxMC42LTEgMTEgMTUuMSAxMSAxNS4xIDAgOS41LTMuNyAxMC04LjQgMTEtMi43LjQtNC0xLjYtNS41LTMuNmExNCAxNCAwIDAgMS03IC40Yy0zLjktLjItNy43LS4yLTExLjUtLjUtNC0uMy02LjIuNS0xMC4zLjEtLjggMS4zLTIgMy4xLTQuNCAyLjYtMi0uMy00LjUtNi0zLjgtMTAuNSAxLjUtMy4yIDEtMi4xIDEtMy41LTM3LjYtMS03NS41LTIuNy0xMTIuMy0yLjItMjguOC4xLTU3LjIgMS4zLTg1LjcgMi41LTE1LjItLjItMjYuOC0yLjYtMzQuOC0xNC4zLjggMCAzOC44IDIuMSA0OS45IDEuNCAyMC41LS4yIDM5LjMtMS45IDYwLjItMi41IDQxLjIuNyA4Mi4xLjcgMTIzLjMgMy42LTQtMi43LTQtOSAyLTEwLjYuNS0uNC44IDMuMSAxLjcgMyA0LjktLjMgMi43IDYuMyAxLjcgNy42TTE4OC42IDEzNS4zYy02LjIgMTcuOCAzLjYgMzcuNCAxMC40IDM1LjUgNSAyIDgtNy40IDEwLTE3LjYgMS41LTIuOSAyLjUtMy4yIDMuMi0xLjctLjIgMTMuNiAxIDE2LjcgNC41IDIwLjggNy44IDYgMTQuMy44IDE0LjguM2w2LTYuMWMxLjQtMS41IDMuMi0xLjUgNS4xLS4zIDEuOSAxLjcgMS42IDQuNiA1LjYgNi42IDMuNCAxLjQgMTAuNS40IDEyLjItMi41IDIuMi0zLjkgMi44LTUuMiAzLjgtNi42IDEuNi0yLjEgNC4zLTEuMiA0LjMtLjUtLjMgMS4yLTEuOSAyLjMtLjggNC41IDIgMS40IDIuNC41IDMuNS4yIDQtMiA3LTEwLjYgNy0xMC42LjEtMy4yLTEuNy0zLTIuOS0yLjJsLTMuMSAyLjFjLTIgLjMtNS43IDEuNi03LjYtMS4zLTEuOS0zLjQtMS45LTguMy0zLjMtMTEuOCAwLS4yLTIuNi01LjUtLjItNS44IDEuMi4yIDMuNy45IDQuMS0xLjIgMS4yLTIuMS0yLjYtOC01LjMtMTEtMi4zLTIuNS01LjUtMi44LTguNi0uMi0yLjIgMi0xLjkgNC4yLTIuMyA2LjNhOS44IDkuOCAwIDAgMCAyIDguN2MyLjIgNC4yIDYuMSA5LjcgNC44IDE3LjUgMCAwLTIuMyAzLjYtNi4zIDMuMS0xLjctLjMtNC40LTEtNS44LTExLjgtMS4xLTggLjItMTkuNC0zLjItMjQuNy0xLjMtMy4zLTIuMi02LjQtNS4yLS45LS44IDIuMi00LjMgNS41LTEuOCAxMi4yYTM2IDM2IDAgMCAxIDIgMTljLTEuNSAyLjItMS44IDIuOS0zLjcgNS0yLjYgMy01LjUgMi4yLTcuNyAxLjEtMi0xLjMtMy42LTItNC42LTYuNS4yLTcgLjYtMTguNS0uNy0yMC45LTEuOS0zLjgtNS0yLjQtNi4zLTEuMmE0Ny43IDQ3LjcgMCAwIDAtMTEuNSAyMy41Yy0xLjggNS44LTMuNyA0LjEtNSAxLjgtMy4yLTMtMy41LTI2LjctNy40LTIyLjgiLz4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMDcuNCAxNzQuMWMyLjktMiAxLjYtMy40IDUuOC44YTcyIDcyIDAgMCAxIDkuMiAzMS4zYy0uMiAyLjYgMS42IDQuMiAyLjUgMy42LjQtNiAxNS4xLTE0LjQgMjguNi0xNS42IDItLjUgMS00LjQgMS4zLTYuNC0uOC03LjUgNC4yLTE0LjMgMTEuMi0xNC44IDkuNiAxLjQgMTIuOCA2LjUgMTMgMTQuMi0xLjEgMTUtMTYuNyAxNy41LTI1LjQgMTguNy0xLjMuNS0xLjkgMS4xIDAgMS44bDM2LjYuMiAxLjkgMWMuMiAxLS42LjItMiAyLjZhMjkuNSAyOS41IDAgMCAwLTMuNyAxMS41Yy0xMC45IDMuNi0yMi4yIDUtMzMuNiA2LjUtNCAyLTYgNC43LTUuMiA3LjcgMS40IDMuMyAxMC4yIDYuNyAxMC4yIDYuOCAxLjcgMSAzLjYgMy41LS41IDguNi0xNy44LS44LTMxLjctOC40LTM2LjUtMTkuMS0xLjQtMS4xLTMgMC00IDEuNC03IDktMTMuOCAxNy0yNS43IDIxLjQtNyAxLjgtMTQuMy0xLjEtMTcuNy01LjctMi4zLTIuNy0yLjItNS42LTMtNi4yLTMuOSAxLjctMzYuOSAxNS43LTMyLjcgOS4xIDgtOC41IDIyLTE0LjkgMzQuMi0yMy4zLjktMi45IDIuNS0xMi41IDcuMy0xNS42LjMgMC0uNyA1LjYtLjYgOCAwIDItLjIgMi43LjIgMi4yLjktLjUgMTUuNy0xMi4yIDE3LTE1LjggMS40LTIgLjMtNy4yLjMtNy40LTIuOC03LjItNi43LTcuOC04LjEtMTEuNC0xLjMtNC43LS43LTEwLjEgMi0xMS43IDIuNC0yLjEgNS4yLTEuOSA3LjkuNSAzIDIuNyA1LjYgOCA2LjQgMTEuOS0uNSAxLjUtNC0xLTUtLjNhMTYgMTYgMCAwIDEgMy43IDcuOGMyIDguMiAxLjQgMTEuNC0uNiAxNi43LTYuNiAxMy45LTE1IDE4LTIyLjQgMjMuMi0uMiAwLS4zIDMuNSAyLjQgNS40IDEgMSA0LjkgMS41IDkuNCAwYTU0LjUgNTQuNSAwIDAgMCAyMi4zLTIzLjMgNTEgNTEgMCAwIDAtMi40LTIyLjJjLTIuOS02LjctNi4zLTE2LjItNi4zLTE2LjQtLjEtNC4yLjItNS42IDItNy43bS05NS44LTM4LjZjNC4yIDIgMTIuMiAxLjEgMTEuOC01LjdsLS4yLTMuMWMtLjgtMi0zLjItMS41LTMuNy41LS4yLjcuMyAxLjgtLjMgMi4xLS40LjQtMS43LjItMS43LTEuNyAwLS42LS40LTEuMi0uNy0xLjYtLjItLjItLjQtLjItLjktLjItLjYgMC0uNi4xLS45LjYtLjEuNS0uMyAxLS4zIDEuNiAwIC43LS40LjktLjggMS0uNiAwLS41IDAtMS0uMi0uMi0uMy0uNS0uNC0uNS0xbC0uMy0xLjZjLS4yLS4zLS42LS41LTEtLjYtMi4zIDAtMi41IDIuNy0yLjMgMy43LS4yLjItLjMgNC45IDIuOCA2LjIiLz4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMzUuMSAxODcuN2M0LjIgMiAxNC4zLjkgMTEuOC01LjZsLS4yLTMuMmMtLjktMi0zLjItMS41LTMuNy42LS4yLjYuMyAxLjctLjQgMi0uMy40LTEuNy4yLTEuNi0xLjYgMC0uNi0uNC0xLjMtLjctMS43LS4zLS4xLS40LS4yLTEtLjItLjUgMC0uNS4yLS44LjctLjIuNS0uMyAxLS4zIDEuNi0uMS42LS40LjgtLjkgMS0uNSAwLS40IDAtLjgtLjMtLjMtLjMtLjYtLjQtLjYtLjlsLS4zLTEuNmMtLjItLjMtLjYtLjUtMS0uNi0yLjMgMC0yLjUgMi42LTIuNCAzLjYtLjEuMi0uMiA1IDMgNi4yem03Mi0yMS42YzQuMiAyIDEyLjEgMS4xIDExLjgtNS42bC0uMi0zLjJjLS45LTItMy4yLTEuNS0zLjcuNS0uMi43LjMgMS44LS40IDIuMi0uMy4zLTEuNy4xLTEuNi0xLjggMC0uNi0uNC0xLjItLjctMS42LS4zLS4yLS40LS4yLTEtLjItLjUgMC0uNS4yLS44LjdsLS4zIDEuNWMtLjEuNy0uNCAxLS45IDFzLS40IDAtLjgtLjJjLS4zLS4zLS42LS40LS42LS45cy0uMS0xLjMtLjMtMS43Yy0uMi0uMy0uNi0uNC0xLS41LTIuMyAwLTIuNSAyLjYtMi40IDMuNi0uMS4yLS4yIDQuOSAzIDYuMnptMzcuMyA1NC4zYy03LjMgOC4zLTQuMSAyMi0yLjQgMjUgMi40IDQuOCA0LjMgNy45IDkgMTAuMyA0LjMgMy4xIDcuNyAxLjIgOS41LTEgNC4zLTQuNSA0LjQtMTYgNi40LTE4LjIgMS40LTQuMiA1LTMuNSA2LjctMS42YTE2LjUgMTYuNSAwIDAgMCA2LjIgNS4zYzQgMy41IDguOCA0LjIgMTMuNiAxIDMuMi0xLjkgNS4zLTQuMiA3LjItOC45IDItNS42IDEtMzEuNi41LTQ3bC00LjItMjEuNWMwLS4yLS41LTEwLjItMS0xMi41IDAtMS0uMy0xLjMuNy0xLjIgMS4xIDEgMS4yIDEgMiAxLjMgMSAuMiAyLTEuNyAxLjMtMy4zbC0xMC0xOC42Yy0uOC0uOC0xLjktMS42LTMuMi4yYTcuMyA3LjMgMCAwIDAtMi40IDUuNWMuMyA0LjQgMSA4LjkgMS4zIDEzLjNsNCAyMi42YzEuMyAxNiAxLjYgMjkuMiAyLjkgNDUuMy0uMiA2LjgtMi4zIDEyLjctNC4zIDEzLjYgMCAwLTMgMS43LTUtLjItMS41LS42LTcuNC05LjktNy40LTkuOS0zLTIuNy01LTItNy4xIDAtNiA1LjgtOC42IDE2LjQtMTIuNyAyMy44LTEgMS43LTQgMy03LjItLjEtOC4yLTExLjMtMy40LTI3LjMtNC40LTIzLjJNMzA5IDEyNi43YzMuOCAxLjUgNi40IDkuMiA1LjYgMTMtLjggNC41LTIuOCA5LjUtNC4yIDguOS0xLjYtLjYgMS00LjYtLjUtOC44LS44LTIuOC02LTcuOC01LjQtOS4yLTEtMy4xIDIuMi00LjUgNC41LTR6Ii8+CiAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMzU2LjYgMjI1Yy43LTkuMi0uNi0xNC44LS44LTIwLjJzLTYuMS00Ni42LTcuMy01MC42Yy0xLjUtNy44IDUuNy0xIDQuOS01LjYtMi41LTUuNi04LjYtMTMuOS0xMC41LTE4LjgtMS4yLTItLjctNC0zLjMtLjVhNDIuMyA0Mi4zIDAgMCAwLTIuMyAxOS4yYzYuMiAzMi4zIDEyLjUgNTkuMSAxMS41IDg5LjggMyAwIDYuMy02LjcgNy44LTEzLjNtNjQuNC04NS4zYzMuNSAxLjcgNS41IDExLjMgNS4xIDE0LS43IDUtMi41IDEwLjQtMy44IDkuNy0xLjUtLjYuMy03LjQtLjQtOS41LS44LTMtNS41LTguNC01LTEwLTEtMy40IDItNC44IDQuMS00LjJtLTI1NS43IDY3LjljMy4zIDEuMyA1LjMgOC4zIDUgMTAuMy0uOCAzLjctMi41IDcuNy0zLjggNy4xLTEuMy0uNC4zLTUuNC0uMy03LS4zLTMuNy00LjktNS43LTQuOC03LjMtLjgtMyAyLTMuNSA0LTMuMXoiLz4KICAgIDxwYXRoIGZpbGw9IiMxNjVkMzEiIGQ9Ik0yNDQuOSAyMTguMmM0LjIuMiA2LjMgMy42IDIuNCA1LTQgMS4zLTcuNyAyLjQtNy44IDggMS41IDgtMiA1LjItNCA0LjItMi40LTEuOC05LjItNi0xMC4yLTE1LS4xLTIuMSAxLjYtNCA0LjMtNCA0IDEuMSAxMCAxLjIgMTUuMyAxLjgiLz4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik03Ny40IDEyNC40YzQuOCAxLjQgNS4xIDguNiA0LjggMTAuNy0uNyAzLjgtMi40IDcuOS0zLjYgNy40LTEuNC0uNSAwLTUuNy0uNy03LjMtLjctMi4yLTQuOC02LjQtNC40LTcuNi0uOS0yLjUgMi0zLjcgMy45LTMuMm05NS45IDMzLjZjLTMuOCAyLTUuMiA4LTIuOSAxMS42IDIuMiAzIDUuNiAxLjkgNiAxLjkgMy43LjQgNS45LTYuOSA1LjktNi45cy4xLTItNC4yIDEuOWMtMS45LjMtMi0uNC0yLjUtMS40YTkgOSAwIDAgMSAuNS01LjdjLjctMS44LS43LTIuNi0yLjgtMS40bTI4LTM2LjRjLTIgMS4zLTUuNyA1LjItNS44IDkuNi0uMSAyLjUtLjYgMi41IDEgNCAxLjMgMS44IDIuNCAxLjcgNC44LjRhNS4xIDUuMSAwIDAgMCAyLjMtMy40Yy42LTIuOC0zIDEuNC0zLjQtMS44LS44LTMgMS41LTQuMiAzLjctNyAwLTIgMC0zLjMtMi43LTEuOHptMjIuNCA0YTU5LjUgNTkuNSAwIDAgMC0xLjYgMTEuMWMtLjYgMi44IDMgNCA0LjUuNCAyLjQtNi41IDIuNC05LjMgMi42LTEyLS43LTQuMy0zLjYtNC4yLTUuNS41bTE0MiA3Mi4zYy40LS41IDIwLTE0LjQgMjAtMTQuNCAyLS43IDEuNSA3LjIuNiA3LjFhNzcuOCA3Ny44IDAgMCAxLTIwLjcgMTQuM2MtMSAuNy0xLjktNS4zIDAtN3ptMTcuNy0uMmMzLjUgMS43IDQuOSAxMS44IDQuNSAxNC41IDAgNS40LTMuMyA5LjYtNC43IDktMS40LS43LjItNi43LS41LTguOC0uOC0zLTMuNy04LjUtMy4yLTEwLjEtMS0zLjQgMS44LTUuMiA0LTQuNnptLTExNiA0My40YTI2IDI2IDAgMCAxIDUuNi00LjljMi0xIDMuOC44IDMuNy43LjMgMi0xLjIgMy43LS43IDYuMy40IDEgLjcgMi4yIDIuNiAxLjggMy4xLTIuNSA2LTIuNyA5LTIuOCAyLjUuMSAyLjYgNC4yIDEgNC4yLTUuNyAxLjItOC4yIDIuOC0xMi4zIDQuMy0yIDEuMi0zLjYtLjMtMy42LS40cy0xLjEtMS4xLS40LTMuN2MuMi0yLS42LTMuMi0yLjQtMy0xLjIuOC0yLjQgMS4yLTMtLjMtLjMtMS0uNC0xLjYuNS0yLjJtMTM2LjYgNS40Yy44IDEgMS40IDItLjEgMy44bC0zLjcgMy4yYy0uNiAxLTEgMi44IDEgMy4zIDMuNiAxIDEyLTQuNSAxMi00LjYgMS40LTEgMS0zIC44LTMtLjgtLjktMi42LS4zLTMuOC0uNS0uNiAwLTIuNS0uMi0xLjYtMmExMS40IDExLjQgMCAwIDAgMS42LTIuOWMuNS0xLjIgMC0yLTItMi43LTIuMS0uNC0zLS4yLTUuMyAwLTEuMi4yLTEuNi44LTEuOSAyLjMuMSAyLjMgMS41IDIuMiAzIDN6Ii8+CiAgICA8cGF0aCBmaWxsPSIjMTY1ZDMxIiBkPSJNMjY4LjEgMTg5LjdjLS41IDEtMi4zIDEtNCAwcy0yLjctMi42LTIuMS0zLjUgMi4zLS45IDQgMCAyLjYgMi42IDIuMSAzLjVtLTg5LTUzLjZjLTEgLjMtMi40LS42LTMtMnMtLjMtMi42LjctMi45IDIuMy43IDMgMiAuMyAyLjctLjggM3pNMzU1LjIgMzc1YzkuNC40IDE4LjIgMCAyNy41LjUgMS43IDEuNS41IDUtLjYgNC44bC03LjgtLjNjLS4xLTMtNy43LTIuNS03LjUuMS00LjEuNS03LjgtLjEtMTItLjMtMS4yLTEuNS0xLTQuMi40LTQuOCIvPgogIDwvZz4KPC9zdmc+Cg==", "fr": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJmbGFnLWljb25zLWZyIiB2aWV3Qm94PSIwIDAgNjQwIDQ4MCI+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg2NDB2NDgwSDB6Ii8+CiAgPHBhdGggZmlsbD0iIzAwMDA5MSIgZD0iTTAgMGgyMTMuM3Y0ODBIMHoiLz4KICA8cGF0aCBmaWxsPSIjZTEwMDBmIiBkPSJNNDI2LjcgMEg2NDB2NDgwSDQyNi43eiIvPgo8L3N2Zz4K", "cn": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0iZmxhZy1pY29ucy1jbiIgdmlld0JveD0iMCAwIDY0MCA0ODAiPgogIDxkZWZzPgogICAgPHBhdGggaWQ9ImNuLWEiIGZpbGw9IiNmZjAiIGQ9Ik0tLjYuOCAwLTEgLjYuOC0xLS4zaDJ6Ii8+CiAgPC9kZWZzPgogIDxwYXRoIGZpbGw9IiNlZTFjMjUiIGQ9Ik0wIDBoNjQwdjQ4MEgweiIvPgogIDx1c2UgeGxpbms6aHJlZj0iI2NuLWEiIHdpZHRoPSIzMCIgaGVpZ2h0PSIyMCIgdHJhbnNmb3JtPSJtYXRyaXgoNzEuOTk5MSAwIDAgNzIgMTIwIDEyMCkiLz4KICA8dXNlIHhsaW5rOmhyZWY9IiNjbi1hIiB3aWR0aD0iMzAiIGhlaWdodD0iMjAiIHRyYW5zZm9ybT0ibWF0cml4KC0xMi4zMzU2MiAtMjAuNTg3MSAyMC41ODY4NCAtMTIuMzM1NzcgMjQwLjMgNDgpIi8+CiAgPHVzZSB4bGluazpocmVmPSIjY24tYSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjIwIiB0cmFuc2Zvcm09Im1hdHJpeCgtMy4zODU3MyAtMjMuNzU5OTggMjMuNzU5NjggLTMuMzg1NzggMjg4IDk1LjgpIi8+CiAgPHVzZSB4bGluazpocmVmPSIjY24tYSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjIwIiB0cmFuc2Zvcm09Im1hdHJpeCg2LjU5OTEgLTIzLjA3NDkgMjMuMDc0NiA2LjU5OTE5IDI4OCAxNjgpIi8+CiAgPHVzZSB4bGluazpocmVmPSIjY24tYSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjIwIiB0cmFuc2Zvcm09Im1hdHJpeCgxNC45OTkxIC0xOC43MzU1NyAxOC43MzUzMyAxNC45OTkyOSAyNDAgMjE2KSIvPgo8L3N2Zz4K", "pt": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0iZmxhZy1pY29ucy1wdCIgdmlld0JveD0iMCAwIDY0MCA0ODAiPgogIDxwYXRoIGZpbGw9InJlZCIgZD0iTTI1NiAwaDM4NHY0ODBIMjU2eiIvPgogIDxwYXRoIGZpbGw9IiMwNjAiIGQ9Ik0wIDBoMjU2djQ4MEgweiIvPgogIDxnIGZpbGw9IiNmZjAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjYiPgogICAgPHBhdGggZD0iTTMzOS41IDMwNi4yYy0zMi4zLTEtMTgwLTkzLjItMTgxLTEwOGw4LjEtMTMuNWMxNC43IDIxLjMgMTY1LjcgMTExIDE4MC42IDEwNy44eiIvPgogICAgPHBhdGggZD0iTTE2NC45IDE4Mi44Yy0yLjkgNy44IDM4LjYgMzMuNCA4OC40IDYzLjggNDkuOSAzMC4zIDkyLjkgNDkgOTYgNDYuNGwxLjUtMi44Yy0uNiAxLTIgMS4zLTQuMy42LTEzLjUtMy45LTQ4LjYtMjAtOTIuMS00Ni40LTQzLjYtMjYuNC04MS40LTUwLjctODcuMy02MWE2LjMgNi4zIDAgMCAxLS42LTMuMWgtLjJsLTEuMiAyLjJ6bTE3NS4zIDEyMy44Yy0uNSAxLTEuNiAxLTMuNS44LTEyLTEuMy00OC42LTE5LjEtOTEuOS00NS01MC40LTMwLjItOTItNTcuNi04Ny40LTY0LjhsMS4yLTIuMi4yLjFjLTQgMTIuMiA4Mi4xIDYxLjQgODcuMiA2NC42IDQ5LjggMzAuOCA5MS44IDQ4LjkgOTUuNSA0NC4yeiIvPgogICAgPHBhdGggZD0iTTI1Ni4yIDIwNy4yYzMyLjItLjMgNzItNC40IDk1LTEzLjZsLTUtOGMtMTMuNSA3LjUtNTMuNSAxMi41LTkwLjMgMTMuMi00My40LS40LTc0LjEtNC41LTg5LjUtMTQuOGwtNC42IDguNmMyOC4yIDEyIDU3LjIgMTQuNSA5NC40IDE0LjYiLz4KICAgIDxwYXRoIGQ9Ik0zNTIuNSAxOTMuOGMtLjggMS4zLTE1LjggNi40LTM3LjggMTAuMmEzODEuMiAzODEuMiAwIDAgMS01OC42IDQuMyA0MTYuMSA0MTYuMSAwIDAgMS01Ni4yLTMuNmMtMjMuMS0zLjYtMzUtOC42LTM5LjUtMTAuNGwxLjEtMi4yYzEyLjcgNSAyNC43IDggMzguNyAxMC4yQTQxMS41IDQxMS41IDAgMCAwIDI1NiAyMDZhMzkxLjggMzkxLjggMCAwIDAgNTguMy00LjNjMjIuNS0zLjcgMzQuOC04LjQgMzYuNi0xMC41em0tNC40LTguMWMtMi40IDItMTQuNiA2LjMtMzYgOS43YTM4OC4yIDM4OC4yIDAgMCAxLTU1LjggNGMtMjIgMC00MC4xLTEuNi01My44LTMuNi0yMS44LTIuOC0zMy40LTgtMzcuNi05LjRsMS4zLTIuMmMzLjMgMS43IDE0LjQgNi4yIDM2LjUgOS4zYTM4NSAzODUgMCAwIDAgNTMuNiAzLjQgMzg0IDM4NCAwIDAgMCA1NS40LTRjMjEuNS0zIDMzLjEtOC40IDM0LjktOS44ek0xNTAuMyAyNDZjMTkuOCAxMC43IDYzLjkgMTYgMTA1LjYgMTYuNCAzOCAuMSA4Ny40LTUuOCAxMDUuOS0xNS42bC0uNS0xMC43Yy01LjggOS01OC44IDE3LjctMTA1LjggMTcuNC00Ny0uNC05MC43LTcuNi0xMDUuMy0xN3Y5LjUiLz4KICAgIDxwYXRoIGQ9Ik0zNjIuOCAyNDQuNXYyLjVjLTIuOCAzLjQtMjAuMiA4LjQtNDIgMTJhNDM0IDQzNCAwIDAgMS02NS40IDQuNCA0MDAgNDAwIDAgMCAxLTYyLTQuMyAxNTUgMTU1IDAgMCAxLTQ0LjQtMTJ2LTIuOWM5LjcgNi40IDM1LjkgMTEuMiA0NC43IDEyLjYgMTUuOCAyLjQgMzYuMSA0LjIgNjEuNyA0LjIgMjYuOSAwIDQ4LjQtMS45IDY1LTQuNCAxNS43LTIuMyAzOC04LjIgNDIuNC0xMi4xbTAtOXYyLjVjLTIuOCAzLjMtMjAuMiA4LjMtNDIgMTEuOWE0MzQgNDM0IDAgMCAxLTY1LjQgNC41IDQxNCA0MTQgMCAwIDEtNjItNC4zIDE1NSAxNTUgMCAwIDEtNDQuNC0xMnYtM2M5LjcgNi41IDM2IDExLjIgNDQuNyAxMi42YTQwOCA0MDggMCAwIDAgNjEuNyA0LjNjMjYuOSAwIDQ4LjUtMiA2NS00LjUgMTUuNy0yLjIgMzgtOC4xIDQyLjQtMTJtLTEwNyA2OC44Yy00NS42LS4yLTg0LjctMTIuNC05My0xNC40bDYgOS40YTI0OS44IDI0OS44IDAgMCAwIDg3LjQgMTQuM2MzNC43LTEgNjUtMy43IDg2LjMtMTQuMWw2LjItOS44Yy0xNC41IDYuOS02NCAxNC42LTkzIDE0LjYiLz4KICAgIDxwYXRoIGQ9Ik0zNDQuOSAyOTcuM2ExNDMgMTQzIDAgMCAxLTIuOCA0Yy0xMCAzLjYtMjYgNy40LTMyLjYgOC40YTI5NS41IDI5NS41IDAgMCAxLTUzLjcgNWMtNDAuNC0uNi03My41LTguNS04OS0xNS4zbC0xLjMtMi4xLjItLjQgMi4xLjlhMjg2LjUgMjg2LjUgMCAwIDAgODguMiAxNC41YzE4LjggMCAzNy41LTIuMSA1Mi42LTQuOCAyMy4yLTQuNyAzMi42LTguMiAzNS41LTkuOGwuNy0uNHptNS4zLTguOGEyODcuMiAyODcuMiAwIDAgMS0yIDMuNWMtNS40IDItMjAgNi4yLTQxLjMgOS4yLTE0IDEuOS0yMi43IDMuOC01MC42IDQuM2EzNDcuNCAzNDcuNCAwIDAgMS05NC4yLTE0TDE2MSAyODlhMzkwIDM5MCAwIDAgMCA5NS40IDE0YzI1LjUtLjUgMzYuNC0yLjQgNTAuMy00LjMgMjQuOC0zLjggMzcuMy04IDQxLTkuMWEyLjkgMi45IDAgMCAwIDAtLjJsMi42LTF6Ii8+CiAgICA8cGF0aCBkPSJNMzUwLjggMjM3LjZjLjEgMzAtMTUuMyA1Ny0yNy42IDY4LjhhOTkuMyA5OS4zIDAgMCAxLTY3LjggMjguMmMtMzAuMy41LTU4LjgtMTkuMi02Ni41LTI3LjlhMTAxIDEwMSAwIDAgMS0yNy41LTY3LjRjMS44LTMyLjggMTQuNy01NS42IDMzLjMtNzEuM2E5OS42IDk5LjYgMCAwIDEgNjQuMi0yMi43IDk4LjIgOTguMiAwIDAgMSA3MSAzNS42YzEyLjUgMTUuMiAxOCAzMS43IDIwLjkgNTYuN00yNTUuNiAxMzVhMTA2IDEwNiAwIDAgMSAxMDYgMTA1LjIgMTA1LjYgMTA1LjYgMCAxIDEtMjExLjQgMGMtLjEtNTggNDcuMy0xMDUuMiAxMDUuNC0xMDUuMiIvPgogICAgPHBhdGggZD0iTTI1NS45IDEzNC41YzU4LjIgMCAxMDUuNiA0Ny40IDEwNS42IDEwNS42UzMxNC4xIDM0NS43IDI1NiAzNDUuN3MtMTA1LjYtNDcuNC0xMDUuNi0xMDUuNmMwLTU4LjIgNDcuNC0xMDUuNiAxMDUuNi0xMDUuNnpNMTUyLjYgMjQwYzAgNTYuOCA0Ni43IDEwMy4zIDEwMy4zIDEwMy4zIDU2LjYgMCAxMDMuMy00Ni41IDEwMy4zLTEwMy4zcy00Ni43LTEwMy4zLTEwMy4zLTEwMy4zUzE1Mi42IDE4My4yIDE1Mi42IDI0MCIvPgogICAgPHBhdGggZD0iTTI1NiAxNDMuM2E5NyA5NyAwIDAgMSA5Ni43IDk2LjcgOTcuMSA5Ny4xIDAgMCAxLTk2LjcgOTYuOGMtNTMgMC05Ni43LTQzLjYtOTYuNy05Ni44YTk3LjEgOTcuMSAwIDAgMSA5Ni43LTk2LjdNMTYxLjYgMjQwYzAgNTIgNDIuNiA5NC40IDk0LjQgOTQuNHM5NC40LTQyLjUgOTQuNC05NC40YzAtNTItNDIuNi05NC40LTk0LjQtOTQuNGE5NC44IDk0LjggMCAwIDAtOTQuNCA5NC40Ii8+CiAgICA8cGF0aCBkPSJNMjYwLjMgMTM0aC05LjF2MjEyLjNoOXoiLz4KICAgIDxwYXRoIGQ9Ik0yNTkuMyAxMzIuOGgyLjN2MjE0LjdoLTIuMlYxMzIuOHptLTkgMGgyLjR2MjE0LjdoLTIuM3oiLz4KICAgIDxwYXRoIGQ9Ik0zNjEuNiAyNDQuMnYtNy44bC02LjQtNi0zNi4zLTkuNi01Mi4yLTUuMy02MyAzLjItNDQuOCAxMC42LTkgNi43djcuOWwyMi45LTEwLjMgNTQuNC04LjVoNTIuM2wzOC40IDQuMiAyNi42IDYuNHoiLz4KICAgIDxwYXRoIGQ9Ik0yNTYgMjIzLjhjMjQuOSAwIDQ5IDIuMyA2OC4zIDYgMTkuOCA0IDMzLjcgOSAzOC41IDE0LjV2Mi44Yy01LjgtNy0yNC41LTEyLTM5LTE1LTE5LTMuNi00My02LTY3LjktNi0yNi4xIDAtNTAuNSAyLjYtNjkuMyA2LjItMTUgMy0zNS4xIDktMzcuNiAxNC44di0yLjljMS4zLTQgMTYuMy0xMCAzNy4zLTE0LjMgMTguOS0zLjcgNDMuMy02LjEgNjkuNi02LjF6bTAtOS4xYTM4MyAzODMgMCAwIDEgNjguMyA2YzE5LjggNCAzMy43IDkgMzguNSAxNC42djIuN2MtNS44LTYuOS0yNC41LTEyLTM5LTE0LjktMTktMy43LTQzLTYtNjcuOS02YTM3NiAzNzYgMCAwIDAtNjkuMiA2LjJjLTE0LjUgMi43LTM1LjQgOC45LTM3LjcgMTQuN3YtMi44YzEuNC00IDE2LjYtMTAuMyAzNy4zLTE0LjMgMTktMy43IDQzLjMtNi4yIDY5LjctNi4ybS0uNi00Ni4yYzM5LjMtLjIgNzMuNiA1LjUgODkuMyAxMy41bDUuNyAxMGMtMTMuNi03LjQtNTAuNi0xNS05NC45LTE0LTM2LjEuMy03NC43IDQtOTQgMTQuNGw2LjgtMTEuNGMxNS45LTguMyA1My4zLTEyLjUgODcuMS0xMi41Ii8+CiAgICA8cGF0aCBkPSJNMjU2IDE3Ni43YTM1NCAzNTQgMCAwIDEgNjEuMyA0LjNjMTYgMyAzMS4zIDcuNCAzMy41IDkuOGwxLjcgM2MtNS4zLTMuNC0xOC42LTcuMy0zNS42LTEwLjVzLTM4LjctNC4zLTYxLTQuMmMtMjUuMy0uMS00NSAxLjItNjEuOCA0LjJhMTA4LjkgMTA4LjkgMCAwIDAtMzMuMyAxMC4zbDEuNy0zLjFjNi0zIDE1LjMtNi43IDMxLjEtOS42IDE3LjUtMy4yIDM3LjQtNC4xIDYyLjQtNC4ybTAtOWMyMS40LS4yIDQyLjYgMSA1OS4xIDRhOTYgOTYgMCAwIDEgMzAuNiAxMGwyLjUgNGMtNC4yLTQuNy0yMC05LjItMzQuMS0xMS42LTE2LjQtMi45LTM2LjctNC01OC4xLTQuMmEzNjEgMzYxIDAgMCAwLTU5LjUgNC40IDk3LjMgOTcuMyAwIDAgMC0yOS42IDkuMWwyLjItMy4zYzUuOC0zIDE1LjItNS44IDI3LTguMWEzNTcgMzU3IDAgMCAxIDU5LjktNC40ek0zMDguNCAyODRhMjc2LjQgMjc2LjQgMCAwIDAtNTIuNS00Yy02NS41LjgtODYuNiAxMy41LTg5LjIgMTcuM2wtNS04YzE2LjgtMTIgNTIuNC0xOC44IDk0LjYtMTguMiAyMS45LjQgNDAuOCAxLjkgNTYuNiA1bC00LjUgOCIvPgogICAgPHBhdGggZD0iTTI1NS42IDI3OC45YzE4LjIuMyAzNiAxIDUzLjMgNC4ybC0xLjIgMi4yYy0xNi0zLTMzLjItNC01Mi00LTI0LjMtLjItNDguNyAyLjEtNzAgOC4yLTYuNyAxLjktMTcuOCA2LjItMTkgOS44bC0xLjItMmMuNC0yLjIgNy02LjYgMTkuNi0xMCAyNC40LTcgNDcuMi04LjMgNzAuNS04LjRtLjgtOS4yYTMyNyAzMjcgMCAwIDEgNTcuMyA1bC0xLjMgMi4zYTI5OSAyOTkgMCAwIDAtNTYtNC45Yy0yNC4yIDAtNDkuOSAxLjgtNzMuMyA4LjYtNy41IDIuMi0yMC42IDctMjEgMTAuN2wtMS4yLTIuMmMuMi0zLjQgMTEuNS03LjkgMjEuNy0xMC44IDIzLjUtNi45IDQ5LjMtOC42IDczLjgtOC43Ii8+CiAgICA8cGF0aCBkPSJtMzQ5LjQgMjkwLjUtNy44IDEyLjMtMjIuNy0yMC4xLTU4LjYtMzkuNS02Ni4yLTM2LjMtMzQuMy0xMS43IDcuMy0xMy42IDIuNS0xLjMgMjEuMyA1LjMgNzAuNCAzNi4zIDQwLjYgMjUuNkwzMzYgMjcybDEzLjkgMTZ6Ii8+CiAgICA8cGF0aCBkPSJNMTU4LjYgMTk1LjVjNi00IDUwLjIgMTUuNiA5Ni42IDQzLjYgNDYuMSAyOCA5MC4zIDU5LjYgODYuMyA2NS41bC0xLjMgMi4xLS42LjVjLjEtLjEuOC0xIDAtMy4xLTItNi41LTMzLjQtMzEuNS04NS4zLTYyLjktNTAuNy0zMC4xLTkyLjktNDguMy05Ny00My4xek0zNTEgMjkwLjRjMy44LTcuNi0zNy4yLTM4LjUtODguMS02OC42LTUyLTI5LjUtODkuNi00Ni45LTk2LjUtNDEuN0wxNjUgMTgzYzAgLjEgMC0uMi40LS41IDEuMi0xIDMuMy0xIDQuMi0xIDExLjguMiA0NS41IDE1LjcgOTIuOCA0Mi44IDIwLjggMTIgODcuNiA1NSA4Ny4zIDY3IDAgMSAuMSAxLjItLjMgMS44bDEuNy0yLjZ6Ii8+CiAgPC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMjYuNylzY2FsZSgxLjA2NjY3KSI+CiAgICA8cGF0aCBmaWxsPSIjZmZmIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iLjciIGQ9Ik0xODAuNiAyMTFhNTguNyA1OC43IDAgMCAwIDE3LjUgNDEuNyA1OSA1OSAwIDAgMCA0MS44IDE3LjYgNTkuNCA1OS40IDAgMCAwIDQyLTE3LjQgNTkgNTkgMCAwIDAgMTcuNC00MS44di03OS4ybC0xMTguNy0uMnoiLz4KICAgIDxwYXRoIGZpbGw9InJlZCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9Ii41IiBkPSJNMTgzIDIxMS4xYTU2LjQgNTYuNCAwIDAgMCAxNi44IDQwIDU3IDU3IDAgMCAwIDQwLjIgMTYuOCA1Ni45IDU2LjkgMCAwIDAgNDAuMi0xNi42IDU2LjQgNTYuNCAwIDAgMCAxNi43LTQwdi03N0gxODN2NzYuOG05MS01My43djQ4LjlsLS4xIDUuMWEzMy4yIDMzLjIgMCAwIDEtMTAgMjQgMzQgMzQgMCAwIDEtMjQgMTBjLTkuNCAwLTE3LjctNC0yMy45LTEwLjJhMzQgMzQgMCAwIDEtMTAtMjR2LTU0eiIvPgogICAgPGcgaWQ9InB0LWUiPgogICAgICA8ZyBpZD0icHQtZCIgZmlsbD0iI2ZmMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9Ii41Ij4KICAgICAgICA8cGF0aCBzdHJva2U9Im5vbmUiIGQ9Ik0xOTAuMiAxNTQuNGMuMS01LjUgNC02LjggNC02LjguMSAwIDQuMyAxLjQgNC4zIDYuOXoiLz4KICAgICAgICA8cGF0aCBkPSJtMTg2LjggMTQ3LjctLjcgNi4zaDQuMmMwLTUuMiA0LTYgNC02IC4xIDAgNCAxLjEgNC4xIDZoNC4ybC0uOC02LjR6bS0xIDYuNGgxN2MuMyAwIC42LjMuNi43IDAgLjUtLjMuOC0uNi44aC0xN2MtLjMgMC0uNi0uMy0uNi0uOCAwLS40LjMtLjcuNy0uN3oiLz4KICAgICAgICA8cGF0aCBkPSJNMTkyIDE1NGMwLTMuMyAyLjMtNC4yIDIuMy00LjJzMi4zIDEgMi4zIDQuMkgxOTJtLTUuOC05aDE2LjNjLjMgMCAuNi40LjYuOCAwIC4zLS4zLjYtLjYuNmgtMTYuM2MtLjMgMC0uNi0uMy0uNi0uNyAwLS4zLjMtLjYuNi0uNnptLjQgMS41SDIwMmMuMyAwIC42LjMuNi43IDAgLjQtLjMuNy0uNi43aC0xNS41Yy0uNCAwLS42LS4zLS42LS43IDAtLjQuMi0uNy42LS43em01LTEwLjZoMS4ydi44aC45di0uOGgxLjN2LjloLjl2LTFoMS4ydjJjMCAuNC0uMi42LS41LjZoLTQuNGMtLjMgMC0uNi0uMi0uNi0uNXptNC42IDIuNy4zIDYuNGgtNC4zbC4zLTYuNWgzLjciLz4KICAgICAgICA8cGF0aCBpZD0icHQtYSIgZD0iTTE5MSAxNDEuNnYzLjRoLTR2LTMuNHoiLz4KICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwdC1hIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIxMC42Ii8+CiAgICAgICAgPHBhdGggaWQ9InB0LWIiIGQ9Ik0xODYuMyAxMzloMS4ydjFoLjl2LTFoMS4ydjFoLjl2LTFoMS4ydjJjMCAuNC0uMi42LS41LjZoLTQuM2EuNi42IDAgMCAxLS42LS42eiIvPgogICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3B0LWIiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHg9IjEwLjYiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjMDAwMDAxIiBzdHJva2U9Im5vbmUiIGQ9Ik0xOTMuOSAxNDAuNmMwLS42LjktLjYuOSAwdjEuNmgtLjl6Ii8+CiAgICAgICAgPHBhdGggaWQ9InB0LWMiIGZpbGw9IiMwMDAwMDEiIHN0cm9rZT0ibm9uZSIgZD0iTTE4OC42IDE0Mi44YzAtLjYuOC0uNi44IDB2MS4yaC0uOHoiLz4KICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwdC1jIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIxMC42Ii8+CiAgICAgIDwvZz4KICAgICAgPHVzZSB4bGluazpocmVmPSIjcHQtZCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgeT0iNDYuMyIvPgogICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwdC1kIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB0cmFuc2Zvcm09InJvdGF0ZSgtNDUuMiAzMTIuOCAxODApIi8+CiAgICA8L2c+CiAgICA8dXNlIHhsaW5rOmhyZWY9IiNwdC1kIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSI0NS43Ii8+CiAgICA8dXNlIHhsaW5rOmhyZWY9IiNwdC1lIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSA0NzkuOCAwKSIvPgogICAgPGcgaWQ9InB0LWYiIGZpbGw9IiNmZmYiPgogICAgICA8cGF0aCBmaWxsPSIjMDM5IiBkPSJNMjMyLjYgMjAyLjRhOC4zIDguMyAwIDAgMCAyLjIgNS43IDcuMiA3LjIgMCAwIDAgNS4zIDIuNGMyLjEgMCA0LTEgNS4zLTIuNGE4LjMgOC4zIDAgMCAwIDIuMi01Ljd2LTEwLjhoLTE1eiIvPgogICAgICA8Y2lyY2xlIGN4PSIyMzYuMSIgY3k9IjE5NS43IiByPSIxLjUiLz4KICAgICAgPGNpcmNsZSBjeD0iMjQ0LjQiIGN5PSIxOTUuNyIgcj0iMS41Ii8+CiAgICAgIDxjaXJjbGUgY3g9IjI0MC4yIiBjeT0iMTk5LjciIHI9IjEuNSIvPgogICAgICA8Y2lyY2xlIGN4PSIyMzYuMSIgY3k9IjIwMy45IiByPSIxLjUiLz4KICAgICAgPGNpcmNsZSBjeD0iMjQ0LjQiIGN5PSIyMDMuOSIgcj0iMS41Ii8+CiAgICA8L2c+CiAgICA8dXNlIHhsaW5rOmhyZWY9IiNwdC1mIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB5PSItMjYiLz4KICAgIDx1c2UgeGxpbms6aHJlZj0iI3B0LWYiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHg9Ii0yMC44Ii8+CiAgICA8dXNlIHhsaW5rOmhyZWY9IiNwdC1mIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIyMC44Ii8+CiAgICA8dXNlIHhsaW5rOmhyZWY9IiNwdC1mIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB5PSIyNS44Ii8+CiAgPC9nPgo8L3N2Zz4K"};
const I18N = window.I18N || {};
const MSGS = window.I18N_MSG || {};
const MSG = new Proxy({}, { get: (_, l) => MSGS[l] || MSGS.en });

const savedLang = store.get("lang");
let lang = LANGS.some(l => l.code === savedLang) ? savedLang : "en";
window.siteLang = () => lang;
const i18nEls = document.querySelectorAll("[data-i18n]");
const english = new Map();
i18nEls.forEach(el => english.set(el, el.innerHTML));
const langListeners = [];
window.onLangChange = fn => langListeners.push(fn);

// ---- Month names in dates such as "Jan – May 2022" ----
const MONTHS_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTHS = {
  sw: ["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ago","Sep","Okt","Nov","Des"],
  fr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."],
  pt: ["jan.","fev.","mar.","abr.","maio","jun.","jul.","ago.","set.","out.","nov.","dez."],
  ar: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]
};
const M = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
function localizeDate(text, l) {
  if (l === "en") return text;
  const idx = m => MONTHS_EN.indexOf(m);
  if (l === "zh") {
    let t = text.replace(new RegExp("^" + M + " – " + M + " (\\d{4})$"), (_, a, b, y) => `${y}年${idx(a) + 1}月–${idx(b) + 1}月`);
    return t.replace(new RegExp(M + " (\\d{4})", "g"), (_, a, y) => `${y}年${idx(a) + 1}月`);
  }
  return text.replace(new RegExp("\\b" + M + "\\b", "g"), m => MONTHS[l][idx(m)]);
}
const dateEls = [...document.querySelectorAll(".card-tag, .t-date, .j-year, .news-item time")]
  .filter(el => !el.hasAttribute("data-i18n") && new RegExp(M).test(el.textContent));
dateEls.forEach(el => { el.dataset.en = el.textContent; });

// ---- Language menu ----
const langBtn = document.getElementById("langBtn");
const langList = document.getElementById("langList");
const langFlag = document.getElementById("langFlag");
const langCode = document.getElementById("langCode");
LANGS.forEach(l => {
  const li = document.createElement("li");
  li.innerHTML = `<button type="button" role="menuitemradio" lang="${l.html}" data-lang="${l.code}"><img src="${FLAGS[l.flag]}" alt="" width="24" height="18"><span>${l.label}</span></button>`;
  langList.appendChild(li);
});
function closeLangMenu() { langList.hidden = true; langBtn.setAttribute("aria-expanded", "false"); }
langBtn.addEventListener("click", e => {
  e.stopPropagation();
  const open = langList.hidden;
  langList.hidden = !open;
  langBtn.setAttribute("aria-expanded", String(open));
  if (open) langList.querySelector(`[data-lang="${lang}"]`).focus();
});
langList.addEventListener("click", e => {
  const b = e.target.closest("button[data-lang]");
  if (!b) return;
  lang = b.dataset.lang;
  store.set("lang", lang);
  applyLang();
  closeLangMenu();
  langBtn.focus();
});
langList.addEventListener("keydown", e => {
  const items = [...langList.querySelectorAll("button")];
  const i = items.indexOf(document.activeElement);
  if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
  if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
  if (e.key === "Escape") { closeLangMenu(); langBtn.focus(); }
});
document.addEventListener("click", e => { if (!langList.hidden && !e.target.closest(".lang")) closeLangMenu(); });

function applyLang() {
  const info = LANGS.find(l => l.code === lang);
  const dict = I18N[lang] || {};
  i18nEls.forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = (lang !== "en" && dict[key]) ? dict[key] : english.get(el);
  });
  dateEls.forEach(el => { el.textContent = localizeDate(el.dataset.en, lang); });
  root.lang = info.html;
  root.dir = info.rtl ? "rtl" : "ltr";
  langFlag.src = FLAGS[info.flag];
  langCode.textContent = info.short;
  langList.querySelectorAll("button").forEach(b => b.setAttribute("aria-checked", String(b.dataset.lang === lang)));
  langListeners.forEach(fn => fn(lang));
}

// ---------------------------------------------------------
// 2. LIGHT / DARK MODE
// ---------------------------------------------------------
const savedTheme = store.get("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);
else if (window.matchMedia("(prefers-color-scheme: dark)").matches) root.setAttribute("data-theme", "dark");

document.getElementById("themeToggle").addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  store.set("theme", next);
});

// ---------------------------------------------------------
// 3. MOBILE MENU + NAV BAR + ACTIVE LINK
// ---------------------------------------------------------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}));

const nav = document.getElementById("nav");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 30), { passive: true });

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.querySelectorAll("a").forEach(a =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section[id]").forEach(s => sectionObserver.observe(s));

// ---------------------------------------------------------
// 4. FADE-IN ON SCROLL + COUNTING NUMBERS
// ---------------------------------------------------------
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target, target = Number(el.dataset.count), t0 = performance.now(), dur = 1400;
    (function tick(now) {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach(el => counterObserver.observe(el));

// ---------------------------------------------------------
// 5. SMALL POP-UP MESSAGE ("toast")
// ---------------------------------------------------------
const toast = document.getElementById("toast");
let toastTimer;
function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

// ---------------------------------------------------------
// 6. PUBLICATIONS: filter buttons + "copy citation"
// ---------------------------------------------------------
const filters = document.querySelectorAll(".filter");
const pubs = document.querySelectorAll(".pub");
filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(b => b.classList.toggle("active", b === btn));
  const f = btn.dataset.filter;
  pubs.forEach(p => { p.hidden = !(f === "all" || p.dataset.type === f); });
}));

document.addEventListener("click", async e => {
  const mail = e.target.closest(".copy-email");
  if (mail) {
    try { await navigator.clipboard.writeText(mail.dataset.email); showToast(MSG[lang].emailCopied); }
    catch (err) { showToast(MSG[lang].copyFail); }
    return;
  }
  const btn = e.target.closest(".cite-btn");
  if (!btn) return;
  try {
    await navigator.clipboard.writeText(btn.dataset.cite);
    showToast(MSG[lang].copied);
  } catch (err) {
    showToast(MSG[lang].copyFail);
  }
});

// ---------------------------------------------------------
// 7. ROTATING 3D GLOBE
//    Add or move a place by editing this list.
//    Coordinates are [longitude, latitude] — note: longitude FIRST.
//    type: "field" (teal pin) or "talk" (ochre pin)
// ---------------------------------------------------------
const SITES = [
  { lonlat: [35.7516, -6.1630], type: "field",
    en: { name: "Dodoma Urban, Tanzania", text: "MSc fieldwork: zoonotic and antimicrobial-resistant bacteria in invasive Indian House Crows." },
    sw: { name: "Jiji la Dodoma, Tanzania", text: "Kazi ya shambani ya Uzamili: bakteria wa zoonotiki na walio sugu kwa dawa kwa Kunguru wa Kihindi vamizi." } },
  { lonlat: [35.8094, -6.2117], type: "field",
    en: { name: "University of Dodoma", text: "BSc Biology (2019–2022), Moringa bioprospecting project, and volunteer teaching in microbiology and parasitology." },
    sw: { name: "Chuo Kikuu cha Dodoma", text: "Shahada ya Kwanza ya Biolojia (2019–2022), mradi wa mlonge, na ufundishaji wa kujitolea wa mikrobiolojia na parasitolojia." } },
  // NOTE: check these Nghumbi coordinates and correct them if needed
  { lonlat: [35.9500, -6.0500], type: "field",
    en: { name: "Nghumbi, semi-arid central Tanzania", text: "MKARUN: root-nodule microbiomes, soil health and farmer training." },
    sw: { name: "Nghumbi, eneo kame la kati Tanzania", text: "MKARUN: vijidudu vya vinundu vya mizizi, afya ya udongo na mafunzo kwa wakulima." } },
  { lonlat: [32.7500, -5.0500], type: "field",
    en: { name: "TARI Tumbi, Tabora", text: "Internship in agroforestry, seed development and multiplication (2021)." },
    sw: { name: "TARI Tumbi, Tabora", text: "Mafunzo kwa vitendo kuhusu kilimo mseto, uendelezaji na uzalishaji wa mbegu (2021)." } },
  { lonlat: [37.6597, -6.8486], type: "field",
    en: { name: "Sokoine University of Agriculture, Morogoro", text: "One Health pathogen genomics and metagenomics hands-on training with SACIDS (2023)." },
    sw: { name: "Chuo Kikuu cha Kilimo cha Sokoine, Morogoro", text: "Mafunzo kwa vitendo ya jenomiki ya vimelea na metagenomiki pamoja na SACIDS (2023)." } },
  { lonlat: [10.4022, 63.4195], type: "field",
    en: { name: "NTNU, Trondheim, Norway", text: "MSc in Natural Resources Management – Biology (2025–2027) and OECM research report." },
    sw: { name: "NTNU, Trondheim, Norwei", text: "Shahada ya Uzamili katika Usimamizi wa Maliasili – Biolojia (2025–2027) na ripoti ya utafiti wa OECM." } },
  { lonlat: [-76.4951, 44.2253], type: "talk",
    en: { name: "Kingston, Canada", text: "27th North American Symbiotic Nitrogen Fixation Conference, June 2026 — co-authored oral and poster presentations, presented by K. C. Mercurio." },
    sw: { name: "Kingston, Kanada", text: "Mkutano wa 27 wa Amerika Kaskazini kuhusu Ufungaji wa Naitrojeni, Juni 2026 — wasilisho na bango nilioandika pamoja, viliwasilishwa na K. C. Mercurio." } },
  { lonlat: [-77.8599, 40.7982], type: "talk",
    en: { name: "Penn State, USA", text: "Penn State Water Conference, March 2026 — co-authored flash talk and poster, presented by K. C. Mercurio." },
    sw: { name: "Penn State, Marekani", text: "Mkutano wa Maji wa Penn State, Machi 2026 — wasilisho fupi na bango nilioandika pamoja, viliwasilishwa na K. C. Mercurio." } }
];

const siteT = (i, l) => SITES[i][l] || ((window.SITE_TEXT || {})[l] || [])[i] || SITES[i].en;

(function globe() {
  const canvas = document.getElementById("globe");
  if (!canvas || !window.d3 || !window.topojson || !window.WORLD_TOPO) return;
  const ctx = canvas.getContext("2d");
  const card = document.getElementById("globeCard");
  const legend = document.getElementById("mapLegend");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const world = window.WORLD_TOPO;
  const land = topojson.feature(world, world.objects.land);
  const countries = topojson.feature(world, world.objects.countries).features;
  const highlight = countries.filter(c => c.id === "834" || c.id === "578");   // Tanzania, Norway
  const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
  const graticule = d3.geoGraticule10();
  const sphere = { type: "Sphere" };

  const projection = d3.geoOrthographic().clipAngle(90).precision(0.6);
  const path = d3.geoPath(projection, ctx);
  let size = 0, base = 0, zoom = 1;
  let rotation = [-20, -10, 0];          // start centred near East Africa / Europe
  let selected = -1, anim = null, dragging = false, visible = true, idleTimer = null;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    size = canvas.clientWidth;
    canvas.width = size * ratio; canvas.height = size * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    base = size / 2 - 10;
  }

  function css(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }
  const dark = () => root.getAttribute("data-theme") === "dark";

  function draw(t) {
    const primary = css("--primary"), accent = css("--accent");
    projection.translate([size / 2, size / 2]).scale(base * zoom).rotate(rotation);
    ctx.clearRect(0, 0, size, size);

    // soft glow behind the globe
    const r = base * zoom, cx = size / 2, cy = size / 2;
    const glow = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.08);
    glow.addColorStop(0, dark() ? "rgba(60,196,168,.25)" : "rgba(15,107,92,.18)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, r * 1.08, 0, Math.PI * 2); ctx.fill();

    // ocean
    const ocean = ctx.createRadialGradient(cx - r * .35, cy - r * .35, r * .1, cx, cy, r);
    if (dark()) { ocean.addColorStop(0, "#1b4a41"); ocean.addColorStop(1, "#0b201c"); }
    else { ocean.addColorStop(0, "#e4f2ee"); ocean.addColorStop(1, "#a9d1c7"); }
    ctx.beginPath(); path(sphere); ctx.fillStyle = ocean; ctx.fill();

    // grid lines
    ctx.beginPath(); path(graticule);
    ctx.strokeStyle = dark() ? "rgba(255,255,255,.07)" : "rgba(15,107,92,.12)"; ctx.lineWidth = .7; ctx.stroke();

    // land
    ctx.beginPath(); path(land);
    ctx.fillStyle = dark() ? "#2b3d37" : "#f6f0e4"; ctx.fill();
    ctx.strokeStyle = dark() ? "rgba(255,255,255,.18)" : "rgba(31,42,40,.25)"; ctx.lineWidth = .6; ctx.stroke();

    // Tanzania & Norway highlighted
    highlight.forEach(f => {
      ctx.beginPath(); path(f);
      ctx.fillStyle = f.id === "834" ? primary : accent; ctx.globalAlpha = .75; ctx.fill(); ctx.globalAlpha = 1;
    });

    // country borders
    ctx.beginPath(); path(borders);
    ctx.strokeStyle = dark() ? "rgba(255,255,255,.12)" : "rgba(31,42,40,.15)"; ctx.lineWidth = .5; ctx.stroke();

    // pins
    const center = [-rotation[0], -rotation[1]];
    SITES.forEach((s, i) => {
      s.visible = d3.geoDistance(s.lonlat, center) < Math.PI / 2 - 0.05;
      if (!s.visible) return;
      const [x, y] = projection(s.lonlat);
      s.xy = [x, y];
      const col = s.type === "talk" ? accent : primary;
      if (!reduce) {
        const pulse = ((t / 1600 + i * .2) % 1);
        ctx.beginPath(); ctx.arc(x, y, 5 + pulse * 14, 0, Math.PI * 2);
        ctx.strokeStyle = col; ctx.globalAlpha = 1 - pulse; ctx.lineWidth = 2; ctx.stroke(); ctx.globalAlpha = 1;
      }
      ctx.beginPath(); ctx.arc(x, y, i === selected ? 7.5 : 5.5, 0, Math.PI * 2);
      ctx.fillStyle = col; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = "#fff"; ctx.stroke();
    });

    // rim
    ctx.beginPath(); path(sphere);
    ctx.strokeStyle = dark() ? "rgba(255,255,255,.15)" : "rgba(15,107,92,.35)"; ctx.lineWidth = 1.2; ctx.stroke();
  }

  function loop(t) {
    if (visible) {
      if (!dragging && !anim && selected < 0 && !reduce) rotation[0] += 0.12;
      if (anim) {
        const k = Math.min(1, (t - anim.start) / anim.dur);
        const e = d3.easeCubicInOut(k);
        rotation = anim.rot(e); zoom = anim.zoom(e);
        if (k === 1) anim = null;
      }
      draw(t);
    }
    requestAnimationFrame(loop);
  }

  function animateTo(rot, z) {
    anim = { start: performance.now(), dur: 1300, rot: d3.interpolate(rotation.slice(), rot), zoom: d3.interpolate(zoom, z) };
  }

  const esc = s => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function select(i) {
    selected = i;
    const s = SITES[i], t = siteT(i, window.siteLang());
    animateTo([-s.lonlat[0], -s.lonlat[1], 0], s.lonlat[1] < 10 && s.lonlat[0] > 30 ? 1.6 : 1.3);
    card.innerHTML = `<strong>${esc(t.name)}</strong><p>${esc(t.text)}</p>`;
    card.hidden = false;
    legend.querySelectorAll("button").forEach((b, j) => b.classList.toggle("active", j === i));
    clearTimeout(idleTimer);
    idleTimer = setTimeout(deselect, 9000);
  }
  function deselect() {
    if (selected < 0) return;
    selected = -1; card.hidden = true;
    legend.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    animateTo([rotation[0], -10, 0], 1);
  }

  function buildLegend() {
    const l = window.siteLang();
    legend.innerHTML = "";
    SITES.forEach((s, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<button type="button"><span class="dot ${s.type === "talk" ? "talk" : ""}"></span><span><strong>${esc(siteT(i, l).name)}</strong><small>${esc(siteT(i, l).text)}</small></span></button>`;
      li.querySelector("button").addEventListener("click", () => select(i));
      legend.appendChild(li);
    });
    if (selected >= 0) { const t = siteT(selected, l); card.innerHTML = `<strong>${esc(t.name)}</strong><p>${esc(t.text)}</p>`; legend.querySelectorAll("button")[selected].classList.add("active"); }
  }

  // drag to rotate, click a pin to select
  let start = null;
  canvas.addEventListener("pointerdown", e => {
    start = { x: e.clientX, y: e.clientY, rot: rotation.slice(), moved: false };
    dragging = true; anim = null; canvas.classList.add("dragging");
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", e => {
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) start.moved = true;
    const k = 75 / (base * zoom);
    rotation = [start.rot[0] + dx * k, Math.max(-75, Math.min(75, start.rot[1] - dy * k)), 0];
  });
  canvas.addEventListener("pointerup", e => {
    dragging = false; canvas.classList.remove("dragging");
    if (start && !start.moved) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      let best = -1, bestD = 16;
      SITES.forEach((s, i) => { if (s.visible && s.xy) { const d = Math.hypot(s.xy[0] - x, s.xy[1] - y); if (d < bestD) { bestD = d; best = i; } } });
      if (best >= 0) select(best); else deselect();
    } else if (selected >= 0) { clearTimeout(idleTimer); idleTimer = setTimeout(deselect, 9000); }
    start = null;
  });

  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(canvas);
  window.addEventListener("resize", resize);
  window.onLangChange(buildLegend);
  resize(); buildLegend(); draw(0); requestAnimationFrame(loop);
})();

// ---------------------------------------------------------
// 8. PHOTO GALLERY: full-screen viewer (lightbox)
// ---------------------------------------------------------
const gItems = [...document.querySelectorAll(".g-item")];
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
let lbIndex = 0, lastFocus = null;

function openLightbox(i) {
  lbIndex = (i + gItems.length) % gItems.length;
  const img = gItems[lbIndex].querySelector("img");
  lbImg.src = img.dataset.full || img.currentSrc || img.src;
  lbImg.alt = img.alt;
  lbCap.textContent = gItems[lbIndex].querySelector(".slide-cap, figcaption").textContent;
  if (lb.hidden) { lastFocus = document.activeElement; lb.hidden = false; document.body.style.overflow = "hidden"; }
  document.getElementById("lbClose").focus();
}
function closeLightbox() {
  lb.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
gItems.forEach((item, i) => item.querySelector("button").addEventListener("click", () => openLightbox(i)));
document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", () => openLightbox(lbIndex - 1));
document.getElementById("lbNext").addEventListener("click", () => openLightbox(lbIndex + 1));
lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
  if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
});

// ---------------------------------------------------------
// 9. CONTACT FORM (sent through Formspree, free)
// ---------------------------------------------------------
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
form.addEventListener("submit", async e => {
  e.preventDefault();
  if (form.action.includes("YOUR_FORM_ID")) { formStatus.textContent = MSG[lang].notReady; return; }
  formStatus.textContent = MSG[lang].sending;
  try {
    const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    formStatus.textContent = MSG[lang].sent;
  } catch (err) {
    formStatus.textContent = MSG[lang].failed;
  }
});

// ---------------------------------------------------------
// 10. FOOTER YEAR
// ---------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------------------------------------------------------
// 11. ANIMATED "MICROBES" IN THE HERO BACKGROUND
// ---------------------------------------------------------
const canvas = document.getElementById("microbes");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let microbes = [];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}
function makeMicrobes() {
  const count = Math.min(28, Math.floor(canvas.offsetWidth / 45));
  microbes = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.offsetWidth, y: Math.random() * canvas.offsetHeight,
    len: 10 + Math.random() * 22, w: 5 + Math.random() * 5,
    angle: Math.random() * Math.PI * 2, spin: (Math.random() - 0.5) * 0.004,
    vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
    round: Math.random() < 0.35,
    hue: Math.random() < 0.6 ? "primary" : "accent"
  }));
}
function draw() {
  const styles = getComputedStyle(root);
  const colors = { primary: styles.getPropertyValue("--primary").trim(), accent: styles.getPropertyValue("--accent").trim() };
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  ctx.clearRect(0, 0, W, H);
  microbes.forEach(m => {
    m.x += m.vx; m.y += m.vy; m.angle += m.spin;
    if (m.x < -40) m.x = W + 40; if (m.x > W + 40) m.x = -40;
    if (m.y < -40) m.y = H + 40; if (m.y > H + 40) m.y = -40;
    ctx.save();
    ctx.translate(m.x, m.y); ctx.rotate(m.angle);
    ctx.strokeStyle = colors[m.hue]; ctx.fillStyle = colors[m.hue]; ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (m.round) ctx.arc(0, 0, m.w, 0, Math.PI * 2);
    else if (ctx.roundRect) ctx.roundRect(-m.len / 2, -m.w / 2, m.len, m.w, m.w / 2);
    else ctx.rect(-m.len / 2, -m.w / 2, m.len, m.w);
    ctx.globalAlpha = 0.12; ctx.fill();
    ctx.globalAlpha = 0.4; ctx.stroke();
    ctx.restore();
  });
  if (!reduceMotion) requestAnimationFrame(draw);
}
resizeCanvas(); makeMicrobes(); draw();
window.addEventListener("resize", () => { resizeCanvas(); makeMicrobes(); if (reduceMotion) draw(); });


// ---------------------------------------------------------
// 12. READING PROGRESS BAR + BACK-TO-TOP BUTTON
// ---------------------------------------------------------
const progress = document.getElementById("progress");
const topBtn = document.getElementById("topBtn");
function onScroll() {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0) + ")";
  topBtn.classList.toggle("show", window.scrollY > 900);
}
window.addEventListener("scroll", onScroll, { passive: true });
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
onScroll();

// ---------------------------------------------------------
// 13. SOFT SPOTLIGHT THAT FOLLOWS THE MOUSE ON CARDS
// ---------------------------------------------------------
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".card, .outreach, .pub, .gl-tile, .connect").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
    el.addEventListener("pointerleave", () => { el.style.removeProperty("--mx"); el.style.removeProperty("--my"); });
  });
}

// ---------------------------------------------------------
// 14. JOURNEY TIMELINE ARROWS
// ---------------------------------------------------------
const track = document.getElementById("journeyTrack");
const jPrev = document.getElementById("jPrev"), jNext = document.getElementById("jNext");
if (track) {
  const step = () => track.querySelector(".j-item").offsetWidth + 22;
  const update = () => {
    jPrev.disabled = track.scrollLeft < 10;
    jNext.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 10;
  };
  jPrev.addEventListener("click", () => track.scrollBy({ left: -step() * 2 }));
  jNext.addEventListener("click", () => track.scrollBy({ left: step() * 2 }));
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}


// ---------------------------------------------------------
// 15. MOVING RIBBONS (research interests, partners)
//     The list is copied once so it can loop without a gap.
// ---------------------------------------------------------
document.querySelectorAll("[data-marquee]").forEach(track => {
  [...track.children].forEach(li => {
    const c = li.cloneNode(true);
    c.setAttribute("aria-hidden", "true");
    c.removeAttribute("data-i18n");
    track.appendChild(c);
  });
  track.style.setProperty("--dur", Math.max(30, track.children.length * 3.2) + "s");
});
// keep the copied chips in the visitor's language
window.onLangChange(() => {
  document.querySelectorAll("[data-marquee]").forEach(track => {
    const items = [...track.children], half = items.length / 2;
    for (let i = 0; i < half; i++) items[i + half].innerHTML = items[i].innerHTML;
  });
});

// ---------------------------------------------------------
// 16. SLIDING PHOTO GALLERY
// ---------------------------------------------------------
(function carousel() {
  const box = document.getElementById("carousel");
  if (!box) return;
  const track = document.getElementById("carTrack");
  const slides = [...track.children];
  const dots = document.getElementById("carDots");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0, timer = null, hovering = false, visible = false;

  slides.forEach((_, i) => {
    const d = document.createElement("button");
    d.type = "button"; d.setAttribute("aria-label", (i + 1) + " / " + slides.length);
    d.addEventListener("click", () => { go(i); restart(); });
    dots.appendChild(d);
  });
  function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    [...dots.children].forEach((d, j) => d.classList.toggle("active", j === index));
    slides.forEach((sl, j) => sl.classList.toggle("is-active", j === index));
    const next = slides[(index + 1) % slides.length].querySelector("img");
    if (next) next.loading = "eager";           // load the next photo in advance
  }
  function play() { stop(); if (!reduce && visible && !hovering && lb.hidden) timer = setInterval(() => go(index + 1), 5000); }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { play(); }
  document.getElementById("carPrev").addEventListener("click", () => { go(index - 1); restart(); });
  document.getElementById("carNext").addEventListener("click", () => { go(index + 1); restart(); });
  box.addEventListener("mouseenter", () => { hovering = true; stop(); });
  box.addEventListener("mouseleave", () => { hovering = false; play(); });
  box.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") { go(index - 1); restart(); }
    if (e.key === "ArrowRight") { go(index + 1); restart(); }
  });

  // swipe with a finger or mouse
  let x0 = null, swiped = false;
  track.addEventListener("pointerdown", e => { x0 = e.clientX; swiped = false; });
  track.addEventListener("pointerup", e => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 45) { swiped = true; go(index + (dx < 0 ? 1 : -1)); restart(); }
  });
  track.addEventListener("click", e => { if (swiped) { e.stopPropagation(); e.preventDefault(); swiped = false; } }, true);

  new IntersectionObserver(en => { visible = en[0].isIntersecting; visible ? play() : stop(); }, { threshold: 0.3 }).observe(box);
  new MutationObserver(() => (lb.hidden ? play() : stop())).observe(lb, { attributes: true, attributeFilter: ["hidden"] });
  go(0);
})();

// Apply the saved language last (after everything is built)
applyLang();
