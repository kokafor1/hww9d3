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

export type LoginType = {
    email: string;
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

export type EditUserType = {
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    confirm: string;
}

export type CreateQuestionType = {
    answer: string;
    question: string;
}

export type EditQuestionType =  {
    answer? : string,
    question? : string
}

export type QuestionId = {
    id: number
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
