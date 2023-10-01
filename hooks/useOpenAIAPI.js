import React, { useState, useEffect } from 'react';
import { OpenAI } from 'openai';

// A custom hook that returns an OpenAI API client object
export default function useOpenAIAPI() {
  const [openaiAPI, setOpenAIAPI] = useState(null);

  useEffect(() => {
    // Create an OpenAI API client object with your API key
    const openaiAPI = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPEN_AI_SECRET, dangerouslyAllowBrowser: true });
    // Set the state with the OpenAI API client object
    setOpenAIAPI(openaiAPI);
  }, []);

  return openaiAPI;
}
