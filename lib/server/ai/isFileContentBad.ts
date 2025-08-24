import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY ?? '',
});

export const isFileContentBad = async (fileContent: string) => {
  try {
    const generationResult = await generateText({
      model: google('gemini-2.0-flash'),
      prompt: `You are a content moderation assistant. Analyze the following file content and determine if it contains harmful, inappropriate, spam, or unsafe content.
      
      Respond with "unsafe" if the content is:
      - Harmful or offensive
      - Contains spam or promotional material
      - Inappropriate for a professional resume platform
      - Contains personal sensitive information that shouldn't be public
      
      Respond with "safe" if the content is appropriate for a resume or professional document.
      
      File content to analyze:
      ${fileContent}
      `,
    });

    return generationResult.text.toLowerCase().startsWith('unsafe');
  } catch (error) {
    console.warn('Error checking file content safety:', error);
    // Default to safe if there's an error
    return false;
  }
};
