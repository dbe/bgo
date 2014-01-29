#!/bin/sh

echo "Cleaning old pipes"
rm ~/Desktop/in
rm ~/Desktop/out

echo "Making new pipes"
mkfifo -m 755 ~/Desktop/in
mkfifo -m 755 ~/Desktop/out


echo "Starting GnuGo"
tail -n1 -f ~/Desktop/in | gnugo --mode gtp --metamachine >> ~/Desktop/out &
echo "Successfully started"

echo "Putting something in the input side of the pipes"
echo "get_komi" >> ~/Desktop/in

echo "Reading output to flush script"
head -1 ~/Desktop/out

echo "PID: $(ps aux | grep gnugo | grep -v grep | awk '{print $2}')"
