// Define UI elements
let ui = {
    timer: document.getElementById('timer'),
    autoSelect: document.getElementById('auto-select'),

    luniteCount: document.getElementById('luniteCt'),
    currentState: document.getElementById('currentState'),
};

// Key Listeners

// Update state name
NetworkTables.addKeyListener('/SmartDashboard/currentState', (key, value) => {
    ui.currentState.textContent = value;
});
// Update lunite count
NetworkTables.addKeyListener('/SmartDashboard/luniteCount', (key, value) => {
    ui.luniteCount.textContent = value;
});

NetworkTables.addKeyListener('/SmartDashboard/gameTime', (key, value) => {
    // This is an example of how a dashboard could display the remaining time in a match.
    // We assume here that value is an integer representing the number of seconds left.
    temp = 135 - value
    ui.timer.textContent = temp < 0 ? '0:00' : Math.floor(temp / 60) + ':' + (temp % 60 < 10 ? '0' : '') + parseInt(temp % 60);
});

// Load list of prewritten autonomous modes
NetworkTables.addKeyListener('/SmartDashboard/autonomous/modes', (key, value) => {
    // Clear previous list
    while (ui.autoSelect.firstChild) {
        ui.autoSelect.removeChild(ui.autoSelect.firstChild);
    }
    // Make an option for each autonomous mode and put it in the selector
    for (let i = 0; i < value.length; i++) {
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(value[i]));
        ui.autoSelect.appendChild(option);
    }
    // Set value to the already-selected mode. If there is none, nothing will happen.
    ui.autoSelect.value = NetworkTables.getValue('/SmartDashboard/currentlySelectedMode');
});

// Load list of prewritten autonomous modes
NetworkTables.addKeyListener('/SmartDashboard/autonomous/selected', (key, value) => {
    ui.autoSelect.value = value;
});


// Update NetworkTables when autonomous selector is changed
ui.autoSelect.onchange = function () {
    NetworkTables.putValue('/SmartDashboard/autonomous/selected', this.value);
};

addEventListener('error', (ev) => {
    window.api.sendWindowError({
        mesg: ev.message,
        file: ev.filename,
        lineNumber: ev.lineno
    });
});
