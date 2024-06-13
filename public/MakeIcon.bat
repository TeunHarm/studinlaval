@echo off

magick convert -density 256x256 -background transparent logo.png -define icon:auto-resize -colors 256 favicon.ico

pause