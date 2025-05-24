    let isDark = false;
    let isLoggedIn = true;

    function updateAuthUI() {
        document.getElementById("login-btn").style.display = isLoggedIn ? "none" : "inline-block";
        document.getElementById("signup-btn").style.display = isLoggedIn ? "none" : "inline-block";
        document.getElementById("logout-btn").style.display = isLoggedIn ? "inline-block" : "none";
    }

    function login() {
        isLoggedIn = true;
        alert("Logged in!");
        updateAuthUI();
    }

    function signup() {
        isLoggedIn = true;
        alert("Signed up and logged in!");
        updateAuthUI();
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const btn = document.getElementById("theme-toggle");
        btn.innerHTML = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
    }

    function signout() {
        alert("Signed out!");
        window.location.href = "index.html";
    };

    function backToDashboard() {
        alert("Back to Page");
        window.location.href = "dashboard.html";
    };


    function setmood(button, mood) {
    console.log("Mood set to:", mood);

    document.querySelectorAll(".emoji-row button").forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");

    let moodInput = document.getElementById("moodValue");
    if (!moodInput) {
        moodInput = document.createElement("input");
        moodInput.type = "hidden";
        moodInput.name = "mood";
        moodInput.id = "moodValue";
        document.getElementById("moodForm").appendChild(moodInput);
    }
    moodInput.value = mood;

    if (!document.getElementById("mood-note")) {
        const reasonInput = document.createElement("input");
        reasonInput.type = "text";
        reasonInput.id = "mood-note";
        reasonInput.name = "reason";
        reasonInput.placeholder = "Why do you feel this way?";
        reasonInput.classList.add("mood-note-input");
        document.querySelector(".emoji-row").insertAdjacentElement("afterend", reasonInput);
    }
    }

    async function recommendMusic(type) {
    
    


    const moodMap = {
    match: document.getElementById("moodValue")?.value?.trim() || "happy",
    cheer: "party"
    };

    const mood = moodMap[type];
    if (!mood) {
    alert("Please select a mood first.");
    return;
    }

    const container = document.getElementById("suggestedText");
    container.innerHTML = "Loading playlists...";

    try {
        const response = await fetch(`spotify.php?mood=${encodeURIComponent(mood)}`);
        if (!response.ok) throw new Error("Failed to fetch playlists");

        const data = await response.json();
        const playlists = data.playlists?.items;

        if (!playlists || playlists.length === 0) {
        container.innerHTML = "No playlists found.";
        return;
        }

        container.innerHTML = "";

        const header = document.createElement("p");
        header.innerHTML = `Suggested Playlists (${type === 'cheer' ? "Cheering You Up" : "Matching Your Mood"})`;
        container.appendChild(header);

        const grid = document.createElement("div");
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(200px, 1fr))";
        grid.style.gap = "15px";
        grid.style.marginTop = "10px";

        playlists.forEach(pl => {
    if (!pl) return;

    const card = document.createElement("div");
    card.classList.add("playlist-card");

    const img = document.createElement("img");
    img.src = pl?.images?.[0]?.url || "";
    img.alt = pl?.name || "Playlist image";
    img.style.width = "100%";
    img.style.borderRadius = "6px";

    const title = document.createElement("h4");
    title.textContent = pl?.name || "Unknown Playlist";

    const ownerName = pl?.owner?.display_name || "Unknown owner";
    const owner = document.createElement("p");
    owner.textContent = `by ${ownerName}`;

    const spotifyUrl = pl?.external_urls?.spotify || "#";
    const link = document.createElement("a");
    link.href = spotifyUrl;
    link.target = "_blank";
    link.textContent = "Listen on Spotify";
    link.style.display = "inline-block";
    link.style.marginTop = "8px";
    link.style.textDecoration = "none";
    link.style.color = "green";
    link.style.fontWeight = "bold";

    link.href = spotifyUrl;
    link.target = "_blank";
    link.textContent = "Listen on Spotify";
    link.style.display = "inline-block";
    link.style.marginTop = "8px";
    link.style.textDecoration = "none";
    link.style.color = "green";
    link.style.fontWeight = "bold";

    const selectBtn = document.createElement("button");
    selectBtn.textContent = "Select This Playlist";
    selectBtn.classList.add("btn", "green");
    selectBtn.style.marginTop = "15px";
    selectBtn.style.marginBottom = "15px";



    selectBtn.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("playlist_url").value = spotifyUrl;
        document.getElementById("playlist_name").value = pl?.name || "Unknown Playlist";
        // alert(`Playlist selected: ${pl?.name}`);
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(owner);
    card.appendChild(link);
    card.appendChild(selectBtn);
    grid.appendChild(card);

    });

        container.appendChild(grid);

    } catch (error) {
        console.error(error);
        container.innerHTML = "Error loading playlists.";
    }
    }


    //THIS ADDS INPUT TO DATA BASE BUT DI MA APPEND SA DASHBOARD
    // document.getElementById("moodForm").addEventListener("submit", function(event) {
    //     event.preventDefault();

    //     const mood = document.getElementById("moodValue")?.value || "";
    //     const journal_entry = document.getElementById("JournalEntry").value.trim();
    //     const playlist_name = document.getElementById("playlist_name").value.trim();
    //     const playlist_url = document.getElementById("playlist_url").value.trim();

    //     if (!mood) {
    //         alert("Please select a mood before submitting.");
    //         return;
    //     }

    //     const newEntry = {
    //         mood,
    //         journal_entry,
    //         playlist_name: playlist_name || null,
    //         playlist_url: playlist_url || null,
    //         created_at: new Date().toISOString(),
    //     };

    //     sessionStorage.setItem("newEntry", JSON.stringify(newEntry));

    //     window.location.href = "dashboard-draft.html";
    // });

    document.getElementById("moodForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const mood = document.getElementById("moodValue")?.value || "";
    const moodReason = document.getElementById("mood-note")?.value?.trim() || "";
    const journal_entry = document.getElementById("JournalEntry").value.trim();
    const playlist_name = document.getElementById("playlist_name").value.trim();
    const playlist_url = document.getElementById("playlist_url").value.trim();

    if (!mood) {
        alert("Please select a mood before submitting.");
        return;
    }

    const newEntry = {
        mood: mood,
        reason: moodReason,
        journal_entry: journal_entry,
        playlist_name: playlist_name || null,
        playlist_url: playlist_url || null
    };

    try {
        const response = await fetch("http://localhost:3000/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEntry)
        });

        if (!response.ok) {
            throw new Error("Failed to submit entry.");
        }

        const result = await response.json();
        console.log("Server response:", result);

        alert("Journal entry submitted successfully!");
        window.location.href = "dashboard-draft.html";
    } catch (error) {
        console.error("Submission error:", error);
        alert("Failed to submit entry. Please try again.");
    }
});
