
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
differenceInSeconds

// Prompt the user to enter hours, minutes, and seconds
const response = await inquirer.prompt([
    {
        type: "number",
        name: "hours",
        message: "Please enter the amount of hours",
        validate: (input) => {
            // Validate that the input is a number
            if (isNaN(input)) {
                return "Please enter a valid number";
            // Ensure the input is a non-negative number
            } else if (input < 0) {
                return "Please enter a non-negative number";
            } else {
                return true;
            }
        }
    },
    {
        type: "number",
        name: "minutes",
        message: "Please enter the amount of minutes",
        validate: (input) => {
            // Validate that the input is a number
            if (isNaN(input)) {
                return "Please enter a valid number";
            // Ensure the input is between 0 and 59
            } else if (input < 0 || input > 59) {
                return "Please enter a number between 0 and 59";
            } else {
                return true;
            }
        }
    },
    {
        type: "number",
        name: "seconds",
        message: "Please enter the amount of seconds",
        validate: (input) => {
            // Validate that the input is a number
            if (isNaN(input)) {
                return "Please enter a valid number";
            // Ensure the input is between 0 and 59
            } else if (input < 0 || input > 59) {
                return "Please enter a number between 0 and 59";
            } else {
                return true;
            }
        }
    }
]);

// Calculate total seconds from hours, minutes, and seconds
let input = response.hours * 3600 + response.minutes * 60 + response.seconds; // Store the total user input in seconds

// Function to start the timer
function startTime(val: number) {
    const initialTime = new Date(); // Get the current date and time
    initialTime.setSeconds(initialTime.getSeconds() + val); // Set the initial time to current time + input seconds
    const intervalTime = new Date(initialTime); // Create a new Date object with the initial time

    const interval = setInterval(() => { // Set an interval to run every second
        const currentTime = new Date(); // Get the current date and time
        const timeDifference = differenceInSeconds(intervalTime, currentTime); // Calculate the difference in seconds

        if (timeDifference <= 0) { // If time is up
            console.log("Time up"); // Log "Time up"
            clearInterval(interval); // Clear the interval
            process.exit(); // Exit the process
        }

        // Calculate hours, minutes, and seconds from the time difference
        const hours = Math.floor(timeDifference / 3600);
        const minutes = Math.floor((timeDifference % 3600) / 60);
        const seconds = timeDifference % 60;

        // Log the time in HH:MM:SS format
        console.log(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);
}

startTime(input); // Start the timer with the user input
