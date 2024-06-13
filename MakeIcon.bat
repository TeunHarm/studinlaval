@echo off

magick convert -density 256x256 -background transparent public/logo.png -define icon:auto-resize -colors 256 public/favicon.ico

pause