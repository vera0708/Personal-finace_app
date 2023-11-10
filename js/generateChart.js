const reportChat = document.querySelector('.report__chart');
let myChart;

export const clearChart = () => {
    reportChat.textContent = '';
};

export const generateChart = (data) => {
    const incomeData = data.filter((item) => item.type === 'income');
    const expensesData = data.filter((item) => item.type === 'expenses');

    const chartLabel = [...new Set(data.map((item) => item.date))];

    const reduceOperationInDate = (arrDate) =>
        chartLabel.reduce((accTotal, date) => {
            const total = arrDate
                .filter((item) => item.date === date)
                .reduce((acc, record) => acc + parseFloat(record.amount), 0);
            accTotal[0] += total;
            accTotal[1].push(accTotal[0]);
            return [accTotal[0], accTotal[1]];
        },
            [0, []],
        );

    const [accIncome, incomeAmounts] = reduceOperationInDate(incomeData);

    const [accExpenses, expensesAmounts] = reduceOperationInDate(expensesData);

    // console.log(accIncome, accExpenses, incomeAmounts, expensesAmounts);

    const balanceAmounts = incomeAmounts.map(
        (income, i) => income - expensesAmounts[i])

    const canvasChart = document.createElement('canvas');
    // myChart.id = 'myChart';
    clearChart();
    reportChat.append(canvasChart);

    const ctx = canvasChart.getContext('2d');

    if (myChart instanceof Chart) {
        myChart.destroy();
    };
    myChart = new Chart(ctx, {
        // type: 'bar',
        type: 'line',
        data: {
            labels: chartLabel,
            datasets: [
                {
                    label: 'Доходы',
                    data: incomeAmounts,
                    borderWidth: 2,
                    hidden: true,
                }, {
                    label: 'ДоРасходы',
                    data: expensesAmounts,
                    borderWidth: 2,
                    hidden: true,
                }, {
                    label: 'Баланс',
                    data: balanceAmounts,
                    borderWidth: 2,
                    hidden: true,
                },
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Мои финансы',
            },
            legend: {
                position: 'top',
            },
        },
        responsive: true,
    })
};