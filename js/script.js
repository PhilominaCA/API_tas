// country dropdown values fetch

const countList = async() => {
    try {
        const cnty = await fetch(`https://api.getfestivo.com/v2/countries?api_key=4c68d56701acff769b51316be9b56115`);
        const countryJson = await cnty.json();
        let cntryTag = document.getElementById("country");
        for (let i = 0; i < (countryJson.length); i++) {
            let optionTag = document.createElement("option");
            optionTag.value = countryJson[i].codeAlpha2;
            optionTag.innerHTML = countryJson[i].name;
            cntryTag.appendChild(optionTag);
        }
    } catch (error) {
        console.log(error);
    }
};
countList();

async function getChurchOc() {

    //get month and country value from user
    var selectMonth =
        (document.querySelector('#month')).value;
    var selectCntry =
        (document.querySelector('#country')).value;

    //check for null value
    if (selectCntry == "") {
        document.getElementById("cal_data_disp").innerHTML = `<h2>Please select a Country !!!</h2>`;
    } else if (selectMonth == "") {
        document.getElementById("cal_data_disp").innerHTML = `<h2>Please select a month !!!</h2>`;
    } else {
        //fetch API data
        try {

            const calData = await fetch(`https://api.getfestivo.com/v2/holidays?country=${selectCntry}&year=2020&api_key=4c68d56701acff769b51316be9b56115`); //`http://calapi.inadiutorium.cz/api/v0/en/calendars/default/${year}/${month+1}`);

            //API data manipulation
            const calJson = await calData.json();
            var calDataDisp = document.getElementById("cal_data_disp");

            //clear the data before each reqeust
            calDataDisp.innerHTML = "";
            let dateObj = {};

            //Get selected month holiday dates
            for (let i = 0; i < (calJson.holidays).length; i++) {
                var calDate = new Date(calJson.holidays[i].date);
                if (parseInt(calDate.getMonth()) == parseInt(selectMonth) - 1) {
                    dateObj[calJson.holidays[i].date] = [];
                }
            }

            //check if any holidays available
            if (Object.keys(dateObj).length == 0) {
                document.getElementById("cal_data_disp").innerHTML = `<h2>Sorry! No Holidays in this month.. </h2>`;

            } else {
                //if available get holiday note
                for (let j = 0; j < (calJson.holidays).length; j++) {
                    try {
                        (dateObj[calJson.holidays[j].date]).push(calJson.holidays[j].name);
                    } catch (ex) {
                        console.log(ex);
                    }
                }

                //grid creation
                for (let i of Object.keys(dateObj)) {
                    var dateDiv = document.createElement("div");
                    dateDiv.id = "dateDiv";
                    var dateSpan = document.createElement("span");
                    dateSpan.id = "date";
                    dateSpan.innerHTML = i;
                    var occSpan = document.createElement("span");
                    occSpan.id = "occSpan";
                    dateDiv.appendChild(dateSpan);
                    dateDiv.appendChild(occSpan);
                    calDataDisp.appendChild(dateDiv);

                    for (let j = 0; j < dateObj[i].length; j++) {
                        let ooccSpan = document.querySelectorAll("#occSpan");
                        let occDiv = document.createElement("div");
                        occDiv.innerHTML = dateObj[i][j];
                        occDiv.style.background = "white";
                        occDiv.id = "occDiv";
                        ooccSpan[ooccSpan.length - 1].appendChild(occDiv);
                    }
                }
            }

        }

        //Error Handle
        catch (err) {
            document.getElementById("cal_data_disp").innerHTML = `<h2>Sorry! Can't fetch the data now! Please try agin Later..</h2>`;
            console.log(err);
        }
    }
}