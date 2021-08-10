/**
 * Title: Give Away Raffle Draw
 * Description: Raffle Draw Aplication
 * Author: Samin Yasar
 * Date: 10/August/2021
 */

/**
 * TODO: Extract Text From Text Area and Store it to an Array
 * TODO: Render The Names Extracted From Text Area
 * TODO: Shuffle The Names Array for Better Result
 * TODO: Pick A Random Winner, Remove Him/Her from The Names Array
 * TODO: Display Winners Name
 */

// DOM Select
const formContainer = document.getElementById("form");
const allNamesField = document.getElementById("allNamesField");
const allInputedNames = document.getElementById("allInputedNames");
const shuffleDisplay = document.getElementById("shuffleDisplay");
const btnTry = document.getElementById("btnTry");
const firstField = document.getElementById("firstField");
const secondField = document.getElementById("secondField");
const thirdField = document.getElementById("thirdField");

// Global Variables
const participants = [];
let currentWinnerState = "first";

// Style Initialization
[firstField, secondField, thirdField].forEach((field) => {
    field.style.display = "none";
});

// AddEventListener
formContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    allInputedNames.innerHTML = "";
    allInputedNames.style.display = "none";
    participants.splice(0, participants.length);
    const inputedNames = allNamesField.value.trim();
    if (inputedNames) {
        participants.push(
            ...inputedNames
                .split(",")
                .filter((name) => Boolean(name))
                .map((name) => name.trim())
        );
        allInputedNames.style.display = "flex";
        allNamesField.value = "";
        participants.forEach((name) => {
            createList(name);
        });
    } else {
        alert("Please insert some names...");
    }
});

btnTry.addEventListener("click", async (e) => {
    if (participants.length && currentWinnerState) {
        participants.sort(() => Math.floor(Math.random() - 0.5));
        for (let i = 0; i < participants.length; i++) {
            shuffleDisplay.textContent = await displayName(participants[i]);
            if (i === participants.length - 1) {
                participants.splice(i, 1);
                if (currentWinnerState === "first") {
                    firstField.style.display = "";
                    firstField.textContent = shuffleDisplay.textContent;
                    currentWinnerState = "second";
                } else if (currentWinnerState === "second") {
                    secondField.style.display = "";
                    secondField.textContent = shuffleDisplay.textContent;
                    currentWinnerState = "third";
                } else if (currentWinnerState === "third") {
                    thirdField.style.display = "";
                    thirdField.textContent = shuffleDisplay.textContent;
                    currentWinnerState = "";
                    shuffleDisplay.textContent = "display";
                } else {
                    return;
                }
            }
        }
        async function displayName(name) {
            return new Promise((res) => {
                setTimeout(() => {
                    res(name);
                }, 100);
            });
        }
    } else {
        return;
    }
});

// Functionality Define
function createList(name) {
    const newName = document.createElement("li");
    newName.textContent = name;
    allInputedNames.appendChild(newName);
}
