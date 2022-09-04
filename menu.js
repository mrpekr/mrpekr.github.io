function openEditMenu() {
    document.getElementById("EDITMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function openImportMenu() {
    document.getElementById("IMPORTMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function exportData() {
    download(localStorage.getItem("copyData").toString(), 'export.json', 'text/plain');
}
function closeMenu() {
    document.getElementById("EDITMENU").style.display = "none";
    document.getElementById("GRAYBACKGROUND").style.display = "none";
    document.getElementById("IMPORTMENU").style.display = "none";
    document.getElementById("DANGERMENU").style.display = "none";
    document.getElementById("resetDataPopUp").style.display = "none";
    document.getElementById("deleteAllPopUp").style.display = "none";
    document.getElementById("HELPMENU").style.display = "none";
}
function editSetUp() {
    editMode = true;
    closeMenu();
    document.getElementById("URL").style.display = "none";
    document.getElementById("EDITBUTTON").style.display = "none";
    document.getElementById("EDITMODE").style.display = "flex";
    document.getElementById("HELPBUTTON").style.display = "none";
}
function defaultMode() {
    editMode = false;
    closeMenu();
    document.getElementById("URL").style.display = "flex";
    document.getElementById("EDITBUTTON").style.display = "flex";
    document.getElementById("EDITMODE").style.display = "none";
    document.getElementById("HELPBUTTON").style.display = "flex";
}
function dangerSetup() {
    document.getElementById("DANGERMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function deleteAllPopUp() {
    closeMenu();
    document.getElementById("deleteAllPopUp").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function resetDataPopUp() {
    closeMenu();
    document.getElementById("resetDataPopUp").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function resetData() {
    closeMenu();
    localStorage.setItem("copyData", JSON.stringify(defaultData));
    list();
}
function deleteAll() {
    closeMenu();
    localStorage.setItem("copyData", JSON.stringify([]));
    list();
}
function openHelpMenu() {
    document.getElementById("HELPMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
async function loadFile(file) {
    let text = await file.text();
    closeMenu();
    let json = JSON.parse(text);
    for (var i = 0; i < json.length; i++) {
        let obj = json[i];
        if (obj.startsWith("https://cdn.discordapp.com/emojis/") && obj.includes("?size=")) {
            obj = obj.replace(/\d{2}$/, '48');
        }
        var copyDataJson = JSON.parse(localStorage.getItem("copyData"));
        copyDataJson.push(obj);
        localStorage.setItem("copyData", JSON.stringify(copyDataJson));
    }
    list();
}
