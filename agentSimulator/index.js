const snmp = require("net-snmp");
const fs = require("fs");

const MIB_PATH = "./example.mib.txt";
const PORT = 161;

let providers;

const AgentOptions = {
    port: PORT,
    disableAuthorization: false,
    accessControlModelType: snmp.AccessControlModelType.Simple,
    address: "127.0.0.1",
    transport: "udp4"
}

try {
    if (fs.existsSync(MIB_PATH)) {
        const store = snmp.createModuleStore();
        store.loadFromFile(MIB_PATH);
        providers = store.getProvidersForModule("EXAMPLE-MIB");
        console.log("MIB file loaded successfully.");
    } else {
        console.log(`MIB file not found at ${MIB_PATH}`);
    }
} catch (err) {
    console.error("Error loading MIB file:", err);
}

const agent = snmp.createAgent(AgentOptions, function (error, data) {
    if (error) console.log("error", error)
    if (data) console.log(data);
});

const authorizer = agent.getAuthorizer();
authorizer.addCommunity("public");
authorizer.addCommunity("private");

console.log("SNMP agent is listening on port " + PORT)