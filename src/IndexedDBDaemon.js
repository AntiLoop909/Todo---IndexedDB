const DBDaemon = () => {
    let DBInstance;
    const DBRequest = window.indexedDB.open("ToDoList-db",1.0);
    
    DBRequest.onerror = (event) => {
        console.error("[DBDaemon]: DBRequest drop an error -->",event)
    }

    DBRequest.onsuccess = (event) => {
        console.info("[DBDaemon]: Connection success!! ")
        DBInstance = event.target.result;
    }

    DBInstance.onerror = (event) => {
        console.error(`[DBInstance]: ${event.target.errorCode}`);
    }

    DBRequest.onupgradeneeded = (event) => {
        console.info(`[DBRequest]: Upgrade Database --->${event.target.readyState}`)

        let ToDoListObject = DBInstance.createObjectStore("ToDoList",{autoIncrement: true})
        // Now we have the object of TODOList, we need to put some index for fast quering 

    }
}

export function DBDaemon();
