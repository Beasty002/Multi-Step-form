const form = document.querySelector("form");
const stepNumber = document.querySelectorAll(".step-number");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const errMsg = document.querySelectorAll(".err-msg")
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");
const step5 = document.getElementById("step5");
const step1Nxt = document.getElementById("step1Nxt");
const step2Nxt = document.getElementById("step2Nxt");
const step3Nxt = document.getElementById("step3Nxt");
const step2Back = document.getElementById("step2Back");
const step3Back = document.getElementById("step3Back");
const step4Back = document.getElementById("step4Back");
const changeBtn = document.getElementById("changeBtn");
const btn = document.querySelectorAll(".btn");
const monthlyRadio = document.querySelector("#monthly");
const yearlyRadio = document.querySelector("#yearly");
const toggleBtn = document.querySelector("#toggleBtn");
const planRadio = document.querySelectorAll(".card input")
const addOnRadio = document.querySelectorAll(".block label input");
let month = true;



btn.forEach(el => {
    el.addEventListener("click", () => {
        stepNone();
    })
});

function stepNone() {
    stepNumber.forEach(element => {
        element.classList.remove("active")
    });
}

name.addEventListener("keyup", namecheck);
// email.addEventListener("keyup", emailcheck);
phone.addEventListener("keyup", phonecheck);

step1Nxt.onclick = () => {
    let isValid = true;
    if (!emailcheck()) { isValid = false; }
    if (!namecheck()) { isValid = false; }
    if (!phonecheck()) { isValid = false; }
    stepNumber[0].classList.add("active")
    if (isValid) {
        stepNumber[1].classList.add("active")
        step1.style.left = "-100%";
        step2.style.left = "0%";
    }
}

step2Nxt.onclick = () => {
    stepNumber[2].classList.add("active")
    step2.style.left = "-100%";
    step3.style.left = "0%";
    updateSummary();
}

step3Nxt.onclick = () => {
    stepNumber[3].classList.add("active")
    step3.style.left = "-100%";
    step4.style.left = "0%";
    updateTotal();
}
document.getElementById("confirm").onclick = () => {
    stepNone();
    stepNumber[3].classList.add("active")
    step4.style.left = "-100%"
    step5.style.left = "0%"

}

step2Back.onclick = () => {
    stepNumber[0].classList.add("active")
    step2.style.left = "100%";
    step1.style.left = "0%";
}

step3Back.onclick = () => {
    stepNumber[1].classList.add("active")
    step3.style.left = "100%";
    step2.style.left = "0%";
}

step4Back.onclick = () => {
    stepNumber[2].classList.add("active")
    step4.style.left = "100%";
    step3.style.left = "0%";
}
changeBtn.onclick = () => {
    stepNone();
    stepNumber[1].classList.add("active")
    step4.style.left = "100%";
    step3.style.left = "100%";
    step2.style.left = "0%";
}


function namecheck() {
    if (name.value === "") {
        errMsg[0].style.display = "block";
        name.style.border = "1px solid red";
        return false;
    } else {
        errMsg[0].style.display = "none";
        name.style.border = "1px solid var(--cool-gray)";
        return true;
    }
}

function emailcheck() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.value === "") {
        errMsg[1].style.display = "block";
        errMsg[1].innerText = "This field is required";
        email.style.border = "1px solid red";
        return false;
    }
    else if (!emailPattern.test(email.value)) {
        errMsg[1].style.display = "block";
        email.style.border = "1px solid red";
        errMsg[1].innerText = "Please enter a valid email address";
        return false;
    }


    else {
        errMsg[1].style.display = "none";
        email.style.border = "1px solid var(--cool-gray)";
        return true;
    }
}
phone.addEventListener("input", function () {
    phone.value = phone.value.replace(/\D/g, '');
    phonecheck();
});

function phonecheck() {

    if (phone.value === "") {
        errMsg[2].style.display = "block";
        phone.style.border = "1px solid red";
        errMsg[2].innerText = "This field is required"
        return false;

    }
    else if (phone.value.length > 10) {
        errMsg[2].style.display = "block";
        phone.style.border = "1px solid red";
        errMsg[2].innerText = "Please enter a valid number less than 10"
        return false;
    }
    else {
        errMsg[2].style.display = "none";
        phone.style.border = "1px solid var(--cool-gray)";
        return true;
    }
}




document.querySelector("#monthly").checked = true;
planChecked();

function toggle() {
    if (monthlyRadio.checked) {
        yearlyRadio.checked = true;
        document.querySelector(".toggleCircle").style.left = "24px";
    } else {
        monthlyRadio.checked = true;
        toggleBtn.querySelector("span").style.left = "4px";
    }
    planChecked();
    changeAdon();
}
toggleBtn.addEventListener("click", toggle);
monthlyRadio.addEventListener("click", () => {
    toggle();
});
yearlyRadio.addEventListener("click", () => {
    toggle();
});


