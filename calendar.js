const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

(function () {
    "use strict";

    Date.prototype.deltaDays = function (n) {
        // relies on the Date object to automatically wrap between months for us
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + n);
    };

    Date.prototype.getSunday = function () {
        return this.deltaDays(-1 * this.getDay());
    };
}());

function Week(initial_d) {
    "use strict";

    this.sunday = initial_d.getSunday();


    this.nextWeek = function () {
        return new Week(this.sunday.deltaDays(7));
    };

    this.prevWeek = function () {
        return new Week(this.sunday.deltaDays(-7));
    };

    this.contains = function (d) {
        return (this.sunday.valueOf() === d.getSunday().valueOf());
    };

    this.getDates = function () {
        var dates = [];
        for (var i = 0; i < 7; i++) {
            dates.push(this.sunday.deltaDays(i));
        }
        return dates;
    };
}

function Month(year, month) {
    "use strict";

    this.year = year;
    this.month = month;

    this.nextMonth = function () {
        return new Month(year + Math.floor((month + 1) / 12), (month + 1) % 12);
    };

    this.prevMonth = function () {
        return new Month(year + Math.floor((month - 1) / 12), (month + 11) % 12);
    };

    this.getDateObject = function (d) {
        return new Date(this.year, this.month, d);
    };

    this.getWeeks = function () {
        var firstDay = this.getDateObject(1);
        var lastDay = this.nextMonth().getDateObject(0);

        var weeks = [];
        var currWeek = new Week(firstDay);
        weeks.push(currWeek);
        while (!currWeek.contains(lastDay)) {
            currWeek = currWeek.nextWeek();
            weeks.push(currWeek);
        }

        return weeks;
    };
}

var currDate = new Date();
var month = currDate.getMonth();
var currYear = currDate.getFullYear();
var currMonth = new Month(currYear, month);

document.getElementById("current-month").innerHTML = currMonth.month
document.getElementById("current-year").innerHTML = currYear;

updateCalendar();

/**
 * Updates Calendar
 */
function updateCalendar() {

    clearCalendar();

    document.getElementById("current-month").innerHTML = months[currMonth.month];
    document.getElementById("current-year").innerHTML = currMonth.year;

    var weeks = currMonth.getWeeks();

    for (var w in weeks) {

        var row = document.createElement("div");
        row.className = "date-row row";
        row.id = "week-" + w;

        var days = weeks[w].getDates();

        for (var d in days) {

            var cell = document.createElement("div");
            cell.className = "date-box col";
            cell.setAttribute("id", days[d].toISOString().substring(0, 10));

            if (days[d].getMonth() == currMonth.month) {

                var dateContainer = document.createElement("div");
                dateContainer.className = "day-number";
                var text = document.createTextNode(days[d].getDate());
                dateContainer.appendChild(text);

                var eventsContainer = document.createElement("div");
                eventsContainer.className = "cell-events-list";
                var eventList = document.createElement("ul");
                eventList.className = "events-list";
                eventsContainer.appendChild(eventList);

                cell.append(dateContainer);
                cell.appendChild(eventsContainer);
            }

            row.appendChild(cell);
        }

        document.getElementById("calendar").appendChild(row);
    }

    updateDateEventListeners();
    updateEvents();

}

/**
 * Updates event listeners of each individual date cell
 */
function updateDateEventListeners() {

    var dateCells = document.getElementsByClassName("date-box");

    for (d in dateCells) {
        var id = dateCells[d].id;
        var cell = document.getElementById(id);
        if (cell) {
            cell.addEventListener("click", openCreateEventModal, false);
        }
    }

}


/**
 * Clears all child nodes of calendar row
 */
function clearCalendar() {
    let removeDays = document.getElementsByClassName("date-row");
    while (removeDays[0]) {
        removeDays[0].parentNode.removeChild(removeDays[0]);
    }
}

document.getElementById("next-month-btn").addEventListener("click", function (event) {
    if (currMonth == 11) {
        currYear += 1;
    }
    currMonth = currMonth.nextMonth();
    updateCalendar();
}, false);


document.getElementById("previous-month-btn").addEventListener("click", function (event) {
    if (currMonth == 0) {
        currYear -= 1;
    }
    currMonth = currMonth.prevMonth();
    updateCalendar();
}, false);

/**
 * 
 * Filtering Elements Based on Category
 */
const eventElements = document.getElementsByClassName("event-li");
const filters = document.getElementsByName("filter");
if (filters) {
    filters.forEach(filter => filter.addEventListener("change", switchFilter, false));
}

var selectedFilter = "All";

function switchFilter() {
    for (const filter of filters) {
        if (filter.checked) {
            selectedFilter = filter.value;
        }
    }
    filterEvents();
}

function displayAllEvents() {
    for (e in eventElements) {
        if (typeof eventElements[e] == "object") {
            eventElements[e].style.display = "block";
        }
    }

}

/**
 *  Handles Filtering Events
 */
function filterEvents() {
    var eventElements = document.getElementsByClassName("event-li");
    displayAllEvents();
    if (selectedFilter != "All") {
        for (e in eventElements) {
            if (typeof eventElements[e] == "object") {
                if (eventElements[e].dataset.category != selectedFilter) {
                    eventElements[e].style.display = "none";
                }
            }
        }
    }
}


