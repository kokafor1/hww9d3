import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createQuestion, deleteQuestion, viewMyQuestions, } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CategoryType, CreateQuestionType, UserType, QuestionType } from '../types';

type QuestionEditProps = {
    flashMessage: (message:string, category:CategoryType) => void
    currentUser: Partial<UserType>;
}

export default function QuestionEdit({ flashMessage, currentUser }: QuestionEditProps) {
    const navigate = useNavigate();
    const {questionId} = useParams();

    const [newQuestionData, setNewQuestionData] = useState<CreateQuestionType>({question: '', answer: ''})
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const [userQuestions, setUserQuestions] = useState<QuestionType[]>([]);

    
    useEffect(() => {
        async function fetchData() {
            const response = await viewMyQuestions(currentUser.token!);
            if (response.data) {
                let recievedquestions = response.data["questions"];
                setUserQuestions(recievedquestions);
            }
        }
        fetchData();
    }, [userQuestions]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewQuestionData({...newQuestionData, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
            const token = localStorage.getItem('token') || '';

        const response = await createQuestion(newQuestionData!, token);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.id} has been updated`, 'success');
            navigate('/')
        }
    }

        const handleDeleteClick = async () => {
          const token = localStorage.getItem('token') || '';
          const response = await deleteQuestion(questionId!, token);
          if (response.error) {
            flashMessage(response.error, 'danger');
          } else {
            console.log(`Your question with id: ${questionId} has been deleted!`);
            navigate('/');
          }
        };

      

    return (
        <>
            <Card className='my-3'>
                <Card.Body>
                    <h3 className="text-center">Create Question</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Question</Form.Label>
                        <Form.Control name='question' type='text' placeholder='Enter Question Here' value={newQuestionData.question} onChange={handleInputChange} />
                        <Form.Label>Create Answer</Form.Label>
                        <Form.Control as='textarea' name='body' placeholder='Enter Answer Here' value={newQuestionData.answer} onChange={handleInputChange} />
                        <Button className='mt-3 w-50' variant='primary' type='submit'>Create</Button>
                        <Button className='mt-3 w-50' variant='danger' onClick={openModal}>Delete</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {newQuestionData.question}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {newQuestionData.question}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='danger' onClick={handleDeleteClick}>Delete Post</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
