const highRiskKeywords = [
    "chest pain",
    "pain in my chest",
    "chest hurts",
    "difficulty breathing",
    "trouble breathing",
    "shortness of breath",
    "can't breathe",
    "cannot breathe",
    "hard to breathe",
    "can't catch my breath",
    "fainting",
    "unconscious",
    "passed out",
    "blacked out",
    "collapsed",
    "seizure",
    "overdose",
    "suicide",
    "kill myself",
    "self harm",
    "end my life",
    "want to die",
    "bleeding heavily",
    "bleeding a lot",
    "heavy bleeding",
    "stroke",
    "face drooping",
    "one side weak",
    "sudden weakness",
    "heart attack",
    "allergic reaction",
    "anaphylaxis",
    "throat swelling"
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

// Educational / general-info phrasing (not a personal emergency report)
const educationalPatterns = [
    "what is",
    "what are",
    "what does",
    "what's",
    "whats",
    "can you explain",
    "could you explain",
    "explain",
    "tell me about",
    "define",
    "meaning of",
    "symptoms of",
    "causes of",
    "how does",
    "difference between",
    "information about"
];

// First-person / experiencing-now language → treat as real urgency
const personalUrgentPatterns = [
    "i'm having",
    "i am having",
    "i have",
    "i've got",
    "i feel",
    "i'm feeling",
    "i am feeling",
    "i can't",
    "i cannot",
    "i'm bleeding",
    "i am bleeding",
    "i passed out",
    "i blacked out",
    "i collapsed",
    "i want to die",
    "kill myself",
    "end my life",
    "self harm",
    "my chest",
    "help me",
    "i'm experiencing",
    "i am experiencing",
    "hurting"
];

const matchesAny = (msg, patterns) => patterns.some((pattern) => msg.includes(pattern));

const isEducationalQuestion = (msg) => matchesAny(msg, educationalPatterns);

const isPersonalUrgentStatement = (msg) => matchesAny(msg, personalUrgentPatterns);

const detectRisk = (message) => {
    const msg = message.toLowerCase();

    for (let keyword of highRiskKeywords) {
        if (msg.includes(keyword)) {
            // "What is a heart attack?" → low; "I'm having chest pain" → high
            if (isEducationalQuestion(msg) && !isPersonalUrgentStatement(msg)) {
                break;
            }

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
