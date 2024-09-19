const snmp = require("net-snmp");
const { sessionSet } = require("../../utils/v3SessionFunctions");

const testVarbinds = [
    {
        oid: "1.3.6.1.4.1.9999.1.1.0",
        type: snmp.ObjectType.OctetString,
        value: "afknsdgoin"
    }
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

console.log(snmp.ObjectType)

const session = snmp.createV3Session("127.0.0.1", user, options);

sessionSet(testVarbinds, session, snmp.isVarbindError, snmp.varbindError).then(val => console.log(val))
