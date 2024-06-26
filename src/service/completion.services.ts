import axios, { AxiosResponse } from 'axios';
import { envConfig } from '../shared/config/env'



class CompletionService {
  private apiUrl = 'https://api.mistral.ai/v1/chat/completions';

  async createCompletion(message: string, jsonMode: boolean = false): Promise<string> {
    const responseFormat = {
        type: jsonMode ? 'json_object' : 'text',
    }
    const requestData = {
      model: 'mistral-large-latest',
      messages: [{ role: 'user', content: message }],
      response_format: responseFormat,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${envConfig.MISTRAL_API_KEY}`,
    };
    console.log(headers)

    try {
      const response: AxiosResponse<any> = await axios.post(
        this.apiUrl,
        requestData,
        { headers },
      );
    return response.data.choices[0].message.content as string;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { CompletionService };
