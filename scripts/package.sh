#!/bin/bash

#/***************************************************************************
# package.sh - create the archive that can be published
#                             -------------------                            
#    begin                : Oct 2016                                         
#    copyright            : (C) 2016 by Sebastian Rettenberger
#    email                : develop@rettich.bayern
# ***************************************************************************/                 

#/***************************************************************************
# *                                                                         *
# *   This program is free software; you can redistribute it and/or modify  *
# *   it under the terms of the GNU General Public License as published by  *
# *   the Free Software Foundation; either version 2 of the License, or     *
# *   (at your option) any later version.                                   *
# *                                                                         *
# ***************************************************************************/

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SRC_DIR=$DIR/..

rm -f "$SRC_DIR/de_radio_amarok.amarokscript.tar"
rm -f "$SRC_DIR/de_radio_amarok.amarokscript.tar.bz2"

tar -cvf de_radio_amarok.amarokscript.tar -C "$SRC_DIR" --transform 's,^,de_radio_amarok/,' script.spec *.js *.png sender.txt changelog.txt
bzip2 -z9 de_radio_amarok.amarokscript.tar
