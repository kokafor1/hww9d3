import { QuestionType } from "../types";
import Card from 'react-bootstrap/Card';


type QuestionCardProps = {
    question: QuestionType;
}

export default function QuestionCard({question}: QuestionCardProps){
    return (
        <>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Question: {question.question}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Author: {question.author}</Card.Subtitle>
                <Card.Text>Answer: {question.answer}</Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}