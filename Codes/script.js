document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("taxForm");
    const ageField = document.getElementById("age");
    const incomeField = document.getElementById("income");
    const deductionsField = document.getElementById("deductions");
    const ageError = document.getElementById("ageError");
    const incomeError = document.getElementById("incomeError");
    const deductionsError = document.getElementById("deductionsError");
    const modal = document.getElementById("modal");
    const modalContent = document.querySelector(".modal-content");
    const resultContainer = document.getElementById("result");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();

        if (!validateAge() || !validateIncome() || !validateDeductions()) {
            return;
        }

        const age = ageField.value;
        const income = parseFloat(incomeField.value);
        const deductions = parseFloat(deductionsField.value);

        let tax = 0;
        if (income - deductions > 8) {
            const taxableAmount = income - deductions - 8;
            if (age === "<40") {
                tax = taxableAmount * 0.3;
            } else if (age === "≥40 & <60") {
                tax = taxableAmount * 0.4;
            } else {
                tax = taxableAmount * 0.1;
            }
        }

        showModal(tax.toFixed(2));
    });

    function clearErrors() {
        ageError.style.display = "none";
        incomeError.style.display = "none";
        deductionsError.style.display = "none";
    }

    function validateAge() {
        if (ageField.value === "") {
            ageError.style.display = "block";
            return false;
        }
        return true;
    }


    
    function validateIncome() {
        if (incomeField.value === "" || isNaN(parseFloat(incomeField.value))) {
            incomeError.style.display = "block";
            return false;
        }
        return true;
    }

    function validateDeductions() {
        if (deductionsField.value === "" || isNaN(parseFloat(deductionsField.value))) {
            deductionsError.style.display = "block";
            return false;
        }
        return true;
    }

    function showModal(tax) {
        resultContainer.textContent = `Your tax amount is: ${tax} Lakhs`;
        modal.style.display = "block";

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }

        document.querySelector(".close").addEventListener("click", function () {
            modal.style.display = "none";
        });
    }
});
