document.addEventListener("DOMContentLoaded", function () {
  // Step navigation logic
  const steps = document.querySelectorAll(".wizard-step");
  const progressIndicators = document.querySelectorAll(".progress-bar li");

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      if (index === stepIndex) {
        step.classList.add("active");
        progressIndicators[index].classList.add("active");
      } else {
        step.classList.remove("active");
        progressIndicators[index].classList.remove("active");
      }
    });
  }

  let currentStep = 0;

  // Next button logic
  const nextButtons = document.querySelectorAll(".next-step-btn");
  nextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  // Back button logic
  const backButtons = document.querySelectorAll(".back-step-btn");
  backButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  // File upload logic
  const fileInput = document.getElementById("pdf-upload");
  const fileSelectedName = document.getElementById("file-selected-name");
  if (fileInput && fileSelectedName) {
    fileInput.addEventListener("change", function () {
      const fileName = fileInput.files[0]?.name || "No file selected";
      fileSelectedName.textContent = fileName;
    });
  }

  // URL extraction logic
  const extractUrlButton = document.getElementById("extract-url");
  const urlInput = document.getElementById("url-input");
  if (extractUrlButton && urlInput) {
    extractUrlButton.addEventListener("click", function () {
      const url = urlInput.value.trim();
      if (url) {
        console.log("Extracting text from URL:", url);
        // Placeholder for extraction logic
        alert("Text extraction from the URL is not implemented yet.");
      } else {
        alert("Please enter a valid URL.");
      }
    });
  }

  // Generate audio button logic
  const generateAudioButton = document.getElementById("generate-audio");
  if (generateAudioButton) {
    generateAudioButton.addEventListener("click", function () {
      console.log("Generating audio...");
      alert("Audio generation is not implemented yet.");
      currentStep++;
      showStep(currentStep);
    });
  }

  // Restart button logic
  const restartButton = document.getElementById("restart-wizard");
  if (restartButton) {
    restartButton.addEventListener("click", function () {
      currentStep = 0;
      showStep(currentStep);
    });
  }

  // Initialize wizard
  showStep(currentStep);
});
