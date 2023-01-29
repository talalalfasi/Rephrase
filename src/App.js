import React, { useState } from "react";
import axios from 'axios';
import "./Rephrase.css";

const Rephrase = () => {
  const [text, setText] = useState("");
  const [languageStyle, setLanguageStyle] = useState("slang");
  const [translateToArabic, setTranslateToArabic] = useState(false);
  const [rephrasedText, setRephrasedText] = useState("");
  const [apiKey, setAPIKey] = useState("");
  
  const rephraseText = async (text, languageStyle, translateToArabic, apiKey) => {
    try {
     // const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
     const endpoint ='https://api.openai.com/v1/engines/text-davinci-003/completions';
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      };
      const prompt = `Rephrase the text in ${languageStyle} language and${translateToArabic ? ' translate to Arabic':''}:\n ${text}`;
      const data = {
        prompt: prompt,
        temperature: 0.7,
      };
      const response = await axios.post(endpoint, data, { headers });
      const rephrasedText = response.data.choices[0].text;
      setRephrasedText(rephrasedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rephrase-container">
      <form>
        <label>
          Original Text:
          <textarea value={text} onChange={e => setText(e.target.value)} />
        </label>
        <br />
        <label>
          Language Style:
          <select value={languageStyle} onChange={e => setLanguageStyle(e.target.value)}>
            <option value="slang">Slang</option>
            <option value="formal">Formal</option>
            <option value="simple english">Simple English</option>
            <option value="very formal">Very Formal</option>
          </select>
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={translateToArabic}
            onChange={e => setTranslateToArabic(e.target.checked)}
          />
          Translate to Arabic
        </label>
        <br />
        <label>
        API Key:
        <input type="text" value={apiKey} onChange={e => setAPIKey(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={() => rephraseText(text, languageStyle, translateToArabic, apiKey)}>
          Rephrase
        </button>
      </form>
      <br />
      <label>
        Rephrased Text:
        <textarea value={rephrasedText} disabled />
      </label>
    </div>
  );
};

export default Rephrase;
