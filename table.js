var selection;
var editMode = false;
function load() {
    list();
    if (localStorage.getItem("firstTime") == null) {
        openHelpMenu();
        localStorage.setItem("firstTime", "false");
    }
}
function addData() {
    let url = document.getElementById('URL').value;
    //guard - Make sure its a URL
    // if(!url.startsWith("http"))
    // {
    //     alert("Must be a URL");
    //     return;
    // }
    //Set size to 48 (if it's a discord emoji)
    if (url.startsWith("https://cdn.discordapp.com/emojis/") && url.includes("?size=")) {
        if (url.includes("&quality=loseless")) {
            url = url.split('?')[0];
            url = url + "?size=48&quality=loseless";
        }
        else {
            url = url.split('?')[0];
            url = url + "?size=48";
        }
    }
    var copyDataJson = JSON.parse(localStorage.getItem("copyData"));
    copyDataJson.push(url);
    localStorage.setItem("copyData", JSON.stringify(copyDataJson));
    list();
}
function list() {
    if (localStorage.getItem("copyData") == null) {
        localStorage.setItem("copyData", JSON.stringify(defaultData));
    }
    let imageList = document.getElementById('ImageList');
    let html = "";
    let copyDataJson = JSON.parse(localStorage.getItem("copyData"));
    for (var i = copyDataJson.length; i >= 0; i--) {
        html += image(copyDataJson[i], i);
    }
    imageList.innerHTML = html;
}
function copy(element, src, index) {
    if (!editMode) {
        navigator.clipboard.writeText(src);
        element.style.backgroundColor = "#8a8a8a";
        if (selection && selection != element) {
            selection.style.backgroundColor = null;
        }
        selection = element;
    }
    if (editMode) {
        var jsonValue = JSON.parse(localStorage.getItem("copyData"));
        jsonValue.splice(index, 1);
        localStorage.setItem("copyData", JSON.stringify(jsonValue));
        list();
    }
}
function image(url, index) {
    if (!url)
        return "";
    if (url.slice(0, 4) == "http") {
        return "<div class='item' onclick='copy(this, \"" + url + "\", \"" + index + "\")'><image src='" + url + " '/></div>";
    }
    else {
        if (url.length > 100) {
            return "<div class='item' onclick='copy(this, \"" + url + "\", \"" + index + "\")'>" + url.slice(0, 50) + "...</div>";
        }
        else {
            return "<div class='item' onclick='copy(this, \"" + url + "\", \"" + index + "\")'>" + url + "</div>";
        }
    }
}
