@echo off
chcp 65001 >nul
echo ========================================================
echo   🧹 OTIMIZADOR & LIMPADOR AVANTE LINGERIE (WINDOWS)
echo ========================================================
echo.
echo 1. Finalizando processos órfãos em segundo plano (node, git)...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM git.exe >nul 2>&1
echo    ✓ Processos em segundo plano liberados.
echo.
echo 2. Removendo travas órfãs do Git e caches temporários...
if exist ".git\index.lock" del /F /Q ".git\index.lock" >nul 2>&1
if exist "apps\web\node_modules\.vite" rmdir /S /Q "apps\web\node_modules\.vite" >nul 2>&1
if exist "dist" rmdir /S /Q "dist" >nul 2>&1
if exist "apps\web\dist" rmdir /S /Q "apps\web\dist" >nul 2>&1
echo    ✓ Travas e caches temporários limpos com sucesso.
echo.
echo ========================================================
echo   ✅ AMBIENTE 100% LIMPO E DESTRAVADO!
echo ========================================================
timeout /t 3 >nul
