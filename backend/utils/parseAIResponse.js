function parseAIResponse(text) {

    if (!text) {
        throw new Error("Empty AI response");
    }

    let cleaned = text.trim();

    // Remove ```json
    cleaned = cleaned.replace(/^```json\s*/i, "");

    // Remove ```
    cleaned = cleaned.replace(/^```\s*/i, "");

    cleaned = cleaned.replace(/\s*```$/i, "");

    try {
        return JSON.parse(cleaned);
    } catch (error) {

        console.log("------------ RAW AI RESPONSE ------------");
        console.log(text);
        console.log("-----------------------------------------");

        throw new Error("Invalid JSON returned by AI");
    }
}

module.exports = parseAIResponse;