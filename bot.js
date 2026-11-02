async function sendMessageToServer(userText) {
    if (userText.length > 1000) {
        alert("Matn 1000 ta belgidan oshmasligi kerak!");
        return;
    }

    const response = await fetch('https://SIZNING-SERVERINGIZ-MANZILI.render.com/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userText })
    });

    const result = await response.json();
    alert(result.message);
}