function planChecked() {
    const pricing = document.querySelectorAll(".plan-pricing");

    if (monthlyRadio.checked) {
        pricing[0].innerText = "$9/mo";
        pricing[1].innerText = "$12/mo";
        pricing[2].innerText = "$15/mo";
    } else {
        pricing[0].innerText = "$90/yr";
        pricing[1].innerText = "$120/yr";
        pricing[2].innerText = "$150/yr";
    }
    updateSummary();
}






//--------------------------------------------------------------------------------------------------------------------------------------------
addOnRadio.forEach(el => {
    el.addEventListener("change", () => {
        changeAdonBorder(el);
    })
})

function changeAdonBorder(el) {
    if (el.checked) {
        el.parentElement.parentElement.style.borderColor = "var(--purplish-blue)";
    }
    else {
        el.parentElement.parentElement.style.borderColor = "var(--cool-gray)";
    }
    updateSummaryAddon(el);
}




function changeAdon() {
    const adonPricing = document.querySelectorAll(".addon-pricing");
    const adon = document.querySelectorAll(".block label input");

    if (monthlyRadio.checked) {
        adonPricing[0].innerText = "$1/mo";
        adonPricing[1].innerText = "$2/mo";
        adonPricing[2].innerText = "$2/mo";

        const summaryAddon = document.querySelectorAll("tbody tr");
        if (summaryAddon.length === 0) {
            return;
        }

        summaryAddon.forEach(el => {
            if (el.classList.contains(`${adon[0].id}`)) {

                el.querySelector(".value").innerText = "+$1/mo";
            }
            else if (el.classList.contains(`${adon[1].id}`)) {
                el.querySelector(".value").innerText = "+$2/mo";
            }
            else if (el.classList.contains(`${adon[2].id}`)) {
                el.querySelector(".value").innerText = "+$2/mo";
            }

        })
    }
    else {
        adonPricing[0].innerText = "$10/yr";
        adonPricing[1].innerText = "$20/yr";
        adonPricing[2].innerText = "$20/yr";
        const summaryAddon = document.querySelectorAll("tbody tr");
        if (summaryAddon.length === 0) {
            return;
        }
        console.log("yolo1")
        summaryAddon.forEach(el => {
            if (el.classList.contains(`${adon[0].id}`)) {
                el.querySelector(".value").innerText = "+$10/yr";
            }
            else if (el.classList.contains(`${adon[1].id}`)) {
                el.querySelector(".value").innerText = "+$20/yr";
            }
            else if (el.classList.contains(`${adon[2].id}`)) {
                el.querySelector(".value").innerText = "+$20/yr";
            }

        })
    }
}
changeAdon();


planRadio.forEach((el) => {
    el.addEventListener("change", () => {
        updateSummary(el);
    })
})

function updateSummary(element) {
    const el = element || document.querySelector('.card input:checked');
    const elPrice = el.parentElement.querySelector(".plan-info .plan-pricing");
    const elName = el.parentElement.querySelector(".plan-info h2");
    const type = document.querySelector("#planType");
    const price = document.querySelector("#planPrice")
    type.innerHTML = `${elName.innerText}`;
    price.innerHTML = `${elPrice.innerText}`;

}
function updateSummaryAddon(el) {


    if (el.checked) {
        let name = el.parentElement.querySelector(".mid-block h2").innerText;
        let price = el.parentElement.querySelector(".addon-pricing").innerText;
        let container = `
                  <td>${name}</td>
                  <td class="value">${price}</td>
                `
        const tableRow = document.createElement("tr");
        tableRow.classList.add("summary-adon");
        tableRow.classList.add(`${el.id}`);
        tableRow.innerHTML = container;
        document.querySelector("tbody").appendChild(tableRow);
    }
    else {
        let trContainer = document.querySelectorAll("tbody tr");
        trContainer.forEach(row => {
            if (row.classList.contains(`${el.id}`)) {
                row.remove();
            }
        }
        )
    }

}
function updateTotal() {
    let total = 0;
    let adonTotal = 0;
    const adonVal = document.querySelectorAll(".value");
    const planPrice = document.querySelector("#planPrice");
    adonVal.forEach(val => {
        adonTotal += parseInt(val.innerText.match(/\d+/)[0]);
    })
    total = adonTotal + parseInt(planPrice.innerText.match(/\d+/)[0]);

    if (monthlyRadio.checked) {
        document.querySelector("#total").innerText = `$${total}/mo`;
        document.querySelector(".total-container span").innerText = "Total(per month)"
    }
    else {
        document.querySelector(".total-container span").innerText = "Total(per year)"
        document.querySelector("#total").innerText = `$${total}/yr`;
    }
}

