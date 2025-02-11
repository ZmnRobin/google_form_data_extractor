chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract") {
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
        sendResponse({ success: true, data: questions });
    }
});
