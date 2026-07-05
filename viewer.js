class Viewer {

    static formatWeek(dateString) {

        const date = new Date(dateString);

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

    static render(data) {

        const container = document.getElementById("rotaContainer");

        container.innerHTML = "";

        document.getElementById("weekTitle").textContent =
            "Week Commencing " + Viewer.formatWeek(data.week);

        Object.entries(data.days || {}).forEach(([day, value]) => {

            let html = `
                <section class="daySection">

                    <h2>${day}</h2>

                    <table>

                        <tr>
                            <th>Theatre</th>
                            <th>ODP</th>
                            <th>2nd ODP</th>
                            <th>Anaesthetist</th>
                            <th>List</th>
                        </tr>
            `;

            (value.theatres || []).forEach(theatre => {

                html += `
                    <tr>

                        <td>${theatre.theatre || ""}</td>

                        <td>${theatre.odp1 || ""}</td>

                        <td>${theatre.odp2 || ""}</td>

                        <td>${theatre.anaesthetist || ""}</td>

                        <td>${theatre.list || ""}</td>

                    </tr>
                `;

            });

            html += `

                    </table>

                    <div class="infoBoxes">

                        <div class="infoCard">

                            <h3>Support</h3>

                            <p>ODP: ${value.support?.odp || "-"}</p>

                        </div>

                        <div class="infoCard">

                            <h3>On Call</h3>

                            <p>ODP: ${value.onCall?.odp || "-"}</p>

                            <p>Anaesthetist: ${value.onCall?.anaesthetist || "-"}</p>

                        </div>

                    </div>

                </section>
            `;

            container.innerHTML += html;

        });

    }

}
