const ctx = document.getElementById('myChart').getContext('2d');

const data = {
    labels: [
        'Шок', 
        'Хаотичное зло', 
        'Выезжаем на Рассвете', 
        'Оладушки', 
        'Возвращение', 
        'Книжный Червь', 
        'Возрождение', 
        'Oneshot', 
        'Заклинатель баранов', 
        'Секрет', 
        'Экстремальный Бартер'
    ],
    datasets: [{
        label: 'Процент достижений',
        data: [61.3, 61.1, 52.3, 50.7, 42.1, 41.6, 22.2, 19.2, 17.9, 17.9, 10.5],
        backgroundColor: [
            'rgba(123, 38, 180, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(110, 78, 207, 0.6)',
            'rgba(249, 160, 72, 0.6)',
            'rgba(103, 22, 92, 0.6)',
            'rgba(253, 195, 88, 0.6)',
            'rgba(84, 242, 155, 0.6)',
            'rgba(69, 11, 184, 0.6)',
            'rgba(47, 35, 177, 0.6)',
            'rgba(187, 57, 148, 0.6)',
            'rgba(29, 193, 211, 0.6)'
        ],
        borderColor: [
            'rgba(123, 38, 180, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(110, 78, 207, 1)',
            'rgba(249, 160, 72, 1)',
            'rgba(103, 22, 92, 1)',
            'rgba(253, 195, 88, 1)',
            'rgba(84, 242, 155, 1)',
            'rgba(69, 11, 184, 1)',
            'rgba(47, 35, 177, 1)',
            'rgba(187, 57, 148, 1)',
            'rgba(29, 193, 211, 1)'
        ],
        borderWidth: 1
    }]
};

let myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Процент'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Достижения'
                }
            }
        }
    }
});

function updateChart(type) {
    myChart.destroy();
    myChart = new Chart(ctx, {
        type: type,
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Процент'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Достижения'
                    }
                }
            }
        }
    });
}

document.getElementById('barChartButton').addEventListener('click', () => {
    updateChart('bar');
});

document.getElementById('pieChartButton').addEventListener('click', () => {
    updateChart('pie');
});

document.getElementById('lineChartButton').addEventListener('click', () => {
    updateChart('line');});