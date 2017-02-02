axios.get('https://watch-yo-weight.firebaseio.com/weights.json')
    .then(function(response) {
        var dates = [];
        var weights = [];
        for (let key in response.data) {
            if(response.data.hasOwnProperty(key)) {
                var dateParts = response.data[key].date.split('-');
                dates.push(dateParts[1] + '/' + dateParts[2] + "/" + dateParts[0]);
                weights.push(response.data[key].weight);
            }
        }

        new Chart(document.getElementById('weightChart'), {
            type: 'line',
            data:{
                labels: dates,
                datasets:[{
                    label: '',
                    data: weights,
                    borderWidth: 1
                }]
            }
        });
    });
