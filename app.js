document.addEventListener("DOMContentLoaded", async () => {

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");

    const refreshBtn = document.getElementById("refresh");
    const printBtn = document.getElementById("print");
    const latestBtn = document.getElementById("today");
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
            Viewer.render(rota);

        } catch (err) {

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
        Viewer.render(rota);
        } catch (err) {

            console.error(err);
            error.classList.remove("hidden");

        } finally {

            loading.classList.add("hidden");

        }

    }

    async function loadArchive() {

        try {

            publishedWeeks = await RotaAPI.loadPublishedWeeks();

            if (!weekSelect) return;

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

    refreshBtn.onclick = () => {

        if (publishedWeeks.length === 0)
            showLatest();
        else
            showWeek(publishedWeeks[currentIndex].week);

    };

    printBtn.onclick = () => window.print();

    latestBtn.onclick = () => {

        if (publishedWeeks.length === 0) {

            showLatest();
            return;

        }

        currentIndex = publishedWeeks.length - 1;

        weekSelect.selectedIndex = currentIndex;

        showWeek(
    String(publishedWeeks[currentIndex].week).substring(0,10)
);
    };

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
