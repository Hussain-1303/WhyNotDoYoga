// const yogaUrl = "https://raw.githubusercontent.com/priyangsubanerjee/yogism/refs/heads/master/all-poses.json"

let yogaData = []; //fetched data to be stored here
let currentIndex = 0; //firstpose

function showPose(index) {
    const pose = data[index];

    document.querySelector('.image').innerHTML = `<img src="${pose.image}" alt="${pose.sanskrit_name}" />`;
    document.querySelector('.sanKName').innerHTML = `<span class="devanagari">${pose.sanskrit_name}</span>`;
    document.querySelector('.enName').textContent = pose.english_name;
    document.querySelector('.description').innerHTML = sanskritWords(pose.description);
    document.querySelector('.time').textContent = `Time: ${pose.time}`;
    document.querySelector('.benefits').innerHTML = `लाभाः (Lābhāḥ): ${sanskritWords(pose.benefits)}`;
    document.querySelector('.target').textContent = `Target: ${pose.target}`;

    const chant = getChantForPose(pose.sanskrit_name);
    document.querySelector('.chant').innerHTML = `
        <h3>मन्त्र (Mantra)</h3>
        <p class="sanskrit">${chant.sanskrit}</p>
        <p class="translation">${chant.translation}</p>`;

    const ayurveda = getAyurvedicInfo(pose.sanskrit_name);
    document.querySelector('.ayurveda').innerHTML = `
        <h3>आयुर्वेद संबंध (Āyurveda Sambandha)</h3>
        <p>दोष (Dosha): ${ayurveda.dosha}</p>
        <p>तत्त्व (Tattva): ${ayurveda.element}</p>`;
}

function plusPose(n) {
    currentIndex += n;
    if (currentIndex < 0) currentIndex = data.length - 1;
    if (currentIndex >= data.length) currentIndex = 0;
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

function sanskritWords(text) {
    const wordList = {
        'foot': 'पाद (pāda)',
        'hand': 'हस्त (hasta)',
        'head': 'शिरस् (śiras)',
        // You can add more words here
      };
    
      for (let englishWord in wordList) {
        let pattern = new RegExp('\\b' + englishWord + '\\b', 'gi');
        
        text = text.replace(pattern, function(match) {
          return '<span class="sanskrit-word" title="' + wordList[englishWord] + '">' + match + '</span>';
        });
      }
    
      return text;
}

function getChantForPose(poseName) {
    // this function to return chants for each pose
    return {
        sanskrit: "ॐ नमः शिवाय",
        translation: "Om Namah Shivaya"
    };
}

function getAyurvedicInfo(poseName) {
    //this function to return Ayurvedic associations for each pose
    return {
        dosha: "Vata-Pitta",
        element: "Air-Fire"
    };
}

fetchPoseData();