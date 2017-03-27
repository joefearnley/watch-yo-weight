axios.get('data/weights.json')
    .then(function(response) {
        let hightestWeight = 0;
        let dates = [];
        let weights = [];
        for (let key in response.data) {
            if (response.data.hasOwnProperty(key)) {
                let dateParts = response.data[key].date.split('-');
                dates.push(dateParts[1] + '/' + dateParts[2] + "/" + dateParts[0]);
                weights.push(response.data[key].weight);

                if (response.data[key].weight > hightestWeight) {
                    hightestWeight = response.data[key].weight;
                }
            }
        }

        new Chart(document.getElementById('weightChart'), {
            type: 'line',
            data:{
                labels: dates,
                datasets:[{
                    label: 'Weight in lbs',
                    data: weights,
                    borderWidth: 1
                }]
            }
        });

        const latestWeight = hightestWeight - weights[weights.length - 1];
        const totalWeightLoss = document.querySelector('#total-weight-loss');
        totalWeightLoss.innerHTML = latestWeight.toFixed(2) + ' lbs';
        const totalTime = document.querySelector('#total-time');

        let firstDate = new Date(dates[0]);
        let latestDate = new Date(dates[dates.length - 1]);

        let months = (latestDate.getMonth() + 12 * latestDate.getFullYear()) 
            - (firstDate.getMonth() + 12 * firstDate.getFullYear());
        
        totalTime.innerHTML = (months / 12).toFixed(1) + ' years';
    });