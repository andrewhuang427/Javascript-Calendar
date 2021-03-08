/**
 * Updates Events on Calendar each time year is Switched / User is Logged In
 */
function updateEvents() {

    if (localStorage.getItem("status") == "loggedIn") {
        const month = currMonth.month + 1;
        const year = currMonth.year;

        const data = {
            "month": month,
            "year": year,
            "user_id" : localStorage.getItem("user_id")
        }

        fetch("getEvents.php", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "content-type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                var events = data.events;
                for (e in events) {
                    var event_id = events[e].event_id;
                    var date = events[e].date;
                    var title = events[e].title;
                    var description = events[e].description;
                    var time = events[e].time;
                    var category = events[e].category;
                    addEventToDOM(date, title, description, time, category, event_id);
                }
            })
            .catch(err => console.error(err));
    }
}

function addEventToDOM(date, title, description, time, category, event_id) {
    var box = document.getElementById(date);
    var classListDiv = box.getElementsByClassName("cell-events-list")[0];
    var list = classListDiv.getElementsByClassName("events-list")[0];
    var newListItem = document.createElement("li");
    newListItem.setAttribute("id", (event_id + "-" + date));
    newListItem.setAttribute("class", ("event-li " + category));
    newListItem.dataset.title = title;
    newListItem.dataset.description = description;
    newListItem.dataset.date = date;
    newListItem.dataset.time = time;
    newListItem.dataset.category = category;
    list.appendChild(newListItem);
    $("#" + (event_id + "-" + date)).text(title);

    // ---------- adds event listener to each individual event tab on calendar ----------

    document.getElementById((event_id + "-" + date)).addEventListener("click", openUpdateEventModal, false);
}


function createEvent(event) {

    if (localStorage.getItem("status") == "loggedIn") {

        const title = document.getElementById("event-title").value;
        const date = document.getElementById("event-date").value;
        const time = document.getElementById("event-time").value;
        const description = document.getElementById("event-description").value;
        const category = document.getElementById("event-category").value;
        const token = localStorage.getItem("token");

        const data = {
            "title": title,
            "date": date,
            "time": time,
            "description": description,
            "category": category,
            "token": token
        };

        fetch("createEvent.php", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "content-type": "application/json" }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));

        updateCalendar();
    }

    else {
        alert("You must be logged-in to create events.")
    }
    resetForm("new-event-form", "event-description");
    createEventModal.style.display = "none";

}

document.getElementById("create-event-btn").addEventListener("click", createEvent, false);

function updateExistingEvent(event) {

    const new_title = document.getElementById("edit-event-title").value;
    const new_date = document.getElementById("edit-event-date").value;
    const new_time = document.getElementById("edit-event-time").value;
    const new_description = document.getElementById("edit-event-description").value;
    const new_category = document.getElementById("edit-event-category").value;
    const event_id = document.getElementById("hidden-event-id").value;
    const token = localStorage.getItem("token");

    const data = {
        "title": new_title,
        "description": new_description,
        "date": new_date,
        "time": new_time,
        "category": new_category,
        "event_id": event_id,
        "token": token
    };

    fetch("updateEvent.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));

    updateCalendar();
    resetForm("edit-event-form", "edit-event-description");
    editEventModal.style.display = "none";

}

document.getElementById("save-event-btn").addEventListener("click", updateExistingEvent, false);


function deleteExistingEvent() {

    const event_id = document.getElementById("hidden-event-id").value;
    const token = localStorage.getItem("token");

    const data = {
        "event_id": event_id,
        "token": token
    };

    fetch("deleteEvent.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));

    updateCalendar();
    resetForm("edit-event-form", "edit-event-description");
    editEventModal.style.display = "none";
}

function resetForm(id, textarea) {
    document.getElementById(id).reset();
    document.getElementById(textarea).value = "";
}

document.getElementById("delete-event-btn").addEventListener("click", deleteExistingEvent, false);

function htmlEncode(str) {
    return String(str).replace(/[^\w. ]/gi, function (c) {
        return '&#' + c.charCodeAt(0) + ';';
    });
}
