let data = []; 

        async function fetchPoseData() {
            const yogaUrl = "https://raw.githubusercontent.com/Hussain-1303/yogism/refs/heads/master/finalPosesv2.json";

            try {
                const response = await fetch(yogaUrl);
                data = await response.json();

                data.forEach(pose => {
                    delete pose.variations;
                    delete pose.category;
                    delete pose.target;
                    pose.sank_benefits = "Sankrit Benefits goes here";
                    pose.sank_steps = "Sankrit Steps goes here";
                    pose.eng_mantra = "Random Mantra"
                    pose.sank_mantra = "Sanskrit Mantra goes here";
                });

                // Convert the modified data to JSON format
                const jsonData = JSON.stringify(data, null, 2);

                // Create a Blob object with the JSON data
                const blob = new Blob([jsonData], { type: "application/json" });

                // Create a download link for the JSON file
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'modified-poses.json';

                // Attach the download action to the button
                document.getElementById('downloadBtn').addEventListener('click', () => {
                    link.click();
                });

                console.log('Download link is ready');
                console.log(data);
            } catch (error) {
                console.error('Error fetching the JSON:', error);
            }
        }

        fetchPoseData();