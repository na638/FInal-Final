
//     function toggleDarkMode() {
//         document.body.classList.toggle("dark-mode");
//         const btn = document.getElementById("theme-toggle");
//         btn.innerHTML = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
//     }


//     function signout() {
//         alert("Signed out!");
//         window.location.href = "index.html";
//     }


//     function getMoodEmoji(mood) {
//         const map = {
//             Happy: "😄",
//             Neutral: "😐",
//             Sad: "😢",
//             Depressed: "😞",
//             Excited: "🤩",
//             Angry: "😠",
//         };
//         return map[mood] || "";
//     }


//     function timeSince(date) {
//         const seconds = Math.floor((new Date() - date) / 1000);
//         let interval = Math.floor(seconds / 3600);
//         if (interval >= 1) return interval + " hour" + (interval > 1 ? "s" : "") + " ago";
//         interval = Math.floor(seconds / 60);
//         if (interval >= 1) return interval + " minute" + (interval > 1 ? "s" : "") + " ago";
//         return "just now";
//     }

//     function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
// }


//     function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
// }

// document.addEventListener("DOMContentLoaded", () => {
//   fetch("/entries")
//     .then((res) => res.json())
//     .then((entries) => {
//       const newsfeed = document.querySelector(".newsfeed");
//       const header = newsfeed.querySelector("h3");
//       newsfeed.innerHTML = ""; // Clear existing content
//       newsfeed.appendChild(header); // Re-add header

//       entries.forEach((entry) => {
//         const postCard = document.createElement("div");
//         postCard.className = "post-card";

//         const timeAgo = getTimeAgo(entry.created_at);

//         postCard.innerHTML = `
//           <div class="post-header">
//               <img src="pfp1.jpg" alt="Avatar" class="avatar" />
//               <div>
//                   <strong>Anonymous</strong><br />
//                   <small>${getMoodEmoji(entry.mood)} ${capitalize(entry.mood)} • ${timeAgo}</small>
//               </div>
//           </div>
//           <p class="journal-text">${entry.journal_entry}</p>
//           ${entry.playlist_name && entry.playlist_url ? `
//             <div class="playlist-card">
//                 <h4>Playlist Recommendation</h4>
//                 <p>${entry.playlist_name}</p>
//                 <a href="${entry.playlist_url}" target="_blank">Listen on Spotify</a>
//             </div>
//           ` : ""}
//           <div class="post-footer">
//               <button>❤️</button>
//               <button>💬</button>
//           </div>
//         `;

//         newsfeed.appendChild(postCard);
//       });
//     })
//     .catch((err) => {
//       console.error("Error loading entries:", err);
//     });
// });


// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

// function getTimeAgo(dateString) {
//   const now = new Date();
//   const created = new Date(dateString);
//   const diffMs = now - created;
//   const minutes = Math.floor(diffMs / 60000);
//   const hours = Math.floor(minutes / 60);

//   if (minutes < 1) return "just now";
//   if (minutes < 60) return `${minutes} mins ago`;
//   if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//   return created.toLocaleDateString();
// }


// function createPostCard(entry) {
//     const postCard = document.createElement("div");
//     postCard.className = "post-card";

//     const createdDate = new Date(entry.created_at);
//     const timeAgo = timeSince(createdDate);

//     const moodFormatted = capitalizeFirstLetter(entry.mood);
//     const moodEmoji = getMoodEmoji(moodFormatted);

// postCard.innerHTML = `
//     <div class="post-header">
//         <div style="display: flex; align-items: center; width: 100%;">
//             <img src="pfp-default.jpg" alt="Avatar" class="avatar" />
//             <div style="margin-left: 10px;">
//                 <strong>You</strong><br />
//                 <small>${moodEmoji} ${moodFormatted} • ${timeAgo}</small>
//             </div>
//             <div class="post-menu" style="margin-left: auto; position: relative;">
//                 <button class="menu-toggle">⋮</button>
//                 <div class="menu-options hidden">
//                     <button class="edit-btn">Edit</button>
//                     <button class="delete-btn">Delete</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//     <p class="journal-text">${entry.journal_entry}</p>
//     ${entry.playlist_name && entry.playlist_url ? `
//     <div class="playlist-card">
//         <h4>Playlist Recommendation</h4>
//         <p>${entry.playlist_name}</p>
//         <a href="${entry.playlist_url}" target="_blank">Listen on Spotify</a>
//     </div>` : ""}
//     <div class="post-footer">
//         <button>❤️ 0</button>
//         <button>💬 0</button>
//     </div>
// `;



//     return postCard;
// }

//         function appendNewEntry(newEntry) {
//         const newsfeed = document.querySelector(".newsfeed");
//         const postCard = createPostCard(newEntry);
//         newsfeed.prepend(postCard);
//     }

//     // On page load: check for new entry in sessionStorage
//     window.addEventListener("DOMContentLoaded", () => {
//         const newEntryStr = sessionStorage.getItem("newEntry");
//         if (newEntryStr) {
//             const newEntry = JSON.parse(newEntryStr);
//             appendNewEntry(newEntry);
//             // sessionStorage.removeItem("newEntry"); // Clear after use
//         }
//     });

//aBOVE CODE ONLY APPENDS BUT GET REPLACED

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const btn = document.getElementById("theme-toggle");
    btn.innerHTML = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
}


