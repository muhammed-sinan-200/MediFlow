const highRiskKeywords = [
    "chest pain",
    "difficulty breathing",
    "trouble breathing",
    "shortness of breath",
    "fainting",
    "unconscious",
    "seizure",
    "overdose",
    "suicide",
    "bleeding heavily",
    "stroke",
    "heart attack",
    "allergic reaction"
];

const mediumRiskKeywords = [
    "fever for",
    "vomiting",
    "persistent pain",
    "headache for days",
    "infection",
    "swelling",
    "stomach pain",
    "high sugar",
    "diabetes issue"
];

const detectRisk = (message) => {
    const msg = message.toLowerCase();

    for (let keyword of highRiskKeywords) {
        if (msg.includes(keyword)) {
            return {
                riskLevel: "high",
                requiresDoctor: true,
                escalationType: "urgent_care"
            };
        }
    }

    for (let keyword of mediumRiskKeywords) {
        if (msg.includes(keyword)) {
            return {
                riskLevel: "medium",
                requiresDoctor: true,
                escalationType: "book_doctor"
            };
        }
    }

    return {
        riskLevel: "low",
        requiresDoctor: false,
        escalationType: "none"
    };
};

export default detectRisk;