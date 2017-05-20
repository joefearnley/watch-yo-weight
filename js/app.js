

function createChart(weights, dates) {
    new Chart(document.querySelector('#weightChart'), {
        type: 'line',
        data:{
            labels: dates,
            datasets:[{
                label: 'Weight in lbs',
                data: weights,
                borderWidth: 1,
                lineTension: 0
            }]
        }
    });
}

function createStats(weights, dates) {
    let highestWeight = weights.reduce((a, b) =>  (a > b) ? a : b);

    const weightLost = highestWeight - weights[weights.length - 1];
    const totalWeightLoss = document.querySelector('#total-weight-loss');
    totalWeightLoss.innerHTML = weightLost.toFixed(2) + ' lbs';

    const totalTime = document.querySelector('#total-time');
    const firstDate = new Date(dates[0]);
    const latestDate = new Date(dates[dates.length - 1]);
    const months = (latestDate.getMonth() + 12 * latestDate.getFullYear()) 
        - (firstDate.getMonth() + 12 * firstDate.getFullYear());

    totalTime.innerHTML = (months / 12).toFixed(1) + ' years';
}

fetch('data/weights.json')
    .then(response => {
        return response.json();
    }).then(response => {
        let dates = [];
        let weights = [];
        for (let key in response) {
            let dateParts = response[key].date.split('-');
            dates.push(dateParts[1] + '/' + dateParts[2] + "/" + dateParts[0]);
            weights.push(response[key].weight);
        }

        createChart(weights, dates);
        createStats(weights, dates);
    });