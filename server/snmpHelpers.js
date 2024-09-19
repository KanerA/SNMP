const snmp = require("net-snmp");
const { sessionGet, sessionSet } = require("../utils/v3SessionFunctions");

const v3options = {
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

const v3user = {
    name: "TestUser",
    level: snmp.SecurityLevel.AuthPriv,
    authProtocol: snmp.AuthProtocols.sha,
    authKey: "TestAuthKey",
    privProtocol: snmp.PrivProtocols.des,
    privKey: "TestPrivKey"
};

const getDataFromAgent = (oids) => {
    const session = snmp.createV3Session("127.0.0.1", v3user, v3options);
    return sessionGet(oids, session)
        .then(response => response)
        .catch(error => error);
};

const setDataOnAgent = (data) => {
    const session = snmp.createV3Session("127.0.0.1", v3user, v3options);
    return sessionSet(data, session, snmp.isVarbindError, snmp.varbindError)
        .then(response => response)
        .catch(error => error);
}

module.exports = {
    v3user,
    v3options,
    getDataFromAgent,
    setDataOnAgent
}