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

        


