@echo off
@title Criar propriedades.ini - MoopleDEV - CreatorINI
set CLASSPATH=.;dist\*
java -Xmx100m net.server.CreateINI
pause