@echo off
echo ==========================================
echo  Regnum Consulting - Development Server
echo ==========================================
echo.

REM Set development environment
set NODE_ENV=development

echo Starting secure development server...
echo.
echo Server will be available at:
echo  - Local:   http://localhost:3000
echo.
echo Security features enabled:
echo  - Rate limiting
echo  - Security headers
echo  - Path traversal protection
echo  - Input validation
echo.
echo Press Ctrl+C to stop the server
echo.

REM Run the secure Node.js server
node server.js
