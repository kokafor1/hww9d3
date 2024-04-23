import axios from 'axios';
import { UserFormType, QuestionType, CreateQuestionType, EditQuestionType, EditUserType, LoginType, QuestionId, UserType } from '../types';

const baseURL: string = "https://cae-bookstore.herokuapp.com";

const questionEndpoint: string = "/question";
const allQuestionEndpoint: string = "/question/all";
const loginEndpoint: string = "/login";
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

const apiClientBasicAuth = (email: string, password: string) => {
    let auth = btoa(`${email}:${password}`);
    return axios.create({
        baseURL: baseURL,
        headers: { Authorization: `Basic ${auth}` },
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
        error = 'Something went wrong';
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
            error = "Something went wrong";
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

async function editQuestion(
    token: string,
    question_id: string,
    sendData: EditQuestionType
): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).put(
            questionEndpoint + "/" + question_id,
            sendData
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

async function editUser(token: string,
    sendData: EditUserType
): Promise<APIResponse<string>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).put(
            userEndpoint,
            sendData
        );
        data = response.data;
        console.log('data', data)
    } catch (err: any) {
        if (err.response) {
            console.log('axioserr', err)
            console.log('status', err.response.status)
            error = err?.message
        } else {
            error = 'Normal Error!'
        }
        console.log('WHEREREsDSADSADSA', error)
        }
    return { data, error };
}

async function deleteUser(token: string): Promise<APIResponse<string>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).delete(userEndpoint);
        data = response.data;
        console.log('data', data)
    } catch (err: any) {
        if (err.response) {
            error = err?.message
        } else {
            error = 'Normal Error!'
        }
    }
    return { data, error };
}

async function deleteQuestion(
    token: string,
    question_id: string
): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).delete(
            questionEndpoint + "/" + question_id
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = 'Something went wrong';
        }
    }
    return { data, error };
}

async function createQuestion(
    questionData: CreateQuestionType,
    token: string
): Promise<APIResponse<QuestionId>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).post(
            questionEndpoint,
            questionData
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = 'Something went wrong';
        }
    }
    return { data, error };
}

async function logUserIn(loginData: LoginType): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try {
        const response = await apiClientBasicAuth(
            loginData.email,
            loginData.password
        ).get(loginEndpoint);
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = 'Something went wrong';
        }
    }
    return { data, error };
}

export {
    getAllQuestions,
    viewMyQuestions,
    register,
    editQuestion,
    editUser,
    deleteUser,
    deleteQuestion,
    createQuestion,
    logUserIn
};