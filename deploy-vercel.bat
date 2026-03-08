@echo off
REM Quick deployment script for Regnum Consulting Website
REM This script helps deploy to Vercel

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   REGNUM CONSULTING - VERCEL DEPLOYMENT SCRIPT         ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Failed to install Vercel CLI
        echo Run: npm install -g vercel
        pause
        exit /b 1
    )
)

echo ✅ Vercel CLI found
echo.
echo Before deploying, ensure you have:
echo.
echo 1. Set environment variables in Vercel Dashboard:
echo.
echo 2. Connected Vercel to your Git repository (optional)
echo.

set /p DEPLOY_CHOICE="Deploy? (1=Yes, 2=No): "

if "%DEPLOY_CHOICE%"=="1" (
    echo.
    echo 🚀 Starting deployment...
    echo.
    vercel --prod
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ Deployment complete!
        echo.
        echo Your website is now live at: https://your-domain.vercel.app
        echo.
        echo Next steps:
        echo 1. Visit your deployment URL
        echo 2. Test all pages and functionality
        echo 3. Configure custom domain in Vercel Dashboard
        echo.
    ) else (
        echo.
        echo ❌ Deployment failed. Check the output above for errors.
        echo.
    )
) else (
    echo Deployment cancelled.
)

pause
