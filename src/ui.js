/* 
* SHTUFF WE NEED:
* - Limelight camera
* - Robot state status
* - 
*/



// Define UI elements
let ui = {
    timer: document.getElementById('timer'),
    currentState: document.getElementById('currentState').firstChild,
    luniteCount: document.getElementById('luniteCt').firstChild,
};

// Key Listeners

// update state name
NetworkTables.addKeyListener('/SmartDashboard/currentState', (key, value) => {
    ui.currentState.textContent = value;
});
// update lunite count
NetworkTables.addKeyListener('/SmartDashboard/luniteCount', (key, value) => {
    ui.luniteCount.textContent = value;
});

// update timer
NetworkTables.addKeyListener('/Smartdasboard/gameTime', (key, value) => {
    // This is an example of how a dashboard could display the remaining time in a match.
    // We assume here that value is an integer representing the number of seconds left.
    ui.timer.textContent = value < 0 ? '0:00' : Math.floor(value / 60) + ':' + (value % 60 < 10 ? '0' : '') + parseInt(value % 60);
});

addEventListener('error', (ev) => {
    window.api.sendWindowError({
        mesg: ev.message,
        file: ev.filename,
        lineNumber: ev.lineno
    });
});
