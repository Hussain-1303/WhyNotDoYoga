//raw JSON API from priyangsubanerjee 
//cred : https://github.com/priyangsubanerjee/yogism

let yogaData = []; // Fetched data to be stored here
let currentIndex = 0; // First pose
let showSanskrit = false; // Toggle state for language

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
        li.textContent = pose.sanskrit_name; // Display the Sanskrit name
        li.style.cursor = 'pointer'; // Change cursor to pointer for better UX
        li.addEventListener('click', () => {
            currentIndex = index;
            showPose(currentIndex); // Show the selected pose
            restart(); // Restart the timer
            closeNav(); // Close the navigation after selection
        });
        nav.appendChild(li); // Add the list item to the navigation
    });
}

// Open the side navigation
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

// Close the side navigation
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

// Show pose details
function showPose(index) {
    const pose = yogaData[index];

    document.querySelector('.image').innerHTML = `<img src="${pose.image}" alt="${pose.sanskrit_name}" />`;
    document.querySelector('.sanKName').textContent = pose.sanskrit_name;
    document.querySelector('.enName').textContent = pose.english_name;

    // Set description and benefits
    document.querySelector('.eng_description').innerHTML = `<h3>Description</h3>${pose.description}`;
    document.querySelector('.sanskrit_description').innerHTML = `<h3>वर्णनम्‌</h3>${pose.sank_description}`;

    document.querySelector('.eng_benefits').innerHTML = `<h3>Benefits</h3>${pose.benefits}`;
    document.querySelector('.sanskrit_benefits').innerHTML = `<h3>लाभाः</h3>${pose.sank_benefits}`;

    document.querySelector('.time').innerHTML = `<h3>Time</h3>${pose.time}`;

    // Split steps by newline and format them as a list
    const stepsEng = pose.steps.split('\n').map(step => `<li>${step}</li>`).join('');
    const stepsSanskrit = pose.sank_steps.split('\n').map(step => `<li>${step}</li>`).join('');
    
    document.querySelector('.eng_steps').innerHTML = `<h3>Steps</h3><ul>${stepsEng}</ul>`;
    document.querySelector('.sanskrit_steps').innerHTML = `<h3>पदानि</h3><ul>${stepsSanskrit}</ul>`;

    // Update chant
    document.querySelector('.chant_english').innerHTML = `<h3>Mantra</h3>${pose.eng_mantra}`;
    document.querySelector('.chant_sanskrit').innerHTML = `<h3>मन्त्रः</h3>${pose.sank_mantra}`;

    // Update language toggle display
    updateLanguageDisplay();
}

// Function to update the language display for all sections
function updateLanguageDisplay() {
    // Toggle for name
    document.querySelector('.sanKName').style.display = showSanskrit ? 'block' : 'none';
    document.querySelector('.enName').style.display = showSanskrit ? 'none' : 'block';

    // Toggle for steps
    document.querySelector('.eng_steps').style.display = showSanskrit ? 'none' : 'block';
    document.querySelector('.sanskrit_steps').style.display = showSanskrit ? 'block' : 'none';

    // Toggle for description
    document.querySelector('.eng_description').style.display = showSanskrit ? 'none' : 'block';
    document.querySelector('.sanskrit_description').style.display = showSanskrit ? 'block' : 'none';

    // Toggle for benefits
    document.querySelector('.eng_benefits').style.display = showSanskrit ? 'none' : 'block';
    document.querySelector('.sanskrit_benefits').style.display = showSanskrit ? 'block' : 'none';

    // Toggle for mantra
    document.querySelector('.chant_english').style.display = showSanskrit ? 'none' : 'block';
    document.querySelector('.chant_sanskrit').style.display = showSanskrit ? 'block' : 'none';

    // Update button text
    const toggleButton = document.getElementById('languageToggle');
    toggleButton.textContent = showSanskrit ? 'Switch to English' : 'Switch to Sanskrit';
}

// Toggle language event listener
document.getElementById('languageToggle').addEventListener('click', () => {
    showSanskrit = !showSanskrit; // Toggle the state
    updateLanguageDisplay(); // Update the display
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
