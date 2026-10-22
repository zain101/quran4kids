@echo off
cd /d "%~dp0"
set PORT=8765
echo Surah Lessons is starting at http://localhost:%PORT%
echo Keep this window open while you use the site. Close it to stop.
where py >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:%PORT%
  py -m http.server %PORT%
  goto :eof
)
where python >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:%PORT%
  python -m http.server %PORT%
  goto :eof
)
echo.
echo Python was not found on this computer.
echo You can still use the site: double-click index.html to open it.
pause
