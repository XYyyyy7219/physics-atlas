@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Please install Node.js 24 LTS first.
  pause
  exit /b 1
)
if not exist "node_modules\astro\bin\astro.mjs" (
  echo Installing project dependencies. Internet access is required.
  call npm.cmd ci
  if errorlevel 1 goto failed
)
call npm.cmd run build
if errorlevel 1 goto failed
echo Open the Local URL shown below in your browser.
echo Keep this window open. Press Ctrl+C to stop.
call npm.cmd run preview
goto end
:failed
echo The command failed. Copy the error above and send it to Codex.
pause
:end
endlocal
