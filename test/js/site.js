function AICCLoaded(returnValue) {
    var output = 'AICC response received!<br/>';
    for (const t in returnValue) {
        output += t + ': ' + returnValue[t] + '<br/>';
    }
    document.getElementById('Response').innerHTML = output;
}
var button = document.getElementById('AICCGet');
button.onclick = function (e) {
    document.getElementById('Response').innerHTML = 'Sending AICC Get Request...';
    event.preventDefault();
    ajaicc.aiccGet(AICCLoaded);
}
button = document.getElementById('AICCPut');
button.onclick = function (e) {
    document.getElementById('Response').innerHTML = 'Sending AICC Put Request...';
    var score = document.getElementById('Score').value;
    var time = document.getElementById('Time').value;
    event.preventDefault();
    ajaicc.putAICC('', 'Y', score, time, 'C', false, AICCLoaded);
}
button = document.getElementById('AICCExit');
button.onclick = function (e) {
    document.getElementById('Response').innerHTML = 'Sending AICC Exit Request...';
    event.preventDefault();
    ajaicc.exitAICC(AICCLoaded);
}