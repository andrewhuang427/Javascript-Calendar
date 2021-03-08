const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");
const createEventModal = document.getElementById("new-event-modal");
const editEventModal = document.getElementById("edit-event-modal");
var editModalOpen = false;

// Closes modal when user clicks outside of it
window.onclick = function (event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
    else if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
    else if (event.target == createEventModal) {
        createEventModal.style.display = "none";
    }
    else if (event.target == editEventModal) {
        editEventModal.style.display = "none";
    }
}

function closeModal() {
    this.parentElement.parentElement.parentElement.style.display = "none";
}

function openLoginModal() {
    loginModal.style.display = "block";
}

document.getElementById("login-modal-opener").addEventListener("click", openLoginModal, false);

document.getElementById("login-modal-closer").addEventListener("click", closeModal, false);


function openRegisterModal() {
    registerModal.style.display = "block";
}

document.getElementById("register-modal-opener").addEventListener("click", openRegisterModal, false);

document.getElementById("register-modal-closer").addEventListener("click", closeModal, false);

function openCreateEventModal(event) {

    if (!editModalOpen) {
        document.getElementById("event-date").setAttribute("value", event.target.id);
        createEventModal.style.display = "block";
    }
    editModalOpen = false;
}

document.getElementById("create-event-modal-opener").addEventListener("click", openCreateEventModal, false);

document.getElementById("create-event-modal-closer").addEventListener("click", closeModal, false);


function openUpdateEventModal(event) {

    var id = event.target.id;
    var event_id = id.split("-")[0];
    var eventDataset = event.target.dataset;

    document.getElementById("edit-event-title").setAttribute("value", eventDataset.title);
    document.getElementById("edit-event-date").setAttribute("value", eventDataset.date);
    document.getElementById("edit-event-time").setAttribute("value", eventDataset.time);
    document.getElementById("edit-event-description").value = eventDataset.description;
    document.getElementById("edit-event-category").value = eventDataset.category;
    document.getElementById("hidden-event-id").value = event_id;

    editEventModal.style.display = "block";

    editModalOpen = true;
}

document.getElementById("edit-event-modal-closer").addEventListener("click", closeModal, false);
