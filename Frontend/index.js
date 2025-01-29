function listen() {
  if ("webkitSpeechRecognition" in window) {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById("text-prompt").value = transcript;
    };

    recognition.onerror = (error) => {
      console.error("Speech recognition error:", error);
    };

    recognition.onend = () => {
      recognition.stop();
    };
  } else {
    alert("Speech recognition is not supported in this browser.");
  }
}

const form = document.getElementById("gemini-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission
  event.stopPropagation(); // Additional layer of prevention

  try {
    const inputValue = document.getElementById("text-prompt");
    const textContainer = document.getElementById("response-text");
    const uploadedFile = document.getElementById("file-upload");
    textContainer.innerHTML = "";
    const request = inputValue.value;
    const file = uploadedFile.files[0];
    const formData = new FormData();
    formData.append("request", request);

    if (file) {
      formData.append("file", file);
      console.log("File attached");
    } else {
      console.log("No file attached");
    }

    console.log("Form Data: ", formData);
    const response = await fetch(
      "http://localhost:8000/api/v3/prompt/request",
      {
        method: "POST",
        body: formData,
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Response received: ", result);

    if (result.content) {
      textContainer.innerHTML = result.content;
    } else {
      textContainer.innerHTML = "No content received from the server.";
    }
  } catch (error) {
    console.error("Error submitting form: ", error.message);
    alert("An error occurred while submitting the form: " + error.message);
  }
});

function refresh() {
  document.getElementById("response-text").innerHTML = "";
  document.getElementById("text-prompt").value = "";
  document.getElementById("file-upload").value = "";
}
