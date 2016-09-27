#!/bin/bash
set -x
RADIO="sunshinelive";
STREAMTYPE="livestream.mp3";
TOKEN_URL="http://edge.download.newmedia.nacamar.net/sltokens/stream-radio-player.php?stream=$RADIO/$STREAMTYPE";
STREAM_URL="http://edge.download.newmedia.nacamar.net/sltokens/flashplayer/ajax_backend.php?adid=0&content=live&media=mp3&stream=$RADIO/$STREAMTYPE3&token=";
TOKEN=`wget -qO- $TOKEN_URL | grep $STREAMTYPE | cut -d \" -f2`;
STREAM_URL=`wget -qO- $STREAM_URL$TOKEN`
echo "sunshine-live.de Stream: "$STREAM_URL;

