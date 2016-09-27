/*#########################################################################
#                                                                         #
#   Simple script shamelessly recopied from Cool Streams                  #
#                                                                         #
#   Copyright                                                             #
#   (C) 2007, 2008 Nikolaj Hald Nielsen  <nhnFreespirit@gmail.com>        #
#   (C)       2008 Peter ZHOU <peterzhoulei@gmail.com>                    #
#   (C)       2008 Mark Kretschmann <kretschmann@kde.org>                 #
#   (C)       2008 Georges Dubus <georges.dubus@supelec.fr>               #
#   (C)       2008 Nickolay Bunev <just4nick@gmail.com>                   #
#   (C)       2008 Andreas Wuest <andreaswuest@gmx.de>                    #
#                                                                         #
#   This program is free software; you can redistribute it and/or modify  #
#   it under the terms of the GNU General Public License as published by  #
#   the Free Software Foundation; either version 2 of the License, or     #
#   (at your option) any later version.                                   #
#                                                                         #
#   This program is distributed in the hope that it will be useful,       #
#   but WITHOUT ANY WARRANTY; without even the implied warranty of        #
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         #
#   GNU General Public License for more details.                          #
#                                                                         #
#   You should have received a copy of the GNU General Public License     #
#   along with this program; if not, write to the                         #
#   Free Software Foundation, Inc.,                                       #
#   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.         #
##########################################################################*/

/*
# the following pages seem to contain a rather complete radio stream list :-)
#
# http://de.delicast.com/radio/Deutschland/t:1/Fritz
# http://www.realradios.com/europe/germany
# http://www.radio-ech.de/links_r.html
# http://www.listenlive.eu/germany.html 
# http://tiscali.project-fx.de/
# http://de.wikipedia.org/wiki/Hochschulradio
# http://www.antenne.de/antenne/radio/frequenzen/stream.php
# http://www.yourmuze.fm/station/radio-7'
# http://www.radiosure.com/stations/
*/

Importer.loadQtBinding("qt.core");
Importer.loadQtBinding("qt.gui");

function Station( name, url, homepage, favicon, logo )
{
    this.name = name;
    this.url = url;
    this.homepage = homepage;
    this.favicon = favicon;
    // this.logo = logo;
    this.logo = "";
}

Importer.include("sender.js");

// create after the sender.js import, so we can access the number of stations
script = new RadioDE();
script.populate.connect( onPopulating );
script.customize.connect( onCustomize );

function RadioDE()
{
    // last argument is the filter box 
    // length - 1, because we have one dummy
    ScriptableServiceScript.call( this, "Radio Germany", 1, "List of " + (stationArray.length - 1) + 
                                  " German Radio Stations", "Enjoy it", true );
}

function onPopulating( level, callbackData, filter )
{
    Amarok.debug( " Populating station level..." );
    Amarok.debug( " filter: " + filter );
    Amarok.debug( " Number stations: " + stationArray.length );

    filter = filter.replace( "%20", "" );
    var currentFilter = filter.toLowerCase(); 

    //add the station streams as leaf nodes
    for ( i = 0; i < stationArray.length; i++ )
    {
        streamItemName = stationArray[i].name.toLowerCase();
        if (( currentFilter == "" ) || ( streamItemName.indexOf( currentFilter ) != -1 )) {
            // skip the dummy with no name
            if (stationArray[i].name == "") {
              continue;
            }
            item = Amarok.StreamItem;
            item.level = 0;
            item.callbackData = "";
            item.itemName = stationArray[i].name;
            item.playableUrl = stationArray[i].url;

            // show logo, if not available show favicon
            item.infoHtml = "<center>Radiostream von  <b>" + item.itemName + "</b>.</br></center>";
            if ( stationArray[i].logo != "" ) {
                item.infoHtml += "<center><br><img width='50%' src='" + stationArray[i].logo + "'></br></br></center>";
	    } else if ( stationArray[i].favicon != "" ) {
                item.infoHtml += "<center><img src='" + stationArray[i].favicon + "'></br></center>";
	    }

            // link to homepage
            if (stationArray[i].homepage != "") {
                item.infoHtml += "<center><small>Homepage: <a href='" + 
                                 stationArray[i].homepage + "' target='_blank'>" + 
                                 stationArray[i].homepage + "</a></small></center>";
            }
            item.coverUrl = stationArray[i].favicon;
            script.insertItem( item );
        }
    }
    script.donePopulating();
}

function onCustomize() {
  Amarok.debug ( "loading icon: " + Amarok.Info.scriptPath() + "/icon.png" );
  var icon = new QPixmap( Amarok.Info.scriptPath() + "/icon.png" );
  script.setIcon( icon );

  Amarok.debug ( "loading pixmap: " + Amarok.Info.scriptPath() + "/emblem.png" );
  var emblem = new QPixmap( Amarok.Info.scriptPath() + "/emblem.png" );
  script.setEmblem( emblem );
  Amarok.debug ( "on customize: OK" );
}

