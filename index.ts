import { translateT9 } from '../utils/t9';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(req: any, res: any) {
    const rawInput = req.body.ApiPhoneInput || '';
    
    const userText = translateT9(rawInput);
    
    if (!userText.trim()) {
        return res.send("api_add_variable=TranslatedText,שגיאה בקלט");
    }

    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: "אתה עוזר וירטואלי קולי. ענה בתמציתיות רבה, בטקסט נקי, ללא אימוג'ים או תווים מיוחדים."
        });

        const result = await model.generateContent(userText);
        const responseText = await result.response.text();

        // החזרה לימות המשיח בפורמט שהם דורשים
        res.setHeader('Content-Type', 'text/plain');
        res.send(`api_add_variable=TranslatedText,${responseText.replace(/\n/g, ' ')}`);
    } catch (error) {
        res.send("api_add_variable=TranslatedText,שגיאה במערכת");
    }
}