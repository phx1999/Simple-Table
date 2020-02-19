function onClickAddRecord() {
    let license = document.forms[0]["License Plate Number"].value;
    let Entrance = document.forms[0]["Entrance Number"].value;
    let StaffNumber = document.forms[0]["Staff Number"].value;
    let ahour = document.getElementById("ahour").value;
    let aminute = document.getElementById("aminute").value;
    let year = document.getElementById("year").value;
    let month = document.getElementById("month").value;
    let day = document.getElementById("day").value;
    let dhour = document.getElementById("dhour").value;
    let dminute = document.getElementById("dminute").value;
    if (dhour<ahour ){
        alert("arrive time should be earlier than departure time")
    }else if (dhour==ahour &&dminute<aminute){
        alert("arrive time should be earlier than departure time")
    }
    else if (validateInput(license, Entrance, StaffNumber) && noTwice(license, ahour, aminute,year,month,day)) {
        addRow();
    }

}

function noTwice(license, ahour, aminute,year,month,day) {
    license="粤B"+license;
    let bodyObj = document.getElementById("tbody");
    if (bodyObj === null) {
        return true;
    } else {
        let rowCount = bodyObj.rows.length;
        for (let i = 0; i < rowCount; i++) {
            let cellCount = bodyObj.rows[i].cells.length;
            let rows = bodyObj.rows[i];
            let ar = ahour + ":" + aminute;
            let date= year + "/" + month + "/" + day;
            if (license == rows.cells[0].innerHTML && date == rows.cells[2].innerHTML && ar == rows.cells[3].innerHTML) {
                alert("there is a same record about the same license in the same time");
                return false
            }
        }
    }
    return true
}

function OpenAdd() {
    let addrecord = document.getElementById("addrecord");
    addrecord.style.display = "block";
}

function CloseAdd() {
    let addrecord = document.getElementById("addrecord");
    addrecord.style.display = "none";
}

function validateInput(license, Entrance, StaffNumber) {
    let licenseRegex5 = new RegExp(/^[A-Z0-9]{5}$/);
    let licenseRegex6 = new RegExp(/^[D-F][A-Z0-9]{5}$/);//两种情况
    let EntranceRegex = new RegExp(/^[1-7]$/);
    let StaffNumberRegex3 = new RegExp(/^[3][0-9]{7}$/);
    let StaffNumberRegex5 = new RegExp(/^[5][0-9]{7}#/);
    if (!licenseRegex5.test(license) && !licenseRegex6.test(license)) {
        alert("Invalid	license");
        return false;
    }
    if (!EntranceRegex.test(Entrance)) {
        alert("Invalid	Entrance");
        return false;
    }
    if (!StaffNumberRegex3.test(StaffNumber) && !StaffNumberRegex5.test(StaffNumber)) {
        alert("Invalid	StaffNumber");
        return false;
    }
    return true;
}

function initial() {
    let year = document.getElementById("year");
    year.innerHTML = "";
    year.options.add(new Option("--", null));
    for (let i = 2000; i <= 2020; i++) {
        year.options.add(new Option(i, i));
    }
    let dhour = document.getElementById("dhour");
    dhour.innerHTML = "";
    dhour.options.add(new Option("--", null));
    for (let i = 1; i <= 24; i++) {
        if (i <= 9)
            i = "0" + i;
        dhour.options.add(new Option(i, i));
    }
    let ahour = document.getElementById("ahour");
    ahour.innerHTML = "";
    ahour.options.add(new Option("--", null));
    for (let i = 1; i <= 24; i++) {
        if (i <= 9)
            i = "0" + i;
        ahour.options.add(new Option(i, i));
    }

}

function setMonth() {
    let month = document.getElementById("month");
    month.innerHTML = "";
    month.options.add(new Option("--", null));
    for (let i = 1; i <= 12; i++) {
        if (i <= 9)
            i = "0" + i;
        month.options.add(new Option(i, i));
    }
}

function setDay() {
    let year = document.getElementById("year").value;
    let month = document.getElementById("month").value;
    let day = document.getElementById("day");
    let data = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    //	clear	the	items
    day.innerHTML = "";
    //	add	new	items
    day.options.add(new Option("--", null));
    for (let i = 1; i <= data[month - 1]; i++) {
        if (i <= 9)
            i = "0" + i;
        day.options.add(new Option(i, i));
    }
    if (((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) && month == 2
    ) {
        day.options.add(new Option(29, 29));
    }
}

function setdminute() {
    let dminute = document.getElementById("dminute");
    dminute.innerHTML = "";
    dminute.options.add(new Option("--", null));
    for (let i = 1; i <= 60; i++) {
        if (i <= 9)
            i = "0" + i;
        dminute.options.add(new Option(i, i));
    }
}

function setaminute() {
    let aminute = document.getElementById("aminute");
    aminute.innerHTML = "";
    aminute.options.add(new Option("--", null));
    for (let i = 1; i <= 60; i++) {
        if (i <= 9)
            i = "0" + i;
        aminute.options.add(new Option(i, i));
    }
}

function addRow() {
    let bodyObj = document.getElementById("tbody");
    if (bodyObj === null) {
        alert("Body	of	Table	not	Exist!");
        return;
    }
    let year = document.getElementById("year").value;
    let month = document.getElementById("month").value;
    let day = document.getElementById("day").value;
    let dhour = document.getElementById("dhour").value;
    let dminute = document.getElementById("dminute").value;
    let ahour = document.getElementById("ahour").value;
    let aminute = document.getElementById("aminute").value;
    let Status = getRadioValue("Status");
    let rowCount = bodyObj.rows.length;
    let cellCount = bodyObj.rows[0].cells.length;
    bodyObj.style.display = ""; //	display	the	tbody
    let newRow = bodyObj.insertRow(rowCount++);
    newRow.insertCell(0).innerHTML = "粤B"+document.forms[0]["License Plate Number"].value;
    newRow.insertCell(1).innerHTML = document.forms[0]["Entrance Number"].value;
    if (year == "null")
        newRow.insertCell(2).innerHTML = "empty";
    else
        newRow.insertCell(2).innerHTML = year + "/" + month + "/" + day;
    if (ahour == "null")
        newRow.insertCell(3).innerHTML = "empty";
    else
        newRow.insertCell(3).innerHTML = ahour + ":" + aminute;
    if (Status == "In") {
        newRow.insertCell(4).innerHTML = "--";
    } else
        newRow.insertCell(4).innerHTML = dhour + ":" + dminute;
    newRow.insertCell(5).innerHTML = document.forms[0]["Staff Name"].value;
    newRow.insertCell(6).innerHTML = document.forms[0]["Staff Number"].value;
    newRow.insertCell(7).innerHTML = Status;
    newRow.insertCell(8).innerHTML = bodyObj.rows[0].cells[cellCount - 1].innerHTML; //	copy	the	"delete"	button
    bodyObj.rows[0].style.display = "none"; //	hide	first	row
}

function getRadioValue(radioName) {
    let radios = document.getElementsByName(radioName);
    let value;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            value = radios[i].value;
            break;
        }
    }
    return value;
}

function removeRow(inputobj) {
    if (inputobj == null) return;
    let parentTD = inputobj.parentNode;
    let parentTR = parentTD.parentNode;
    let parentTBODY = parentTR.parentNode;
    parentTBODY.removeChild(parentTR);
}