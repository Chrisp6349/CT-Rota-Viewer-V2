document.addEventListener("DOMContentLoaded", async () => {

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");

    
    const previousBtn = document.getElementById("prevWeek");
    const nextBtn = document.getElementById("nextWeek");
    const weekSelect = document.getElementById("weekSelect");

    let publishedWeeks = [];
    let currentIndex = 0;

    async function showLatest() {

        loading.classList.remove("hidden");
        error.classList.add("hidden");

        try {

        const rota = await RotaAPI.loadRota();

rota.week = String(rota.week).substring(0,10);

const idx = publishedWeeks.findIndex(
    w => w.week === rota.week
);

if (idx >= 0) {
    currentIndex = idx;
    if (weekSelect) {
        weekSelect.selectedIndex = idx;
    }
}

Viewer.render(rota);        } catch (err) {

            console.error(err);
            error.classList.remove("hidden");

        } finally {

            loading.classList.add("hidden");

        }

    }

   async function showWeek(week) {

    week = String(week).substring(0,10);

    loading.classList.remove("hidden");
    error.classList.add("hidden");

    try {

        const rota = await RotaAPI.loadWeek(week);

rota.week = String(rota.week).substring(0,10);

Viewer.render(rota);        } catch (err) {

            console.error(err);
            error.classList.remove("hidden");

        } finally {

            loading.classList.add("hidden");

        }

    }

    async function loadArchive() {

        try {

            publishedWeeks = await RotaAPI.loadPublishedWeeks();
publishedWeeks = publishedWeeks
    .map(item => ({
        ...item,
        week: String(item.week).substring(0,10)
    }))
    .sort((a,b)=>a.week.localeCompare(b.week));            if (!weekSelect) return;

            weekSelect.innerHTML = "";

            publishedWeeks.forEach((item) => {

    const option = document.createElement("option");

    const week = String(item.week).substring(0, 10);

    option.value = week;

    option.textContent =
        "Week Commencing " +
        Viewer.formatWeek(week);

    weekSelect.appendChild(option);

});
            if (publishedWeeks.length > 0) {

                currentIndex = publishedWeeks.length - 1;

                weekSelect.selectedIndex = currentIndex;

            }

        } catch (err) {

            console.error(err);

        }

    }

  

    



    previousBtn.onclick = () => {

        if (currentIndex > 0) {

            currentIndex--;

            weekSelect.selectedIndex = currentIndex;

            showWeek(
    String(publishedWeeks[currentIndex].week).substring(0,10)
);
        }

    };

    nextBtn.onclick = () => {

        if (currentIndex < publishedWeeks.length - 1) {

            currentIndex++;

            weekSelect.selectedIndex = currentIndex;

            showWeek(
    String(publishedWeeks[currentIndex].week).substring(0,10)
);
        }

    };

    if (weekSelect) {

        weekSelect.onchange = () => {

            currentIndex = weekSelect.selectedIndex;

        showWeek(
    String(publishedWeeks[currentIndex].week).substring(0,10)
);
        };

    }

    await loadArchive();

    await showLatest();

});
