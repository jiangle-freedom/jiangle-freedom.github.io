function openCalculator() {
    document.getElementById('calculatorPanel').classList.add('active');
}

function closeCalculator() {
    document.getElementById('calculatorPanel').classList.remove('active');
}

function calculateFunds() {
    const baseAmount = parseFloat(document.getElementById('baseAmount').value);
    const monthlyDeposit = parseFloat(document.getElementById('monthlyDeposit').value);
    const months = parseInt(document.getElementById('months').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const monthlyRate = annualRate / 12;

    // Calculate future value
    let totalAmount = baseAmount;
    for (let i = 0; i < months; i++) {
        totalAmount = totalAmount * (1 + monthlyRate) + monthlyDeposit;
    }

    const interest = totalAmount - baseAmount - (monthlyDeposit * months);

    document.getElementById('result').innerHTML = `
        <h4>计算结果:</h4>
        <p>支取时总金额: ¥${totalAmount.toFixed(2)}</p>
        <p>本金合计: ¥${(baseAmount + monthlyDeposit * months).toFixed(2)}</p>
        <p>预计利息收益: ¥${interest.toFixed(2)}</p>
    `;
}

// Initialize calculator event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.getAttribute('href') === '#calculator') {
            e.preventDefault();
            openCalculator();
        }
    });

    document.getElementById('calculatorForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateFunds();
    });
});
