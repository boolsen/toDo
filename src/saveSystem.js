class SaveSystem {
    constructor(type = "localStorage") {
        if (this.storageAvailable(type)) {
            this.storage = window[type];
        } else {
            let store = {};
            this.storage = {
                getItem: key => store[key] ?? null,
                setItem: (key, value) => { store[key] = value; },
                removeItem: key => { delete store[key]; },
                clear: () => { store = {}; },
                key: index => Object.keys(store)[index] || null,
                get length() { return Object.keys(store).length; }
            };
        }
    }
    saveData(key, objToStore){
        const objJSON = JSON.stringify(objToStore);
        this.storage.setItem(key,objJSON);
        console.log(objToStore[1]);
        window.testVar = objToStore[1];   
    }

    loadData(key){
        const storedData = this.storage.getItem(key);
        const parsedData = storedData ? JSON.parse(storedData) : null;
        return parsedData;
    }

    storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
            );
        }
    }
}

export {SaveSystem};