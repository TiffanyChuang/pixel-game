import axios from 'axios';

const API_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

/**
 * Fetch questions from Google Apps Script
 * @param {number} count - Number of questions to fetch
 * @returns {Promise<Array>} - Array of question objects
 */
export const fetchQuestions = async (count = 5) => {
    if (!API_URL || API_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_URL')) {
        console.warn('Using mock questions. Please configure VITE_GOOGLE_APPS_SCRIPT_URL.');
        return mockQuestions(count);
    }

    try {
        const response = await axios.get(`${API_URL}?action=getQuestions&count=${count}`);
        if (response.data.status === 'success') {
            return response.data.data;
        }
        throw new Error(response.data.message || 'Failed to fetch questions');
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

/**
 * Submit game result to Google Apps Script
 * @param {Object} data - Schema: { id, score, passed, totalTime, questionCount }
 * @returns {Promise<Object>} - Response data
 */
export const submitResult = async (data) => {
    if (!API_URL || API_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_URL')) {
        console.warn('Using mock submit. Please configure VITE_GOOGLE_APPS_SCRIPT_URL.');
        return { status: 'success', message: 'Mock submission successful' };
    }

    try {
        // Google Apps Script usually requires POST data as stringified JSON or URL encoded, 
        // and sometimes requires 'no-cors' mode or fetch with tweaks. 
        // Usually 'text/plain' content type avoids preflight issues with GAS.
        const response = await axios.post(API_URL, JSON.stringify({
            action: 'publishResult',
            ...data
        }), {
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            }
        });

        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Mock Data
const mockQuestions = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        question: `Question ${i + 1}: What is 1 + ${i}?`,
        options: ['1', `${1 + i}`, '10', '0'],
        answer: 'B' // Assuming the second option is always correct for mock
    }));
};
