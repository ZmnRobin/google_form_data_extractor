document.getElementById("extract").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractQuestionsAndOptions
    }, (result) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }

        let extractedData = result[0].result;
        if (extractedData.length === 0) {
            document.getElementById("output").innerHTML = "No questions found.";
            return;
        }

        let outputHTML = "";
        extractedData.forEach((q, index) => {
            outputHTML += `<div><strong>Q${index + 1}:</strong> ${q.question}</div>`;

            q.options.forEach((option, i) => {
                const optionLetter = String.fromCharCode(65 + i); // Convert 0 -> A, 1 -> B, etc.
                outputHTML += `<div style="margin-left: 15px;">${optionLetter}. ${option}</div>`;
            });

            outputHTML += "<br>";
        });

        document.getElementById("output").innerHTML = outputHTML;
    });
});

function extractQuestionsAndOptions() {
    let questions = [];
    document.querySelectorAll(".Qr7Oae").forEach((qEl) => {
        let questionText = qEl.innerText.trim();
        let options = [];

        // Find the options container safely
        let parentContainer = qEl.closest(".geS5n") || qEl.parentElement; 
        if (!parentContainer) return; // Skip if no valid container found

        // Get options for this question
        let optionsElements = parentContainer.querySelectorAll(".zS60Ie div");
        optionsElements.forEach((optEl) => {
            let optionText = optEl.innerText.trim();
            if (optionText) options.push(optionText);
        });

        if (questionText) {
            questions.push({ question: questionText, options });
        }
    });
    return questions;
}
