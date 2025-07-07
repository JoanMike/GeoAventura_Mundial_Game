'use client'

import type * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { GameQuestion } from '@/lib/gameLogic'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GamePlayProps {
  question: GameQuestion
  questionNumber: number
  totalQuestions: number
  score: { correct: number; incorrect: number }
  onAnswer: (answer: string, isCorrect: boolean) => void
  userAnswer: { answer: string; isCorrect: boolean } | null
}

export function GamePlay({
  question,
  questionNumber,
  totalQuestions,
  score,
  onAnswer,
  userAnswer,
}: GamePlayProps): JSX.Element {
  const handleOptionClick = (option: string) => {
    if (userAnswer) return // Prevent answering multiple times
    const isCorrect = option === question.countryToGuess.name_es
    onAnswer(option, isCorrect)
  }

  const progressValue = (questionNumber / totalQuestions) * 100

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/60 dark:bg-card/20 backdrop-blur-lg border border-border/30 shadow-2xl flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
          <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary">
            Pregunta {questionNumber}/{totalQuestions}
          </CardTitle>
          <div className="text-right text-sm">
            <p className="font-semibold text-secondary">
              Correctas: {score.correct}
            </p>
            <p className="font-semibold text-destructive">
              Incorrectas: {score.incorrect}
            </p>
          </div>
        </div>
        <Progress
          value={progressValue}
          className="w-full h-2 sm:h-3 [&>div]:bg-gradient-to-r from-primary to-accent"
        />
      </CardHeader>

      <CardContent className="flex-grow flex flex-col justify-center text-center p-2 sm:p-4 md:p-6 space-y-2 sm:space-y-4">
        <p className="text-base sm:text-lg md:text-xl font-semibold">
          ¿A qué país pertenece esta bandera?
        </p>

        <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto aspect-[3/2] rounded-lg overflow-hidden shadow-lg border-2 border-border/30">
          <Image
            src={question.flagUrl}
            alt={`Bandera por adivinar`}
            data-ai-hint={`flag of ${question.countryToGuess.name_en}`}
            layout="fill"
            objectFit="cover"
            priority
            sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, 40vw"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-2 sm:pt-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(
                'w-full text-left justify-start p-2 sm:p-3 h-auto text-sm sm:text-base rounded-md transition-all duration-300 ease-in-out transform hover:scale-105',
                'border-border/30 bg-transparent hover:bg-primary/10',
                userAnswer &&
                  option === question.countryToGuess.name_es &&
                  'bg-secondary border-secondary text-secondary-foreground hover:bg-secondary/90',
                userAnswer &&
                  option !== question.countryToGuess.name_es &&
                  userAnswer.answer === option &&
                  'bg-destructive border-destructive text-destructive-foreground hover:bg-destructive/90',
                userAnswer && 'opacity-70 cursor-not-allowed',
              )}
              onClick={() => handleOptionClick(option)}
              disabled={!!userAnswer}
              aria-pressed={userAnswer?.answer === option}
            >
              <span className="truncate">{option}</span>
              {userAnswer && option === question.countryToGuess.name_es && (
                <CheckCircle2 className="ml-auto h-5 w-5 flex-shrink-0" />
              )}
              {userAnswer &&
                option !== question.countryToGuess.name_es &&
                userAnswer.answer === option && (
                  <XCircle className="ml-auto h-5 w-5 flex-shrink-0" />
                )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
