import axios from 'axios';
import { UserFormType, QuestionType } from './types';

const baseURL: string = "https://cae-bookstore.herokuapp.com";

const questionEndpoint: string = "/question";
const allQuestionEndpoint: string = "/question/all";
const userEndpoint: string = "/user";


const apiClientNoAuth = () =>
    axios.create({
        baseURL: baseURL,
    });


const apiClientTokenAuth = (token: string) => {
    return axios.create({
        baseURL: baseURL,
        headers: { Authorization: `Bearer ${token}` },
    });
};

type APIResponse<T> = {
    data?: T;
    error?: string;
};

async function getAllQuestions(): Promise<APIResponse<{ questions: QuestionType[] }>> {
let data;
let error;
try {
    const response = await apiClientNoAuth().get(allQuestionEndpoint);
    data = response.data;
} catch (err) {
    if (axios.isAxiosError(err)) {
        error = err.message;
    } else {
        error = `Something ain't right here`;
    }
}
return { data, error };
}

async function viewMyQuestions(
    token: string
): Promise<APIResponse<{ questions: QuestionType[] }>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(questionEndpoint);
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong with retrieving questions";
        }
    }
    return { data, error };
}

async function register(
    newUserData: UserFormType
): Promise<APIResponse<UserFormType>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().post(
            userEndpoint,
            newUserData
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong";
        }
    }
    return { data, error };
}

export {
    getAllQuestions,
    viewMyQuestions,
    register
};