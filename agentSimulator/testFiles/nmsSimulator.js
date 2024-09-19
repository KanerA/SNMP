const snmp = require("net-snmp");

const testOIDs = [
    "1.3.6.1.4.1.9999.1.3.0"
]; // these OIDs needs to appear on the Example MIB you are using

const session = snmp.createSession("127.0.0.1", "public");

session.get(testOIDs, (error, varbinds) => {
    if (error) return console.log("An error has occured ", error);
    console.log("Varbinds received from agent: ", varbinds);
    session.close();
});

