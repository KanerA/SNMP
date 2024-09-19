const snmp = require("net-snmp")

const sessionGet = (oids, session) => {
    return new Promise((resolve, reject) => {
        session.get(oids, (error, varbinds) => {
            if (error) {
                console.log("an error has occured ", error);
                return reject(error);
            };
            console.log(varbinds)
            const bufferToString = varbinds.map(val => ({ ...val, value: val.value.toString() }));
            console.log("Varbinds received from agent: ", { bufferToString, time: new Date() });
            resolve(bufferToString)
            session.close();
        })
    })
};

const sessionSet = (varbinds, session) => {
    return new Promise((resolve, reject) => {
        session.set(varbinds, (error, resVarbinds) => {
            if (error) {
                console.log("an error has occured ", error);
                return reject(error)
            }

            const bufferToString = []
            resVarbinds.forEach(curr => {
                if (snmp.isVarbindError(curr)) {
                    console.error(snmp.varbindError(curr));
                }
                else {
                    console.log(curr.oid + "|" + curr.value);
                    bufferToString.push({ ...curr, value: curr.value.toString() })
                }
            })
            resolve(bufferToString);
            session.close();
        })
    })
}

const sessionGetBulk = (oid, session) => {
    const tempVarbinds = [];
    return new Promise((resolve, reject) => {
        const doneCb = (error) => {
            if (error) console.error(error.toString());
            console.log(":DONE")
            resolve(tempVarbinds);
        }

        const feedCb = (varbinds) => {
            for (var i = 0; i < varbinds.length; i++) {
                if (snmp.isVarbindError(varbinds[i]))
                    console.error(snmp.varbindError(varbinds[i]));
                else
                    console.log(varbinds[i].oid + "|" + varbinds[i].value);
                tempVarbinds.push();
            }
        }
        session.subtree(oid[0], 20, feedCb, doneCb);
        // resolve(tempVarbinds);
    })
};

module.exports = {
    sessionGet,
    sessionSet,
    sessionGetBulk
}
