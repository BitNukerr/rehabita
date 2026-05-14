@echo off
setlocal
cd /d "%~dp0"

set "NODE_EXE=node"
where node >nul 2>nul
if errorlevel 1 (
  if exist "%LOCALAPPDATA%\OpenAI\Codex\bin\node.exe" (
    set "NODE_EXE=%LOCALAPPDATA%\OpenAI\Codex\bin\node.exe"
  ) else (
    echo Node.js was not found on this computer.
    echo Opening the static website file instead.
    start "" "%~dp0index.html"
    pause
    exit /b
  )
)

echo Starting website preview...
echo.
echo Open this address in your browser:
echo http://127.0.0.1:4173
echo.
start "re-habita preview server" cmd /k ""%NODE_EXE%" server.js"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4173"
echo.
echo If the browser does not open, copy this address:
echo http://127.0.0.1:4173
echo.
pause
