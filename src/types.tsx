export type QuestionType = {
    answer: string;
    author: string;
    created_on: string;
    id: number;
    question: string;
};

export type UserFormType = {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
};

export type UserType = {
    admin: boolean | null;
    created_on: string;
    email: string;
    first_name: string;
    last_name: string;
    token: string;
    modified_on: string;
    user_id: number;
};
