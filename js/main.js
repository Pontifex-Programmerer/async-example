const asyncBtn = document.querySelector('#async');
const syncBtn = document.querySelector('#sync');

asyncBtn.addEventListener('click', e => {
    e.preventDefault();
    console.info('Initiating async systemcall...');
});

syncBtn.addEventListener('click', e => {
    e.preventDefault();
    console.info('Initiating synchronous systemcall...');
    const timePassed = blockAndConsumeTime(generateRandomMilliseconds());
    console.log('search took', timePassed, 'seconds');
});


//returns a random integer between 5.000 and 10.000
function generateRandomMilliseconds(){
    return Math.round(Math.random()*5000)+5000;
}

function blockAndConsumeTime(time){
    if(time > 1000) {
        time = Math.round(time/1000);
    } else if(time> 30) {
        time=30;
    }
    const start = Date.now();
    let secondsPassed = 0;
    let trackedSecond = -1;
    do {
        secondsPassed = Math.round((Date.now() - start)/1000);
        if(secondsPassed !== trackedSecond) {
            console.log(secondsPassed);
            trackedSecond=secondsPassed;
            if(secondsPassed%2==0){
                console.log('tic');
            } else {
                console.log('toc');
            }
        }

    }while(secondsPassed < time);

    return secondsPassed;
}