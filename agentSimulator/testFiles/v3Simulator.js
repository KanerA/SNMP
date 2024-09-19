const snmp = require("net-snmp");
const { sessionGet } = require("../../utils/v3SessionFunctions");

const testOIDs = [
    "1.3.6.1.4.1.9999.1.2.0"
];

const options = {
    port: 161,
    retries: 1,
    timeout: 5000,
    transport: "udp4",
    trapPort: 162,
    version: snmp.Version3,
    backwardsGetNexts: true,
    reportOidMismatchErrors: false,
    idBitsSize: 32,
    context: ""
};

const user = {
    name: "TestUser",
    level: snmp.SecurityLevel.noAuthNoPriv,
    authProtocol: snmp.AuthProtocols.sha,
    authKey: "TestAuthKey",
    privProtocol: snmp.PrivProtocols.des,
    privKey: "TestPrivKey"
};

const session = snmp.createV3Session("127.0.0.1", user, options);
sessionGet(testOIDs, session).then(val => console.log(val));
