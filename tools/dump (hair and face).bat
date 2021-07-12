@echo off
set CLASSPATH=.;dist\*
java -Dwzpath=wz\ tools.HairFaceDump false
pause  