const imaps = require('imap-simple');

const config = {
    imap: {
        user: 'avantelingerie@gmail.com',
        password: 'Avantelingerie01@',
        host: 'imap.zoho.com', // Actually, avantelingerie@gmail.com is a GMAIL address, not Zoho? Wait, Zoho allows hosting any domain, or maybe they just use gmail address on Zoho?
        port: 993,
        tls: true,
        authTimeout: 10000
    }
};

imaps.connect(config).then(function (connection) {
    console.log("Connected to IMAP server successfully.");
    
    // Check INBOX
    return connection.openBox('INBOX').then(function () {
        var searchCriteria = ['UNSEEN'];
        var fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'], struct: true };
        
        return connection.search(searchCriteria, fetchOptions).then(function (messages) {
            console.log(`Found ${messages.length} unread messages in INBOX:`);
            messages.forEach(function (item) {
                var header = item.parts.filter(function (part) {
                    return part.which === 'HEADER.FIELDS (FROM TO SUBJECT DATE)';
                })[0].body;
                console.log(`- From: ${header.from[0]}, Subject: ${header.subject[0]}, Date: ${header.date[0]}`);
            });
            
            // Now check SPAM
            return connection.openBox('Spam').then(function () {
                return connection.search(searchCriteria, fetchOptions).then(function (spamMessages) {
                    console.log(`Found ${spamMessages.length} unread messages in Spam:`);
                    spamMessages.forEach(function (item) {
                        var header = item.parts.filter(function (part) {
                            return part.which === 'HEADER.FIELDS (FROM TO SUBJECT DATE)';
                        })[0].body;
                        console.log(`- From: ${header.from[0]}, Subject: ${header.subject[0]}, Date: ${header.date[0]}`);
                    });
                    connection.end();
                }).catch(err => {
                    console.log("Error checking Spam box:", err);
                    connection.end();
                });
            });
        });
    });
}).catch(err => {
    console.error("Failed to connect via IMAP:", err);
});
