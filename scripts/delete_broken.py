#!/usr/bin/python

#/***************************************************************************
# findBrokenStreams.py - script to delete broken radio streams
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

import sys

broken_streams = open(sys.argv[2])
all_broken_streams = '\n'.join(map(lambda x: x.split()[-1], broken_streams))
broken_streams.close()

streams = open(sys.argv[1])

for s in streams:
	if s.startswith('#'):
		print s,
	else:
		url = s.split(',')[1]
		if url in all_broken_streams:
			print '#' + s,
		else:
			print s,

streams.close()
