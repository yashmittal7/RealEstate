const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
const parseAIResponse = require("../utils/parseAIResponse");

const generatePropertyDescription = async (propertyData) => {
  const prompt = `
You are a professional real estate copywriter.

Generate a professional property description.

Title: ${propertyData.title}
Property Type: ${propertyData.propertyType}
Location: ${propertyData.location}
Price: ₹${propertyData.price}
Bedrooms: ${propertyData.bedrooms}
Bathrooms: ${propertyData.bathrooms}

Requirements:
- 100-150 words
- Professional tone
- Do not exaggerate
- Mention key features naturally
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
};

const extractPropertyFilters = async (query) => {
  const prompt = `
You are an AI that extracts real estate search filters.

Return ONLY valid JSON.

Schema:

{
  "location": string|null,
  "propertyType": string|null,
  "bedrooms": number|null,
  "bathrooms": number|null,
  "minPrice": number|null,
  "maxPrice": number|null,
  "sort": "lowToHigh"|"highToLow"|"newest"|null
}

User Query:

${query}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = completion.choices[0].message.content;

  const cleaned = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

const propertyAdvisor = async (property, question) => {
  const prompt = `
You are an experienced Indian real estate advisor.

Property Information

Title:
${property.title}

Description:
${property.description}

Location:
${property.location}

Price:
${property.price}

Property Type:
${property.propertyType}

Bedrooms:
${property.bedrooms}

Bathrooms:
${property.bathrooms}

User Question:

${question}

Answer professionally.
Never invent property details.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.4,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
};

const recommendProperties = async (preferences, properties) => {
  const simplifiedProperties = properties.map((property) => ({
    id: property._id.toString(),

    title: property.title,

    location: property.location,

    price: property.price,

    propertyType: property.propertyType,

    bedrooms: property.bedrooms,

    bathrooms: property.bathrooms,
  }));

  const prompt = `

You are an expert real estate advisor.

User Preferences

${JSON.stringify(preferences, null, 2)}

Candidate Properties

${JSON.stringify(simplifiedProperties, null, 2)}

Rank ONLY the best three.

Return ONLY JSON.

Schema:

{
"recommendations":[
{
"id":"",
"score":94,
"summary":"",
"highlights":[
"",
"",
""
]
}
]
}

Never include property title.

Never include property price.

Never include images.

Only use the provided id.

`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    temperature: 0.2,

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return parseAIResponse(completion.choices[0].message.content);
};

module.exports = {
  generatePropertyDescription,
  propertyAdvisor,
  extractPropertyFilters,
  recommendProperties,
};
