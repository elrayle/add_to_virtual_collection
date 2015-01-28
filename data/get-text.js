// When the user hits return, send the "text-entered"
// message to main.js.
// The message payload is the contents of the edit box.
var title_field     = document.getElementById("work_title");
var author_field    = document.getElementById("work_author");
var format_field    = document.getElementById("work_format");
var image_url_field = document.getElementById("work_image_url");


title_field.addEventListener('keyup', function onkeyup(event) {
    console.log("*** Entering textArea.addEventListener('keyup'");

    if (event.keyCode == 13) {
        // Remove the newline.
        text = title_field.value.replace(/(\r\n|\n|\r)/gm,"");
        self.port.emit("text-entered", text);
        title_field.value = '';
    }
}, false);


// Listen for the "show" event being sent from the
// main add-on code. It means that the panel's about
// to be shown.
//
// Set the focus to the text area so the user can
// just start typing.
self.port.on("show", function onShow(title,author,format,image_url) {
    console.log("*** Entering self.port.on('show'");

    title_field.value     = title;
    author_field.value    = author;
    format_field.value    = format;
    image_url_field.value = image_url;

    title_field.focus();
});