//raw JSON API from priyangsubanerjee 
//cred : https://github.com/priyangsubanerjee/yogism

let yogaData = []; // Fetched data to be stored here
let currentIndex = 0; // First pose
let showSanskritDescription = false;
let showSanskritBenefits = false;
let showSanskritSteps = false;
let showSanskritChant = false;

var sec = 0; // Timer seconds
let timer; // Timer variable
let isRunning = false; // Timer state
var timerElement = document.querySelector('#timer');

// Fetch pose data from the API
function fetchPoseData() {
    const yogaUrl = "https://raw.githubusercontent.com/Hussain-1303/yogism/refs/heads/master/finalPosesv2.json";

    fetch(yogaUrl)
    .then(response => response.json())
    .then(jsonData => {
        yogaData = jsonData; // Assign fetched data to the yogaData array
        populateNavigation();
        showPose(currentIndex); // Display the first pose
    })
    .catch(error => console.error('Error fetching the JSON:', error));
}

function populateNavigation() {
    const nav = document.getElementById('poseNavigation');
    nav.innerHTML = ''; // Clear existing items
    yogaData.forEach((pose, index) => {
        const li = document.createElement('li');
        li.textContent = pose.english_name; // Display English name
        li.addEventListener('click', () => {
            currentIndex = index; // Set the current index to the clicked pose
            showPose(currentIndex); // Show the selected pose
            restart(); // Restart the timer
        });
        nav.appendChild(li); // Add the list item to the navigation
    });
}

// Show pose details
function showPose(index) {
    const pose = yogaData[index];

    document.querySelector('.image').innerHTML = `<img src="${pose.image}" alt="${pose.sanskrit_name}" />`;
    document.querySelector('.sanKName').textContent = pose.sanskrit_name;
    document.querySelector('.enName').textContent = pose.english_name;

    // Set description and benefits
    document.querySelector('.eng_description').innerHTML = `<h3>Description</h3>${pose.eng_description}`;
    document.querySelector('.sanskrit_description').innerHTML = `<h3>वर्णनम्‌</h3>${pose.sank_description}`;

    document.querySelector('.eng_benefits').innerHTML = `<h3>Benefits</h3>${pose.benefits}`;
    document.querySelector('.sanskrit_benefits').innerHTML = `<h3>लाभाः</h3>${pose.sank_benefits}`;

    document.querySelector('.time').innerHTML = `<h3>Time</h3>${pose.time}`;

    // Set steps
    document.querySelector('.eng_steps').innerHTML = `<h3>Steps</h3>${pose.steps}`;
    document.querySelector('.sanskrit_steps').innerHTML = `<h3>पदानि</h3>${pose.sank_steps}`;

    // Update chant
    document.querySelector('.chant_english').innerHTML = `<h3>Mantra</h3>${pose.eng_mantra}`;
    document.querySelector('.chant_sanskrit').innerHTML = `<h3>मन्त्रः</h3>${pose.sank_mantra}`;

    // Update all toggle buttons
    updateToggleButtons();
}

// Update the visibility of text based on toggle state
function updateToggleButtons() {
    // Update description toggle
    const descriptionToggle = document.querySelector('.toggleDescription');
    if (showSanskritDescription) {
        document.querySelector('.eng_description').style.display = 'none';
        document.querySelector('.sanskrit_description').style.display = 'block';
        descriptionToggle.textContent = 'Show English Description';
    } else {
        document.querySelector('.eng_description').style.display = 'block';
        document.querySelector('.sanskrit_description').style.display = 'none';
        descriptionToggle.textContent = 'Show Sanskrit Description';
    }

    // Update benefits toggle
    const benefitsToggle = document.querySelector('.toggleBenefits');
    if (showSanskritBenefits) {
        document.querySelector('.eng_benefits').style.display = 'none';
        document.querySelector('.sanskrit_benefits').style.display = 'block';
        benefitsToggle.textContent = 'Show English Benefits';
    } else {
        document.querySelector('.eng_benefits').style.display = 'block';
        document.querySelector('.sanskrit_benefits').style.display = 'none';
        benefitsToggle.textContent = 'Show Sanskrit Benefits';
    }

    // Update steps toggle
    const stepsToggle = document.querySelector('.toggleSteps');
    if (showSanskritSteps) {
        document.querySelector('.eng_steps').style.display = 'none';
        document.querySelector('.sanskrit_steps').style.display = 'block';
        stepsToggle.textContent = 'Show English Steps';
    } else {
        document.querySelector('.eng_steps').style.display = 'block';
        document.querySelector('.sanskrit_steps').style.display = 'none';
        stepsToggle.textContent = 'Show Sanskrit Steps';
    }

    // Update chant toggle
    const chantToggle = document.querySelector('.toggleChant');
    if (showSanskritChant) {
        document.querySelector('.chant_english').style.display = 'none';
        document.querySelector('.chant_sanskrit').style.display = 'block';
        chantToggle.textContent = 'Show English Mantra';
    } else {
        document.querySelector('.chant_english').style.display = 'block';
        document.querySelector('.chant_sanskrit').style.display = 'none';
        chantToggle.textContent = 'Show Sanskrit Mantra';
    }
}

// Toggle event listeners
document.querySelector('.toggleDescription').addEventListener('click', () => {
    showSanskritDescription = !showSanskritDescription; // Toggle the state
    updateToggleButtons(); // Update the display
});

document.querySelector('.toggleBenefits').addEventListener('click', () => {
    showSanskritBenefits = !showSanskritBenefits; // Toggle the state
    updateToggleButtons(); // Update the display
});

document.querySelector('.toggleSteps').addEventListener('click', () => {
    showSanskritSteps = !showSanskritSteps; // Toggle the state
    updateToggleButtons(); // Update the display
});

document.querySelector('.toggleChant').addEventListener('click', () => {
    showSanskritChant = !showSanskritChant; // Toggle the state
    updateToggleButtons(); // Update the display
});

// Timer functionality
function updateDisplay() {
    timerElement.innerHTML = '00:' + sec.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        timer = setInterval(function () {
            sec++;
            updateDisplay();
        }, 1000);
        isRunning = true;
    }
}

function resume() {
    startTimer();
}

function pause() {
    clearInterval(timer);
    isRunning = false;
}

function restart() {
    clearInterval(timer);
    sec = 0;
    isRunning = false;
    updateDisplay();
    startTimer();
}

function plusPose(n) {
    currentIndex += n;
    if (currentIndex < 0) currentIndex = yogaData.length - 1;
    if (currentIndex >= yogaData.length) currentIndex = 0;
    showPose(currentIndex); // Updating the display with the new pose
    restart();
}

// Start the timer initially
startTimer();
fetchPoseData();
