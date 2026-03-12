@echo off
echo ==========================================
echo  Regnum Consulting - Static Site Preview
echo ==========================================
echo.
if exist index.html (
    echo Opening index.html in default browser...
    start "" "index.html"
) else (
    echo ERROR: index.html not found in repository root.
)

echo Done. Open index.html manually if needed.
