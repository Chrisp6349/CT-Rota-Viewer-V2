/* ============================================
   CT Rota Viewer Version 1.0
   Main Viewer Controller

   Modules:
   - viewer-utils.js
   - viewer-oncall.js
   - viewer-theatres.js
   - viewer-support.js
============================================ */
class Viewer {

    static formatWeek(dateString) {

        const parts = dateString.split("-");

const date = new Date(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2])
);
        const months = [
            "January","February","March","April","May","June",
            "July","August","September","October","November","December"
        ];

        const days = [
            "Sunday","Monday","Tuesday","Wednesday",
            "Thursday","Friday","Saturday"
        ];

        const d = date.getDate();

        let suffix = "th";

        if (d % 10 === 1 && d !== 11) suffix = "st";
        else if (d % 10 === 2 && d !== 12) suffix = "nd";
        else if (d % 10 === 3 && d !== 13) suffix = "rd";

        return `${days[date.getDay()]} ${d}${suffix} ${months[date.getMonth()]} ${date.getFullYear()}`;

    }
static renderOnCall(onCall) {
    return "";
}

static renderTheatres(theatres) {
    return "";
}

static renderSupport(support) {
    return "";
}
    static render(data) {

        const container = document.getElementById("rotaContainer");

        container.innerHTML = "";

        document.getElementById("weekTitle").textContent =
            "Week Commencing " + Viewer.formatWeek(data.week);

        Object.entries(data.days || {}).forEach(([day, value]) => {
let html = `
<section class="daySection">

    <h2 class="day-heading">${day}</h2>

    <div class="card">

        <div class="card-header oncall-header">
            🚨 ON CALL
        </div>

        <div class="card-body oncall-body">

            <div class="oncall-person">
                👤 ${value.onCall?.odp || "No allocation"}
            </div>

            ${
                value.onCall?.fromHome
                    ? `<div class="from-home">🏠 FROM HOME</div>`
                    : ``
            }

            <div class="oncall-anaesthetist">
                👨‍⚕️ ${value.onCall?.anaesthetist || "-"}
            </div>

        </div>

    </div>

    </div>

    <div class="cards-grid">
`;
  

(value.theatres || []).forEach(theatre => {

    let colour = "theatre1";

    switch (theatre.theatre) {
        case "Theatre 2":
            colour = "theatre2";
            break;

        case "Theatre 4":
            colour = "theatre4";
            break;

        case "Theatre 5":
            colour = "theatre5";
            break;

        case "Cath Lab":
            colour = "cathlab";
            break;
    }

    html += `
    <div class="card">

        <div class="card-header ${colour}">
            ${theatre.theatre}
        </div>

        <div class="card-body">
    `;

    if (
        !theatre.odp1 &&
        !theatre.odp2 &&
        !theatre.anaesthetist &&
        !theatre.list
    ) {

        html += `
            <div class="info">
                No allocation
            </div>
        `;

    } else {

        if (theatre.odp1)
            html += `<div class="person">👤 ${theatre.odp1}</div>`;

        if (theatre.odp2)
            html += `<div class="person">👤 ${theatre.odp2}</div>`;

        if (theatre.anaesthetist)
            html += `<div class="info">👨‍⚕️ ${theatre.anaesthetist}</div>`;

        if (theatre.list)
            html += `<div class="info">📋 ${theatre.list}</div>`;
    }

    html += `
        </div>
    </div>
    `;

});

html += `

</div>



<div class="cards-grid">

    <div class="card">

        <div class="card-header support-header">
            🟢 SUPPORT
        </div>

        <div class="card-body">

            ${
                value.support?.odp
                    ? `<div class="person">👤 ${value.support.odp}</div>`
                    : `<div class="info">No allocation</div>`
            }

            ${
                value.support?.list
                    ? `<div class="info">📋 ${value.support.list}</div>`
                    : ``
            }

        </div>

    </div>


</section>
`;

container.innerHTML += html;

});

}

}       
