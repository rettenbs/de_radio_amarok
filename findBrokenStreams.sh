#!/bin/bash

#/***************************************************************************
# findBrokenStreams.sh - script to find borken radio stream urls
#                             -------------------                            
#    begin                : Feb 2009                                         
#    copyright            : (C) 2009-2011 by Andreas Wuest                        
#    email                : andreaswuest@gmx.de                                                
# ***************************************************************************/                 

#/***************************************************************************
# *                                                                         *
# *   This program is free software; you can redistribute it and/or modify  *
# *   it under the terms of the GNU General Public License as published by  *
# *   the Free Software Foundation; either version 2 of the License, or     *
# *   (at your option) any later version.                                   *
# *                                                                         *
# ***************************************************************************/

# set -x

CURL=$(type -p curl)
if [ -z "$CURL" ]; then 
  echo "curl is required for the script to run !"
  exit 1;  
fi

runCheck() {
  # get the list of the urls from the file
  STREAMS=$(cat $1 | cut -f2 -d, | grep $2) 
  for stream in $STREAMS 
  do
    # download the playlist files 
    HTTP_CODE=$(curl --write-out '%{http_code}' --max-filesize 10000 --output /dev/null --url $stream  2> /dev/null)
    # if the return code is != 200 we got an error
    if [ $HTTP_CODE -eq "301" ]; then 
      echo "$HTTP_CODE : $stream"
    elif [ $HTTP_CODE -eq "404" ]; then
      echo "$HTTP_CODE : $stream"
    elif [ $HTTP_CODE -eq "000" ]; then
      echo "$HTTP_CODE : $stream"
    elif [ ! $HTTP_CODE -eq "200" ]; then
      echo "$HTTP_CODE : $stream"
    fi
  done 

}

# streams have to be handled different
runCheckStream() {
  # get the list of the urls from the file
  STREAMS=$(cat $1 | cut -f2 -d, | grep $2) 
  for stream in $STREAMS 
  do
    # download streram
    curl --write-out '%{http_code}' --max-filesize 10000 --output /dev/null --url $stream 2> /dev/null &
    PID=$!
    # and kill the process 5 seconds later
    sleep 5
    RESULT=$(ps --pid $PID | grep curl | wc -l)
    # kill process and suppress message, by killing it in the background
    ( kill -s SIGHUP $PID 2> /dev/null ) &
    wait $PID 2>/dev/null
    if [ ! "$RESULT" -eq "1" ]; then
      echo " FAILED : $stream"
    fi
  done 

}

echo "Checking the file $1 for broken streams !"
echo 

runCheck $1 "m3u"
runCheck $1 "pls"
runCheck $1 "xspf"
runCheck $1 "wsx"
runCheck $1 "wax"
runCheck $1 "asx"
runCheckStream $1 "\.ogg"
runCheckStream $1 "\.mp3"
runCheckStream $1 "vtuner"

echo 
echo "DONE !"
