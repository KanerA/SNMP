const sessionGet = (oids, session) => {
    return new Promise((resolve, reject) => {
        session.get(oids, (error, varbinds) => {
            if (error) {
                console.log("an error has occured ", error);
                return reject(error);
            };
            const bufferToString = varbinds.map(val => ({ ...val, value: val.value.toString() }));
            console.log("Varbinds received from agent: ", { bufferToString, time: new Date() });
            tempRes = bufferToString;
            resolve(tempRes)
            session.close();
        })
    })
};

const sessionSet = (varbinds, session, isVarbindError, varbindError) => {
    return new Promise((resolve, reject) => {
        session.set(varbinds, (error, resVarbinds) => {
            if (error) {
                console.log("an error has occured ", error);
                return reject(error)
            }

            const bufferToString = []
            resVarbinds.forEach(curr => {
                if (isVarbindError(curr)) {
                    console.error(varbindError(curr));
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

module.exports = {
    sessionGet,
    sessionSet
}
