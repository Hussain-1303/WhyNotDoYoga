//raw JSON API from priyangsubanerjee 
//cred : https://github.com/priyangsubanerjee/yogism

const yogaUrl = "https://raw.githubusercontent.com/priyangsubanerjee/yogism/refs/heads/master/all-poses.json"

fetch(yogaUrl)
    .then(response => response.json())
    .then(data => {
      const imageContainer = document.querySelector('.image');
      const sanKNameContainer = document.querySelector('.sanKName');
      
    //   // Cannot use for loop beacuase some images are corrupted and are not being fetched
    //   data.forEach(pose => {
    //     // Add image and Sanskrit name dynamically
    //     imageContainer.innerHTML = `<img src="${pose.image}" alt="${pose.Vrksasana}">`;
    //     sanKNameContainer.innerHTML = pose.Vrksasana;
    //   });

      const pose = data[2];


      imageContainer.innerHTML = `<img src="${pose.image}" alt="${pose.sanskrit_name}">`;

      sanKNameContainer.innerHTML = pose.sanskrit_name;

      document.querySelector('.enName').innerHTML = '';
    })

.catch(error => console.error('Error fetching the JSON:', error));