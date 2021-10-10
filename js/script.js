//calender fetch function
async function getChurchOc() {
    let defaultDt = document.getElementById("occDate").value;

    //check for null value
    if (defaultDt == "") {
        document.getElementById("cal_data_disp").innerHTML = `<h2>Please select a month & year!!!</h2>`;
    } else {
        let inputDt = new Date(defaultDt);
        let year = inputDt.getFullYear();
        let month = inputDt.getMonth();

        //fetch API data
        try {
            const calData = await fetch(`https://api.getfestivo.com/v2/holidays?country=IN&year=2020&api_key=4c68d56701acff769b51316be9b56115`); //`http://calapi.inadiutorium.cz/api/v0/en/calendars/default/${year}/${month+1}`);

            //API data manipulation
            const calJson = await calData.json();
            var calDataDisp = document.getElementById("cal_data_disp");

            //clear the data before each reqeust
            calDataDisp.innerHTML = "";

            for (let i = 0; i < (calJson.holidays).length; i++) {
                var dateDiv = document.createElement("div");
                dateDiv.id = "dateDiv";
                var dateSpan = document.createElement("span");
                dateSpan.id = "date";
                dateSpan.innerHTML = calJson.holidays[i].date;
                var occSpan = document.createElement("span");
                occSpan.id = "occSpan";
                dateDiv.appendChild(dateSpan);
                dateDiv.appendChild(occSpan);
                calDataDisp.appendChild(dateDiv);

                // for (let j = 0; j < calJson[i].celebrations.length; j++) {
                let ooccSpan = document.querySelectorAll("#occSpan");
                let occDiv = document.createElement("div");
                occDiv.innerHTML = calJson.holidays[i].name;
                occDiv.style.background = "white";
                occDiv.id = "occDiv";
                ooccSpan[i].appendChild(occDiv);
                // }
            }
        }

        //Error Handle
        catch (err) {
            document.getElementById("cal_data_disp").innerHTML = `<h2>Sorry! Can't fetch the data now! Please try agin Later..</h2>`;
            console.log(err);
        }
    }
}