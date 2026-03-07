@echo off
echo ===================================================
echo Starting SehatSetu MERN + Blockchain Application...
echo ===================================================

echo [1/3] Starting Local Hardhat Blockchain Node...
start cmd /k "cd blockchain && npx hardhat node"

rem Wait 3 seconds for the node to initialize
timeout /t 3 /nobreak > nul

echo [2/3] Starting Node.js / Express Backend...
start cmd /k "cd backend && npm run dev"

echo [3/3] Starting Vite / React Frontend...
start cmd /k "npm run dev"

echo All services are starting in separate windows!
echo - Frontend: http://localhost:5175
echo - Backend: http://localhost:5000
echo - Blockchain: http://127.0.0.1:8545
echo ===================================================
