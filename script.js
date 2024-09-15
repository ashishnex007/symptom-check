function nextStep() {
    if (document.getElementById('step1').style.display !== 'none') {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    } else if (document.getElementById('step2').style.display !== 'none') {
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'block';
    }
}

function showResult() {
    if (document.getElementById('step3').style.display !== 'none') {
        // Hide step 3 and show step 4
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step4').style.display = 'block';

        // Get user input
        var name = document.getElementById('name').value;
        var age = document.getElementById('age').value;

        // Get gender value
        var gender;
        var genderInputs = document.getElementsByName('gender');
        genderInputs.forEach(function (input) {
            if (input.checked) {
                gender = input.id;
            }
        });

        // Get symptoms
        var symptoms = getSelectedSymptoms();

        // Get duration value
        var duration;
        var durationInputs = document.getElementsByName('duration');
        durationInputs.forEach(function (input) {
            if (input.checked) {
                duration = input.id;
            }
        });

        // Calculate severity based on the number of days
        var severity = calculateSeverity(duration);

        // Generate JSON object
        var result = {
            "Name": name,
            "Age": age,
            "Gender": gender,
            "Symptoms": symptoms,
            "Duration": duration,
            "PossibleCauses": getPossibleCauses(symptoms),
            "Severity": severity,
            "RecommendedAction": getRecommendedAction(severity)
        };
        displayResult(result);
    }
}


// Function to get selected symptoms
// Function to get selected symptoms
function getSelectedSymptoms() {
    var symptoms = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function (checkbox) {
        symptoms.push({
            id: checkbox.id,
            label: checkbox.labels[0].innerText
        });
    });
    return symptoms;
}



// Function to calculate severity based on the number of days
function calculateSeverity(duration) {
    if (duration === "durationJustADay") {
        return "Mild";
    } else if (duration === "duration2to3Days") {
        return "Moderate";
    } else {
        return "Severe";
    }
}

// Function to get possible causes based on symptoms
function getPossibleCauses(symptoms) {
    // This is a simplified example; you should use a more extensive logic or a database for real-world scenarios
    var causes = {
        "symptomDiarrhea": "Possible causes include gastrointestinal infection or food poisoning.",
        "symptomFever": "Possible causes include viral or bacterial infections.",
        "symptomStomachache": "Possible causes include indigestion or gastrointestinal issues.",
        "symptomConstipation": "Possible causes include dehydration or dietary factors.",
        "symptomRashes": "Possible causes include allergies or skin conditions.",
        "symptomStuffyNoses": "Possible causes include respiratory infections or allergies.",
        "symptomSorethroat": "Possible causes include viral or bacterial infections.",
        "symptomEarpain": "Possible causes include ear infections or injuries."
        // Add more causes for other symptoms
    };

    var possibleCauses = [];
    symptoms.forEach(function (symptom) {
        if (causes.hasOwnProperty(symptom.id)) {
            possibleCauses.push(causes[symptom.id]);
        }
    });

    return possibleCauses;
}


// Function to get recommended action based on severity
function getRecommendedAction(severity) {
    if (severity === "Mild") {
        return "Drink plenty of fluids and get adequate rest.";
    } else if (severity === "Moderate") {
        return "Consult a healthcare professional for advice.";
    } else {
        return "Seek immediate medical attention.";
    }
}

// Function to display the result in step-4
// Function to display the result in step-4
function displayResult(result) {
    var resultContainer = document.getElementById('result-container');
    var text = document.getElementById('user_input');
    var resultHTML = '<h2>Result</h2>';
    resultHTML += '<h3>Selected Symptoms:</h3>';
    resultHTML += '<ul>';
    var str =""
    result.Symptoms.forEach(function (symptom) {
        console.log(symptom)
        console.log(symptom.label)
        str+= symptom.id.slice(7) + ' and '
        resultHTML += '<li>' + symptom.id.slice(7) + '</li>';
    });
    text.value = str
    resultHTML += '</ul>';
    resultHTML += '<h3>Possible Causes:</h3>';
    result.PossibleCauses.forEach(function (cause) {
        resultHTML += '<p>' + cause + '</p>';
    });
    resultHTML += '<h3>Severity:</h3>';
    resultHTML += '<p>' + result.Severity + '</p>';
    resultHTML += '<h3>Recommended Action:</h3>';
    resultHTML += '<p>' + result.RecommendedAction + '</p>';
    // resultHTML += '<button> send symptoms </button>';
    resultContainer.innerHTML = resultHTML;
}
