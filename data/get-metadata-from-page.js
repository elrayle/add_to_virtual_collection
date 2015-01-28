self.port.on("extract-metadata", function() {
    console.log("*** Entering self.port.on('extract-metadata'");


    // TODO remove this line - sanity check that the script is running
    document.body.style.border = "6px solid red";


    // TODO:  grab title from page
    var wtitle = "Add work's title...";
//    var h2_elements = doc.getElementsByTagName("h2");
//    if( h2_elements.length > 0 ) {
//        wtitle = h2_elements.item(0).innerHTML;
//    }
    console.log("- set title to "+wtitle);


    // multiple metadata are stored in dd tags, so get them
    var dd_elements = document.getElementsByTagName("dd");
    console.log("- got dd_tags");
    console.log("- has dd_tags = ("+dd_elements.length+")");

    // grab author from page
    var wauthor = "Add author's name...";
    for( var i = 0; dd_elements.length > 0 && i < dd_elements.length; ++i ) {
        var dd = dd_elements.item(i);
        console.log("--  dd_elements["+i+"].className="+dd.className);
        if( dd.className == 'blacklight-author_display' ) {
            var links = dd.getElementsByTagName("a");
            if( links.length > 0 ) {
                wauthor = links[0].innerHTML;
            }
            else {
                wauthor = dd.innerHTML;
            }
        }
    }
    console.log("- set author to "+wauthor);

    // grab format from page
    var wformat = "Add work's format (e.g. Book, Video, Muscial Recording, etc.)...";
    for( var i = 0; dd_elements.length > 0 && i < dd_elements.length; ++i ) {
        var dd = dd_elements.item(i);
        console.log("--  dd_elements["+i+"].className="+dd.className);
        if( dd.className == 'blacklight-format' ) {
            wformat = dd.innerHTML;
        }
    }
    console.log("- set format to "+wformat);


    // TODO:  grab image_url from page
    var wimage_url = '';
    console.log("- set image_url to "+wimage_url);




    self.port.emit("metadata-extracted", wtitle,wauthor,wformat,wimage_url);

});