chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed or updated.");
});

// Auto-reload when the extension is updated
chrome.runtime.onUpdateAvailable.addListener(() => {
    chrome.runtime.reload();
});

chrome.runtime.onInstalled.addListener(() => {
    console.log("Google Forms Extractor Extension Installed");
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractQuestions
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract") {
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: extractQuestions
        });
    }
});

function extractQuestions() {
    let questions = [];
    document.querySelectorAll(".Qr7Oae").forEach((qEl) => {
        let questionText = qEl.innerText;
        let options = [];
        qEl.parentElement.querySelectorAll(".z2f0Se").forEach((opt) => {
            options.push(opt.innerText);
        });
        questions.push({ question: questionText, options });
    });

    chrome.storage.local.set({ extractedData: questions });
    console.log("Extracted Questions:", questions);
}
