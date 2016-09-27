#!/bin/sh

# datei sender_de.txt kommt von joerg

cat sender_de.txt | awk -F, '{ printf "%s,%s,%s\n",$2,$3,$5}' | sort > sender_iso8859.txt
dos2unix sender_iso8859.txt
iconv -f ISO-8859-16 -t UTF-8 sender_iso8859.txt > sender.txt

