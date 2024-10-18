//raw JSON API from priyangsubanerjee 
//cred : https://github.com/priyangsubanerjee/yogism

let yogaData = [];
let currentIndex = 0;
let showSanskrit = false;
let sec = 0;
let timer;
let isRunning = false;
const timerElement = document.querySelector('#timer');
const nav = document.getElementById('poseNavigation');

// Fetch pose data from the API
async function fetchPoseData() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/Hussain-1303/yogism/refs/heads/master/finalPosesv2.json");
        yogaData = await response.json();
        populateNavigation();
        showPose(currentIndex);
    } catch (error) {
        console.error('Error fetching the JSON:', error);
    }
}

function populateNavigation() {
    nav.innerHTML = ''; 
    yogaData.forEach((pose, index) => {
        const li = document.createElement('li');
        li.textContent = pose.sanskrit_name;
        li.style.cursor = 'pointer';
        li.onclick = () => {
            currentIndex = index;
            showPose(currentIndex);
            restart();
            closeNav();
        };
        nav.appendChild(li);
    });
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

function showPose(index) {
    const pose = yogaData[index];
    document.querySelector('.image').innerHTML = `<img src="${pose.image}" alt="${pose.sanskrit_name}" />`;
    document.querySelector('.sanKName').textContent = pose.sanskrit_name;
    document.querySelector('.enName').textContent = pose.english_name;

    const sections = [
        { selector: '.eng_description', content: `<h3>Description</h3>${pose.description}` },
        { selector: '.sanskrit_description', content: `<h3>वर्णनम्‌</h3>${pose.sank_description}` },
        { selector: '.eng_benefits', content: `<h3>Benefits</h3>${pose.benefits}` },
        { selector: '.sanskrit_benefits', content: `<h3>लाभाः</h3>${pose.sank_benefits}` },
        { selector: '.time', content: `<h3>Time</h3>${pose.time}` },
        { selector: '.chant_english', content: `<h3>Mantra</h3>${pose.eng_mantra}` },
        { selector: '.chant_sanskrit', content: `<h3>मन्त्रः</h3>${pose.sank_mantra}` }
    ];

    sections.forEach(section => {
        document.querySelector(section.selector).innerHTML = section.content;
    });

    // Split and format steps
    ['steps', 'sank_steps'].forEach((key, index) => {
        const steps = pose[key].split('\n').map(step => `<li>${step}</li>`).join('');
        document.querySelector(index === 0 ? '.eng_steps' : '.sanskrit_steps').innerHTML = `<h3>${index === 0 ? 'Steps' : 'पदानि'}</h3><ul>${steps}</ul>`;
    });

    updateLanguageDisplay();
}

function updateLanguageDisplay() {
    const toggleButton = document.getElementById('languageToggle');
    const sections = [
        { selector: '.sanKName', show: showSanskrit },
        { selector: '.enName', show: !showSanskrit },
        { selector: '.eng_steps', show: !showSanskrit },
        { selector: '.sanskrit_steps', show: showSanskrit },
        { selector: '.eng_description', show: !showSanskrit },
        { selector: '.sanskrit_description', show: showSanskrit },
        { selector: '.eng_benefits', show: !showSanskrit },
        { selector: '.sanskrit_benefits', show: showSanskrit },
        { selector: '.chant_english', show: !showSanskrit },
        { selector: '.chant_sanskrit', show: showSanskrit }
    ];

    sections.forEach(({ selector, show }) => {
        document.querySelector(selector).style.display = show ? 'block' : 'none';
    });

    toggleButton.textContent = showSanskrit ? 'Switch to English' : 'Switch to Sanskrit';
}

document.getElementById('languageToggle').addEventListener('click', () => {
    showSanskrit = !showSanskrit;
    updateLanguageDisplay();
});

function updateDisplay() {
    timerElement.innerHTML = `00:${sec.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        timer = setInterval(() => {
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
    currentIndex = (currentIndex + n + yogaData.length) % yogaData.length; // Cycle through poses
    showPose(currentIndex);
    restart();
}

startTimer();
fetchPoseData();
