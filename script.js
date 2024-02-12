document.addEventListener("DOMContentLoaded", function () {
    const currentDayElement = document.getElementById("current-day");
    const timeBlocksElement = document.getElementById("time-blocks");

    function displayCurrentDay() {
        const currentDay = moment().format("dddd, MMMM Do YYYY");
        currentDayElement.textContent = currentDay;
    }

    function createTimeBlocks() {
        for (let i = 9; i <= 17; i++) {
            const timeBlock = document.createElement("div");
            timeBlock.classList.add("time-block");

            const timeLabel = document.createElement("div");
            timeLabel.classList.add("time-label");
            timeLabel.textContent = moment(i, "H").format("h A");

            const eventInput = document.createElement("input");
            eventInput.classList.add("event-input");
            eventInput.setAttribute("type", "text");
            eventInput.setAttribute("placeholder", "Enter event");

            const saveButton = document.createElement("button");
            saveButton.classList.add("save-button");
            saveButton.textContent = "Save";
            saveButton.addEventListener("click", saveEvent);

            timeBlock.appendChild(timeLabel);
            timeBlock.appendChild(eventInput);
            timeBlock.appendChild(saveButton);

            timeBlocksElement.appendChild(timeBlock);
        }
    }

    function colorCodeTimeBlocks() {
        const currentTime = moment().format("H");
        const timeBlocks = document.querySelectorAll(".time-block");

        timeBlocks.forEach(function (block) {
            const blockHour = moment(block.querySelector(".time-label").textContent, "h A").format("H");

            if (blockHour < currentTime) {
                block.classList.add("past");
            } else if (blockHour == currentTime) {
                block.classList.add("present");
            } else {
                block.classList.add("future");
            }
        });
    }

    function saveEvent(event) {
        const timeBlock = event.target.closest(".time-block");
        const eventInput = timeBlock.querySelector(".event-input");
        const eventText = eventInput.value;
        const blockHour = moment(timeBlock.querySelector(".time-label").textContent, "h A").format("H");

        localStorage.setItem("event_" + blockHour, eventText);
    }

    function loadEvents() {
        const timeBlocks = document.querySelectorAll(".time-block");

        timeBlocks.forEach(function (block) {
            const blockHour = moment(block.querySelector(".time-label").textContent, "h A").format("H");
            const savedEvent = localStorage.getItem("event_" + blockHour);

            if (savedEvent) {
                block.querySelector(".event-input").value = savedEvent;
            }
        });
    }

    displayCurrentDay();
    createTimeBlocks();
    colorCodeTimeBlocks();
    loadEvents();
});
