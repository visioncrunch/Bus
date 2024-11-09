import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/theme/modeToggle';
import { StarsBackground } from '@/components/ui/stars-background';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string | string[];
  type: 'single' | 'multiple' | 'trueFalse';
  timeLimit: number; // New time limit property
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Is React a JavaScript library?',
    options: ['Yes', 'No'],
    answer: 'Yes',
    type: 'trueFalse',
    timeLimit: 65, // Time limit for this question
  },
  {
    id: 2,
    question: 'Which of the following are programming languages?',
    options: ['JavaScript', 'HTML', 'CSS', 'Python'],
    answer: ['JavaScript', 'Python'],
    type: 'multiple',
    timeLimit: 25, // Time limit for this question
  },
  {
    id: 3,
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    answer: 'Paris',
    type: 'single',
    timeLimit: 30, // Time limit for this question
  },

];


const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Get the time limit for the current question
  const totalDuration = questions[currentQuestionIndex].timeLimit;

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isActive && elapsedTime < totalDuration) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else if (elapsedTime >= totalDuration) {
      setIsActive(false);
      handleNext();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, elapsedTime, totalDuration]);

  const handleOptionSelect = (option: string) => {
    if (currentQuestion.type === 'multiple') {
      setSelectedAnswers(prev => {
        if (prev.includes(option)) {
          return prev.filter(ans => ans !== option); // Remove if already selected
        }
        return [...prev, option]; // Add new selection
      });
    } else {
      setSelectedAnswers([option]); // Single selection
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setElapsedTime(0); // Reset timer for the next question
      setIsActive(true);
      setSelectedAnswers([]); // Reset selected answers
    } else {
      setShowResults(true);
      setIsActive(false); // Stop the quiz
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setElapsedTime(0);
    setIsActive(true);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((elapsedTime / totalDuration) * 100).toFixed(2);
  const remainingTime = totalDuration - elapsedTime; // Calculate remaining time

  return (
    <>

    <StarsBackground className='z-0'/>
    <div className='relative z-10 flex flex-col justify-center items-center h-screen w-[95%] max-w-2xl m-auto'>
      {showResults ? (
          <div className='text-center text-white'>
          <h1 className='text-4xl font-bold mb-4'>Quiz Completed!</h1>
          <Button variant={'myButton'} className='bg-yellow-500 hover:bg-yellow-400 transition duration-300' onClick={handleRestart}>
            Restart Quiz
          </Button>
        </div>
      ) : (
          <>
          <div className='h-[5%] bg-indigo-200/20 w-full flex justify-center items-center font-medium text-xl mb-2 rounded-md'>
            Question {currentQuestionIndex + 1}/{questions.length}
          </div>
          <div className='h-[90%] text-center w-full bg-indigo-400/20 flex flex-col p-3 rounded-lg shadow-lg'>
            <div className='h-1/2 bg-indigo-300/20 text-start overflow-y-auto p-4 rounded-lg shadow-md'>
              <h2 className='text-lg font-semibold'>{currentQuestion.question}</h2>
            </div>
            <div className='h-1/2 flex flex-col gap-2 mt-3'>
              {currentQuestion.options.map(option => (
                  <div
                  key={option}
                  className={`flex items-center h-12 cursor-pointer rounded-md transition duration-300 
                   
                    hover:bg-blue-300`}
                    onClick={() => handleOptionSelect(option)}
                    >
                  <Button variant={'myButton'} className='flex-1 h-full'>
                    {selectedAnswers.includes(option) && <span className='text-white mr-2'>✓</span>}
                    {option}
                  </Button>
                </div>
              ))}
            </div>
            <div className='w-full bg-transparent mt-3'>
              <div className='rounded-md'>
                <div className='text-end p-2'>
                  <span className='text-gray-100'>Time remaining: <span className='font-semibold'>{remainingTime}s </span></span>
                </div>
                <div className='rounded-md bg-gray-300'>
                  <div className='w-full bg-gradient-to-r from-blue-600 to-blue-800 h-2 rounded-md timer' style={{ width: `${progress}%`, transition: 'width 1s ease-in-out' }}></div>
                </div>
              </div>
            </div>
            <div className='h-[10%] flex items-center justify-center mt-3'>
              <Button
                variant={'myButton'}
                className='w-full h-[80%] bg-blue-600 hover:bg-blue-500 transition duration-300'
                onClick={handleNext}
                disabled={selectedAnswers.length === 0}
                >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
      </>
  );
};

export default Quiz;
