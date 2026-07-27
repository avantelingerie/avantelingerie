const test = async () => {
    try {
        const response = await fetch('http://localhost:3000/hcgi/api/lia/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                session_id: '123',
                mensagem: 'Oi'
            })
        });
        const text = await response.text();
        console.log("STATUS:", response.status);
        console.log("RESPONSE:", text);
    } catch(e) {
        console.error("ERRO:", e.message);
    }
}
test();
