import { Configuration, OpenAIApi } from 'openai';
import { SECRET_OPENAI_API_KEY } from '$env/static/private';
import type { Actions } from './$types';

export const actions: Actions = {
    submit: async ({ request } : any) => {
        const promptFormData = await request.formData();
        const textPrompt = promptFormData.get('text-submission') as string;
        const imagePrompt = promptFormData.get('image-text-submission') as string;

        const configuration = new Configuration({
            apiKey: SECRET_OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        const textResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: textPrompt,
            temperature: 0,
            max_tokens: 45,
        });

        const imageResponse = await openai.createImage({
            prompt: imagePrompt,
            n: 3,
            size: "1024x1024",
        });

        return {
            response: textResponse.data.choices[0].text,
            imageResponse: imageResponse.data.data
        }
    }
}