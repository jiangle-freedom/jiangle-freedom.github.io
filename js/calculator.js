function openCalculator() {
    document.getElementById('calculatorPanel').classList.add('active');
}

function closeCalculator() {
    document.getElementById('calculatorPanel').classList.remove('active');
}

function calculateFunds() {
    const personCount = document.querySelector('input[name="personCount"]:checked').value;

    const baseAmountA = parseFloat(document.getElementById('baseAmountA').value);
    const monthlyDepositA = parseFloat(document.getElementById('monthlyDepositA').value);
    const availableAmountA = baseAmountA - monthlyDepositA * 3;
    // document.getElementById('availableAmountA').value = availableAmountA.toFixed(2);


    if (personCount === '2') {
        const baseAmountB = parseFloat(document.getElementById('baseAmountB').value);
        const monthlyDepositB = parseFloat(document.getElementById('monthlyDepositB').value);
        var availableAmountB = baseAmountB - monthlyDepositB * 3;
        // document.getElementById('availableAmountB').value = availableAmountB.toFixed(2);
    }

    if (!availableAmountB) availableAmountB = 0;

    const monthlyInstallment = parseFloat(document.getElementById('monthlyInstallment').value);
    const months = parseInt(document.getElementById('months').value);
    const totalInstallments = monthlyInstallment * months;
    // document.getElementById('totalInstallments').value = totalInstallments;

    // Calculate future value

    const payableInAdvance = availableAmountA + availableAmountB - totalInstallments;

    document.getElementById('result').innerHTML = `
        <h4>计算结果:</h4>
        <p>可用金额A: ¥${availableAmountA.toFixed(2)}</p>
        ${personCount === '2' ? `<p>可用金额B: ¥${availableAmountB.toFixed(2)}</p>` : ''}
        <p>周期内已还金额：￥${totalInstallments.toFixed(2)} </p>
        <p>可提前还款金额: ¥${payableInAdvance.toFixed(2)}</p>
    `;
}

function initializeCalculator() {
    // 绑定单双人选择的事件监听
    document.querySelectorAll('input[name="personCount"]').forEach(radio => {
        radio.addEventListener('change', function(e) {
            const personBInputs = document.getElementById('personBInputs');
            if (personBInputs) {
                personBInputs.style.display = e.target.value === '2' ? 'block' : 'none';
            }
        });
    });

    // 绑定表单提交事件
    const calculatorForm = document.getElementById('calculatorForm');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateFunds();
        });
    }
}

// 在组件加载完成后初始化计算器
document.addEventListener('DOMContentLoaded', function() {
    // 监听计算器面板的加载
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                if (document.getElementById('calculatorPanel')) {
                    initializeCalculator();
                    observer.disconnect(); // 停止观察
                }
            }
        });
    });

    // 开始观察 document.body 的变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Initialize calculator event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.getAttribute('href') === '#calculator') {
            e.preventDefault();
            openCalculator();
        }
    });
});