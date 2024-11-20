function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Berechne verbleibende Lebenszeit
function calculateLifeProgress(birthDate, endDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    const end = new Date(endDate);

    if (isNaN(birth) || isNaN(end)) {
        document.getElementById("remainingDays").innerText = "Ungültiges Datum!";
        return;
    }

    const totalLifeSpan = end - birth;
    const lifeLived = today - birth;
    const remainingLife = end - today;

    // Berechnung der Tage, Wochen und Monate
    const remainingDays = Math.floor(remainingLife / (1000 * 60 * 60 * 24));
    const remainingWeeks = Math.floor(remainingDays / 7);
    const remainingMonths = Math.floor(remainingDays / 30.44);
    const remainingYears = Math.floor(remainingDays / 30.44 / 12);
    const ageAtEnd = new Date(endDate).getFullYear() - new Date(birthDate).getFullYear();

    document.getElementById("targetAge").innerText = remainingYears;
    document.getElementById("remainingDays").innerText = remainingDays >= 0 ? remainingDays : "Vergangen";
    document.getElementById("remainingWeeks").innerText = remainingWeeks;
    document.getElementById("remainingMonths").innerText = remainingMonths;

    // Fortschrittsbalken Berechnung
    const progressPast = Math.min((lifeLived / totalLifeSpan) * 100, 100);
    const progressRemaining = 100 - progressPast;

    document.getElementById("progress-past").style.width = `${progressPast}%`;
    document.getElementById("progress-remaining").style.width = `${progressRemaining}%`;
}

// URL-Parameter einlesen
const birthDate = getQueryParam("birthDate"); 
const endDate = getQueryParam("endDate"); 

if (birthDate && endDate) {
    calculateLifeProgress(birthDate, endDate);
} else {
    document.getElementById("remainingDays").innerText = "Bitte Geburts- und Enddatum angeben.";
}
