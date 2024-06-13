@echo off

robocopy ./out/ ./out/map/ map.html /MOV
cd ./out/map/
ren map.html index.html
cd ../../

robocopy ./out/ ./out/list/ list.html /MOV
cd ./out/list/
ren list.html index.html
cd ../../

robocopy ./out/ ./out/events/ events.html /MOV
cd ./out/events/
ren events.html index.html
cd ../../

pause