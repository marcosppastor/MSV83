@echo off
@title MapleStoryGMS v1.0
set CLASSPATH=.;dist\*
java -Xmx600m -Dwzpath=wz\  net.server.Server

pause