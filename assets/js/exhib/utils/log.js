export function sendLog(message) {
    /* fetch('/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    }).catch(error => console.error('Error logging message:', error)) */
    console.log(message)
}