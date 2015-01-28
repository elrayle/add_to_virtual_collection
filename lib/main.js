var self = require("sdk/self");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;


var confirmation_dialog = require("sdk/panel").Panel({
    contentURL: data.url("text-entry.html"),
    contentScriptFile: data.url("get-text.js")
});


var worker = tabs.activeTab.attach({
    contentScriptFile: data.url("get-metadata-from-page.js")
});


// Create a extension button in toolbar
var button = require("sdk/ui/button/action").ActionButton({
    id: "add-to-virtual_collection",
    label: "Add to Virtual Collection",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: handleClick
});


// Show the panel when the user clicks the button.
function handleClick(state) {
    console.log("*** Entering handleClick");

    console.log("1");
    var source_content_extractor = tabs.activeTab.attach({
        contentScriptFile: data.url("get-metadata-from-page.js")
    });
    source_content_extractor.port.emit("extract-metadata");

    var title     = "";
    var author    = "";
    var format    = "";
    var image_url = "";
    source_content_extractor.port.on("metadata-extracted",function(xtitle,xauthor,xformat,ximage_url) {
        console.log("*** Entering source_content_extractor.port.on('metadata-extracted': title="+xtitle+", author="+xauthor+", format="+xformat+", image_url="+ximage_url+")");
        title     = "Eureka!";
        author    = xauthor;
        format    = "BoOk";
        image_url = "http://www.eureka.org/eureka.png";
//        title     = xtitle;
//        author    = xauthor;
//        format    = xformat;
//        image_url = ximage_url;
    });
    console.log("title     = "+title);
    console.log("author    = "+author);
    console.log("format    = "+format);
    console.log("image_url = "+image_url);
    confirmation_dialog.port.emit("show",title,author,format,image_url);

//    confirmation_dialog.show(title,author,format,image_url);
    console.log("3");
}


confirmation_dialog.on("show", function(title,author,format_image_url) {
    console.log("*** Entering confirmation_dialog.on('show'");
    console.log("title     = "+title);
    console.log("author    = "+author);
    console.log("format    = "+format);
    console.log("image_url = "+image_url);
    confirmation_dialog.port.emit("show",title,author,format,image_url);
});

confirmation_dialog.port.on("text-entered", function (text) {
    console.log("*** Entering confirmation_dialog.port.on('text-entered'");

    console.log(text);
    confirmation_dialog.hide();
});