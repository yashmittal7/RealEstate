import { useState } from "react";

import { askAdvisor } from "../services/aiService";

export default function AIAdvisor({
  propertyId,
}) {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const handleAsk = async () => {

    try {

      const data =
        await askAdvisor(
          propertyId,
          question
        );

      setAnswer(
        data.answer
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold">
        AI Property Advisor
      </h2>

      <textarea
        className="border w-full mt-4 p-3"
        rows="3"
        placeholder="Ask anything about this property..."
        value={question}
        onChange={(e)=>
          setQuestion(
            e.target.value
          )
        }
      />

      <button
        onClick={handleAsk}
        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded"
      >
        Ask AI
      </button>

      {answer && (
        <div className="bg-gray-100 mt-6 p-4 rounded">
          {answer}
        </div>
      )}

    </div>
  );
}