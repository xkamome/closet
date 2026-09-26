# run-loop.ps1 — unattended loop runner (Harness Constitution Article IV.5)
# One FRESH claude session per iteration, resuming via STATUS.md, to avoid context rot.
# Run from the project root (where this file was copied by apply.ps1).
#
# Usage:
#   .\run-loop.ps1                        # 10 runs max, sonnet, acceptEdits
#   .\run-loop.ps1 -MaxRuns 20 -Model haiku
#   .\run-loop.ps1 -SkipPermissions       # for true unattended runs; hooks still enforce the constitution
#
# PS 5.1 compatible (no &&, no ternary).

param(
    [int]$MaxRuns = 10,
    [string]$Model = "sonnet",
    [string]$PromptFile = "PROMPT.md",
    [switch]$SkipPermissions
)

$ErrorActionPreference = "Stop"
$root = (Get-Location).Path

# ---- preflight: Constitution III.1 — no acceptance, no loop ----
if (-not (Test-Path "$root\loop.config.json")) { Write-Error "loop.config.json missing - run apply.ps1 first"; exit 1 }
if (-not (Test-Path "$root\ACCEPTANCE.md")) { Write-Error "ACCEPTANCE.md missing - define acceptance first (constitution III.1)"; exit 1 }
if (-not (Test-Path "$root\$PromptFile")) { Write-Error "$PromptFile missing"; exit 1 }
$cfg = Get-Content "$root\loop.config.json" -Raw | ConvertFrom-Json
if (-not $cfg.verify -or $cfg.verify.Count -eq 0) { Write-Error "loop.config.json has no verify commands (constitution III.1)"; exit 1 }
if ($cfg.mode -ne "unattended") {
    Write-Warning "loop.config.json mode is '$($cfg.mode)' - unattended runs should set mode=unattended (stricter guards)."
}

New-Item -ItemType Directory -Force "$root\_logs" | Out-Null

function Invoke-Verify {
    foreach ($cmd in $cfg.verify) {
        Write-Host "  verify: $cmd"
        cmd /c $cmd | Out-File -Append -Encoding utf8 "$root\_logs\verify.log"
        if ($LASTEXITCODE -ne 0) { return $false }
    }
    return $true
}

# ---- arm the stop gate ----
[System.IO.File]::WriteAllText("$root\.claude\loop-state.json", '{"iteration":0}', (New-Object System.Text.UTF8Encoding $false))

$prompt = Get-Content "$root\$PromptFile" -Raw
$passed = $false

for ($i = 1; $i -le $MaxRuns; $i++) {
    Write-Host "=== run $i/$MaxRuns ($(Get-Date -Format 'HH:mm:ss')) ===" -ForegroundColor Cyan
    $log = "$root\_logs\run-$i.log"

    $claudeArgs = @("-p", "--model", $Model)
    if ($SkipPermissions) { $claudeArgs += "--dangerously-skip-permissions" }
    else { $claudeArgs += @("--permission-mode", "acceptEdits") }

    $prompt | & claude @claudeArgs | Out-File -Encoding utf8 $log
    Write-Host "  session ended, log: $log"

    if (Invoke-Verify) { $passed = $true; break }
    Write-Host "  verification failed - next iteration resumes from STATUS.md" -ForegroundColor Yellow
}

# ---- disarm & report ----
if (Test-Path "$root\.claude\loop-state.json") { Remove-Item "$root\.claude\loop-state.json" -Force }

if ($passed) {
    Write-Host "LOOP PASSED after $i run(s). Review STATUS.md + _artifacts/ before trusting it." -ForegroundColor Green
    exit 0
} else {
    Write-Host "LOOP FAILED after $MaxRuns runs. See STATUS.md (BLOCKER entries) and _logs/." -ForegroundColor Red
    exit 1
}
