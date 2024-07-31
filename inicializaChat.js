import dotenv, { parse } from 'dotenv';
       dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); //('AIzaSyDloHGRP5hndljL4IgM8V4BFp49eu4bqI0');

const funcoes = {
  taxaJurosDeLicenca: ({ value }) => {
    const tamanhoPropriedade = typeof value === "string" ? parseInt(value) : value;
    if (tamanhoPropriedade <= 4) {
      return 120;
    } else if (tamanhoPropriedade <= 10) {
      return 180;
    } else if (tamanhoPropriedade <= 20) {
      return 230;
    }
  }
};

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});

let chat;

function inicializaChat() {
    chat = model.startChat({
        history: [
            {
              role: "user",
              parts: [{ text: `Você é Pedro, um chatbot amigável que representa Secretaria de Agricultura de Charqueadas. 
                               Você ira responder mensagens referentes a serviços prestados, processos e informações diversas.` }],
            },
            {
              role: "model",
              parts: [{ text: `Olá! Obrigado po r entrar em contato com a Secretaria de Agrucultura. 
                               Antes de responder suas dúvidas, pode me informar seu nome e endereço de e-mail?` }],
            },
        ],
        generationConfig: {
          maxOutputTokens: 1000
        },
    });
}

export {chat, inicializaChat}