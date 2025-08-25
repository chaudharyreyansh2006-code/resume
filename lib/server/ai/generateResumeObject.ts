import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { ResumeDataSchema } from '@/lib/resume';
import dedent from 'dedent';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY ?? '',
});

export const generateResumeObject = async (resumeText: string) => {
  const startTime = Date.now();
  console.log('🤖 [AI Generation] Starting resume object generation');
  console.log('🤖 [AI Generation] Input text length:', resumeText.length);
  console.log('🤖 [AI Generation] Input text preview:', resumeText.substring(0, 500) + '...');
  console.log('🤖 [AI Generation] API Key available:', !!process.env.GEMINI_API_KEY);
  
  try {
    console.log('🤖 [AI Generation] Calling Gemini API...');
    const { object } = await generateObject({
      model: google('gemini-2.0-flash-lite'),
      maxRetries: 1,
      schema: ResumeDataSchema,
      mode: 'json',
      prompt:
        dedent(`You are an expert resume writer. Generate a resume object from the following resume text. Be professional and concise.
    ## Instructions:

    - If the resume text does not include an 'about' section or specfic skills mentioned, please generate appropriate content for these sections based on the context of the resume and based on the job role.
    - For the about section: Create a professional summary that highlights the candidate's experience, expertise, and career objectives.
    - For the skills: Generate a maximum of 10 skills taken from the ones mentioned in the resume text or based on the job role / job title infer some if not present.
    - If the resume doesn't contain the full link to social media website leave the username/link as empty strings to the specific social meda websites. The username never contains any space so make sure to only return the full username for the website otherwise don't return it.

    ## Resume text:

    ${resumeText}
    `),
    });

    const endTime = Date.now();
    console.log('✅ [AI Generation] Resume object generated successfully');
    console.log('🤖 [AI Generation] Generation time:', (endTime - startTime) / 1000, 'seconds');
    console.log('🤖 [AI Generation] Generated object preview:', {
      hasHeader: !!object?.header,
      headerName: object?.header?.name,
      hasSummary: !!object?.summary,
      summaryLength: object?.summary?.length,
      workExperienceCount: object?.workExperience?.length || 0,
      educationCount: object?.education?.length || 0,
      skillsCount: object?.header?.skills?.length || 0
    });

    return object;
  } catch (error) {
    const endTime = Date.now();
    console.error('❌ [AI Generation] Error generating resume object:', error);
    console.error('❌ [AI Generation] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      generationTime: (endTime - startTime) / 1000 + ' seconds'
    });
    console.warn('❌ [AI Generation] Returning undefined due to error');
    return undefined;
  }
};
