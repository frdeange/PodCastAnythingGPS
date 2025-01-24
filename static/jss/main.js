document.addEventListener("DOMContentLoaded", function () {

  // Show loader
function showLoader() {
  const loader = document.getElementById("load");
  if (loader) {
    loader.style.display = "block";
  }
}

// Hide loader
function hideLoader() {
  const loader = document.getElementById("load");
  if (loader) {
    loader.style.display = "none";
  }
}
  
  // Step navigation logic
  const steps = document.querySelectorAll(".wizard-step");
  const progressIndicators = document.querySelectorAll(".progress-bar li");
  let currentStep = 0;

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === stepIndex);
      progressIndicators[index].classList.toggle("active", index === stepIndex);
    });
  }

  // Navigation buttons
  const nextButtons = document.querySelectorAll(".next-step-btn");
  const backButtons = document.querySelectorAll(".back-step-btn");

  nextButtons.forEach((button) =>
    button.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    })
  );

  backButtons.forEach((button) =>
    button.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    })
  );

  // -------------------------------
  // Step 1: Handle PDF and URL inputs
  // -------------------------------
  const pdfInput = document.getElementById("pdf-files");
  const urlInput = document.getElementById("website-url");
  const fileSelectedName = document.getElementById("file-selected-name"); // Element to show selected file name

  if (pdfInput && urlInput) {
    pdfInput.addEventListener("change", function () {
      if (pdfInput.files.length > 0) {
        const fileName = pdfInput.files[0].name; // Get the name of the selected file
        fileSelectedName.textContent = `Selected file: ${fileName}`; // Update the UI
        urlInput.disabled = true; // Disable URL input
        urlInput.value = ""; // Clear URL input
      } else {
        fileSelectedName.textContent = "No file selected"; // Reset the UI if no file is selected
        urlInput.disabled = false; // Enable URL input
      }
    });
    

    // Disable PDF upload if a URL is entered
    urlInput.addEventListener("input", function () {
      if (urlInput.value.trim() !== "") {
        pdfInput.disabled = true; // Disable PDF upload
        pdfInput.value = ""; // Clear PDF selection
      } else {
        pdfInput.disabled = false; // Enable PDF upload if URL input is empty
      }
    });
  } else {
    console.error(
      "PDF input or URL input is missing from the DOM. Please check the IDs."
    );
  }

  // -------------------------------
  // Extract text from PDF
  // -------------------------------
  function extractTextFromPdf() {
    if (!pdfInput || pdfInput.files.length === 0) {
      alert("Please select a PDF file before proceeding.");
      return;
    }

    const formData = new FormData();
    Array.from(pdfInput.files).forEach((file) => {
      formData.append("pdf-files", file);
    });

    fetch("/extract_text_from_pdf", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.text) {
          document.getElementById("podcast-content").value = data.text;
          showStep(1); // Proceed to step 2
        } else {
          alert("Error extracting text from the PDF.");
        }
      })
      .catch((error) => {
        console.error("Error extracting text from the PDF:", error);
      });
  }

  // -------------------------------
  // Extract text from URL
  // -------------------------------
  function extractTextFromWebsite() {
    if (!urlInput || urlInput.value.trim() === "") {
      alert("Please enter a valid URL before proceeding.");
      return;
    }

    fetch("/extract_text_from_url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: urlInput.value.trim() }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.text) {
          document.getElementById("podcast-content").value = data.text;
          showStep(1); // Proceed to step 2
        } else {
          alert("Error extracting text from the URL.");
        }
      })
      .catch((error) => {
        console.error("Error extracting text from the URL:", error);
      });
  }

  // Handle the "Next" button in Step 1
  const nextButton = document.getElementById("go-to-step-2");
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      if (pdfInput && pdfInput.files.length > 0) {
        extractTextFromPdf(); // Extract text from PDF
      } else if (urlInput && urlInput.value.trim() !== "") {
        extractTextFromWebsite(); // Extract text from URL
      } else {
        alert("Please provide either a PDF file or a URL to proceed.");
      }
    });
  } else {
    console.error("Next button for Step 1 is missing in the DOM.");
  }
  
    // -------------------------------
    // Step 2: Edit Outline
    // -------------------------------
  
    // Handle the "Next" button in Step 2
    const goToStep3Button = document.getElementById("go-to-step-3");
    if (goToStep3Button) {
      goToStep3Button.addEventListener("click", function () {
        const podcastContent = document.getElementById("podcast-content").value; // Get the extracted text
        if (podcastContent.trim() === "") {
          alert("Please provide content before proceeding.");
          return;
        }
    
        // Navigate to Step 3 without making any backend calls
        showStep(2);
      });
    } else {
      console.error("Next button for Step 2 is missing in the DOM.");
    }
  
    // -------------------------------
    // Step 3: Configure Podcast
    // -------------------------------
    function updateVoiceOptions() {
      const language = document.getElementById("language");
      const speaker1 = document.getElementById("speaker1");
      const speaker2 = document.getElementById("speaker2");
  
      if (!language || !speaker1 || !speaker2) {
        console.error("Required elements not found in the DOM.");
        return;
      }
  
      let options = "";
      switch (language.value) {
        case "en-US":
          options = `
            <option value="en-US-AvaMultilingualNeural">Ava</option>
            <option value="en-US-AndrewMultilingualNeural">Andrew</option>
            <option value="en-US-EmmaMultilingualNeural">Emma</option>
            <option value="en-US-BrianMultilingualNeural">Brian</option>
          `;
          break;
        case "de-DE":
          options = `
            <option value="de-DE-FlorianMultilingualNeural">Florian</option>
            <option value="de-DE-SeraphinaMultilingualNeural">Seraphina</option>
          `;
          break;
        case "fr-FR":
          options = `
            <option value="fr-FR-RemyMultilingualNeural">Remy</option>
            <option value="fr-FR-VivienneMultilingualNeural">Vivienne</option>
          `;
          break;
        case "it-IT":
          options = `
            <option value="it-IT-ElsaNeural">Elsa</option>
            <option value="it-IT-DiegoNeural">Diego</option>
          `;
          break;
        case "pt-BR":
          options = `
            <option value="pt-BR-FranciscaNeural">Francisca</option>
            <option value="pt-BR-AntonioNeural">Antonio</option>
          `;
          break;
        case "es-ES":
          options = `
            <option value="en-US-AvaMultilingualNeural">Ava</option>
            <option value="es-ES-AlvaroNeural">Alvaro</option>
          `;
          break;
        default:
          options = "";
      }
  
      speaker1.innerHTML = options;
      speaker2.innerHTML = options;
  
      // Select different default options for speaker1 and speaker2
      if (speaker1.options.length > 0) {
        speaker1.selectedIndex = 0;
        if (speaker2.options.length > 1) {
          speaker2.selectedIndex = 1;
        }
      }
  
      // Update the voice selection to prevent duplicates
      updateVoiceSelection();
    }
  
    function updateVoiceSelection() {
      const speaker1 = document.getElementById("speaker1");
      const speaker2 = document.getElementById("speaker2");
  
      if (speaker1 && speaker2) {
        preventDuplicateSelection([speaker1, speaker2]);
      }
    }
  
    function preventDuplicateSelection(selectors) {
      const values = selectors.map((select) => select.value);
  
      selectors.forEach((currentSelect) => {
        Array.from(currentSelect.options).forEach((option) => {
          option.disabled =
            values.includes(option.value) && option.value !== currentSelect.value;
        });
      });
    }
  
    document.getElementById("language").addEventListener("change", updateVoiceOptions);
    updateVoiceOptions();

    const generateSSMLButton = document.getElementById("generate-ssml");
    if (generateSSMLButton) {
      generateSSMLButton.addEventListener("click", function () {
        const language = document.getElementById("language").value;
        const speaker1 = document.getElementById("speaker1").value;
        const speaker2 = document.getElementById("speaker2").value;
        const podcastContent = document.getElementById("podcast-content").value;

    if (!podcastContent.trim()) {
      alert("Please provide content to generate the SSML.");
      return;
    }

    showLoader(); // Show loader while generating the SSML

    fetch("/generate_outline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: podcastContent,
        language: language,
        speaker1: speaker1,
        speaker2: speaker2,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ssml) {
          document.getElementById("ssml-content").value = data.ssml;
        } else {
          alert("Error generating the SSML. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error generating the SSML:", error);
        alert("An error occurred while generating the SSML. Please try again.");
      })
      
      .finally(() => {
        hideLoader(); // Hide loader after the operation
      });
  });
} else {
  console.error("Generate SSML button is missing in the DOM.");
}
  
    // -------------------------------
    // Step 4: Generate Audio
    // -------------------------------
  function generateAudio() {
    const outline = document.getElementById("ssml-content").value; // Correct field
    const speaker1 = document.getElementById("speaker1").value;
    const speaker2 = document.getElementById("speaker2").value;

    if (!outline.trim()) {
      alert("Please provide the SSML content to generate the audio.");
      return;
    }

    showLoader(); // Show loader while generating the audio

    // Sending data to the backend to generate the audio
    fetch("/generate_audio", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `outline=${encodeURIComponent(outline)}&speaker1=${encodeURIComponent(
        speaker1
      )}&speaker2=${encodeURIComponent(speaker2)}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.audio_file) {
          const audioUrl = data.audio_file; // URL of the generated audio file
          const audioPlayer = document.getElementById("audio-output"); // Step 4 container

          if (audioPlayer) {
            // Set the source of the audio player
            audioPlayer.src = audioUrl;
            audioPlayer.load();
            audioPlayer.play(); // Auto-play the audio

            // Proceed to step 4
            showStep(3);
          } else {
            console.error("Audio player container not found in the DOM.");
          }
        } else {
          alert("Error creating audio. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error creating audio:", error);
        alert("An error occurred while creating the audio. Please try again.");
      })
      .finally(() => {
        hideLoader(); // Hide loader after the operation
      });
  }

  // Assign the generateAudio function to the button
  const generateAudioButton = document.getElementById("generate-audio");
  if (generateAudioButton) {
    generateAudioButton.addEventListener("click", generateAudio);
  } else {
    console.error("Generate Audio button is missing in the DOM.");
  }

  // Initialize the first step
  showStep(currentStep);
});
  