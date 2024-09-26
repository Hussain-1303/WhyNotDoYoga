// const yogaUrl = "https://raw.githubusercontent.com/priyangsubanerjee/yogism/refs/heads/master/all-poses.json"

let yogaData = []; //fetched data to be stored here
let currentIndex = 0; //firstpose

function showPose(index) {
    const pose = data[index];

    document.querySelector('.image').innerHTML = `<img src="${pose.image}" alt="${pose.sanskrit_name}" />`;
    document.querySelector('.sanKName').textContent = pose.sanskrit_name;
    document.querySelector('.enName').textContent = pose.english_name;
    document.querySelector('.description').textContent = pose.description;
    document.querySelector('.time').textContent = `Time: ${pose.time}`;
    document.querySelector('.benefits').textContent = `Benefits: ${pose.benefits}`;
    document.querySelector('.target').textContent = `Target: ${pose.target}`;
}

function plusPose(n) {
    currentIndex += n; 
    showPose(currentIndex); //updating the dispay with the new pose
}

function fetchPoseData() {
    const yogaUrl = "https://raw.githubusercontent.com/priyangsubanerjee/yogism/refs/heads/master/all-poses.json"

    fetch(yogaUrl)
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData; // Assign fetched data to the data array
      showPose(currentIndex); // Display the first pose
    })
    .catch(error => console.error('Error fetching the JSON:', error));
}

fetchPoseData();