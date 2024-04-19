import { useEffect, useState } from 'react';
import { getAllQuestions } from '../api'; 
import { QuestionType } from '../types';
import QuestionCard from '../components/QuestionCard';

type QuestionProps = {}

export default function Questions({}: QuestionProps) {
  const [questions, setQuestions] = useState<QuestionType[]>([]); 

  useEffect(() => {
        async function fetchData() {
            const response = await getAllQuestions();
            if (response.data) {
                let recievedquestions = response.data["questions"];
                console.log(recievedquestions);
                setQuestions(recievedquestions);
            }
        }
        fetchData();
    }, []);

  return (
    <div>
      <h1>All Questions</h1>
      <ul>
        {questions.map((que) => (
            <QuestionCard key={que.id} question={que}/>
        ))}
      </ul>
    </div>
  );
};

