const test = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8090/api/collections/lia_conversas/records?sort=-created');
        const text = await response.text();
        console.log("STATUS:", response.status);
        console.log("RESPONSE:", text);
    } catch(e) {
        console.error("ERRO:", e.message);
    }
}
test();
