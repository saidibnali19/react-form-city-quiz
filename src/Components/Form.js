import React, { useState } from "react";

export default function Form() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");

  if (status === "success") return <p>That's right!</p>;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    try {
      await submitForm(answer);
      setStatus("success");
    } catch (error) {
      setStatus("typing");
      setError(error);
    }
  }

  function submitForm(answer) {
    // Pretend it's hitting the network
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let shouldError = answer.toLowerCase() !== "lima";
        if (shouldError)
          reject(new Error("Good guess but a wrong answer. Try again"));
        else resolve();
      }, 1500);
    });
  }

  return (
    <>
      <h1>City quiz</h1>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={status === "submitting"}
        />
        <button disabled={answer.length === 0 || status === "submitting"}>
          Submit
        </button>
        {error !== null && <p className="Error">{error.message}</p>}
      </form>
    </>
  );
}