function signout() {
    alert("Signed out!");
    window.location.href = "index.html";
}


function getMoodEmoji(mood) {
    const map = {
        Happy: "😄",
        Neutral: "😐",
        Sad: "😢",
        Depressed: "😞",
        Excited: "🤩",
        Angry: "😠",
    };
    return map[mood] || "";
}


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


function getTimeAgo(dateString) {
    const now = new Date();
    const created = new Date(dateString);
    const diffMs = now - created;
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return created.toLocaleDateString();
}

function enableEditDelete(postCard, entry) {
    const editBtn = postCard.querySelector(".edit-btn");
    const deleteBtn = postCard.querySelector(".delete-btn");

    const toggleBtn = postCard.querySelector(".menu-toggle");
    const menu = postCard.querySelector(".menu-options");
    toggleBtn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });

    editBtn.addEventListener("click", () => {
        const journalTextElem = postCard.querySelector(".journal-text");
        const originalText = journalTextElem.textContent;

        const textarea = document.createElement("textarea");
        textarea.value = originalText;
        textarea.classList.add("edit-textarea");

        journalTextElem.replaceWith(textarea);

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.classList.add("save-btn");

        textarea.insertAdjacentElement("afterend", saveBtn);

        saveBtn.addEventListener("click", () => {
    const updatedText = textarea.value;

    fetch(`http://localhost:3000/entries/${entry.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            journal_entry: updatedText,
            mood: entry.mood,
            playlist_name: entry.playlist_name,
            playlist_url: entry.playlist_url
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Update failed");

        const newTextElem = document.createElement("p");
        newTextElem.textContent = updatedText;
        newTextElem.className = "journal-text";

        textarea.replaceWith(newTextElem);
        saveBtn.remove();
    })
    .catch(err => alert("Failed to update entry"));
});


    });

    deleteBtn.addEventListener("click", () => {
        const confirmDelete = confirm("Are you sure you want to delete this entry?");
        if (!confirmDelete) return;

        fetch(`http://localhost:3000/entries/${entry.id}`, {
            method: "DELETE",
        })
        .then(res => {
            if (!res.ok) throw new Error("Delete failed");
            postCard.remove(); 
        })
        .catch(err => alert("Failed to delete entry"));
    });
}

function createPostCard(entry) {
    const postCard = document.createElement("div");
    postCard.className = "post-card";

    const timeAgo = getTimeAgo(entry.created_at);
    const moodFormatted = capitalize(entry.mood);
    const moodEmoji = getMoodEmoji(moodFormatted);

    postCard.innerHTML = `
        <div class="post-header">
            <div style="display: flex; align-items: center; width: 100%;">
                <img src="pfp-default.jpg" alt="Avatar" class="avatar" />
                <div style="margin-left: 10px;">
                    <strong>You</strong><br />
                    <small>${moodEmoji} ${moodFormatted} • ${timeAgo}</small>
                </div>
                <div class="post-menu" style="margin-left: auto; position: relative;">
                    <button class="menu-toggle">⋮</button>
                    <div class="menu-options hidden">
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <p class="journal-text">${entry.journal_entry}</p>
        ${entry.playlist_name && entry.playlist_url ? `
        <div class="playlist-card">
            <h4>Playlist Recommendation</h4>
            <p>${entry.playlist_name}</p>
            <a href="${entry.playlist_url}" target="_blank">Listen on Spotify</a>
        </div>` : ""}
        <div class="post-footer">
            <button>❤️ 0</button>
            <button>💬 0</button>
        </div>
    `;

    enableEditDelete(postCard, entry);
    return postCard;
}

function appendNewEntry(newEntry) {
    const newsfeed = document.querySelector(".newsfeed");
    const postCard = createPostCard(newEntry);
    newsfeed.prepend(postCard);
}

function loadEntries() {
    fetch("http://localhost:3000/entries")
        .then((res) => res.json())
        .then((entries) => {
            const newsfeed = document.querySelector(".newsfeed");
            const dynamicContainer = document.getElementById("dynamicEntries");
            dynamicContainer.innerHTML = ""; 

            entries.forEach((entry) => {
                const postCard = createPostCard(entry);
                dynamicContainer.appendChild(postCard);
            });
        })
        .catch((err) => {
            console.error("Error loading entries:", err);
        });
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-toggle")) {
        const menu = e.target.nextElementSibling;
        document.querySelectorAll(".menu-options").forEach((el) => {
            if (el !== menu) el.classList.add("hidden");
        });
        menu.classList.toggle("hidden");
    } else {
        document.querySelectorAll(".menu-options").forEach((menu) => {
            if (!menu.contains(e.target)) {
                menu.classList.add("hidden");
            }
        });
    }
});

document.addEventListener("click", (e) => {
    const isToggle = e.target.classList.contains("menu-toggle");
    const menu = isToggle ? e.target.nextElementSibling : null;

    document.querySelectorAll(".menu-options").forEach((el) => {
        if (el !== menu) el.classList.add("hidden");
    });

    if (isToggle && menu) {
        e.stopPropagation();
        menu.classList.toggle("hidden");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    loadEntries();

    const newEntryStr = sessionStorage.getItem("newEntry");
    if (newEntryStr) {
        const newEntry = JSON.parse(newEntryStr);
        appendNewEntry(newEntry);
    }
});


//---------------------------------------- above codes work WELL


