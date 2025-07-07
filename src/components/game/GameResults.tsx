'use client'

import type * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Trophy, RotateCcw, Smile, Meh, Frown } from 'lucide-react'

interface GameResultsProps {
  score: { correct: number; incorrect: number }
  totalQuestions: number
  onPlayAgain: () => void
}

export function GameResults({
  score,
  totalQuestions,
  onPlayAgain,
}: GameResultsProps): JSX.Element {
  const percentage =
    totalQuestions > 0 ? Math.round((score.correct / totalQuestions) * 100) : 0

  let message = ''
  let IconComponent = Meh

  if (percentage >= 80) {
    message = '¡Excelente! Eres una expert@ en geografía.'
    IconComponent = Trophy
  } else if (percentage >= 50) {
    message = '¡Buen trabajo! Sigue practicando.'
    IconComponent = Smile
  } else {
    message = '¡No te rindas! Sigue aprendiendo.'
    IconComponent = Frown
  }

  return (
    <Card className="w-full max-w-md mx-auto text-center bg-card/60 dark:bg-card/20 backdrop-blur-lg border border-border/30 shadow-2xl">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <IconComponent className="h-16 w-16 text-accent" />
        </div>
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          ¡Juego Terminado!
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          {message}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-xl space-y-2">
          <p>
            Respuestas Correctas:{' '}
            <span className="font-bold text-secondary">{score.correct}</span>
          </p>
          <p>
            Respuestas Incorrectas:{' '}
            <span className="font-bold text-destructive">
              {score.incorrect}
            </span>
          </p>
          <p>
            Puntuación Final:{' '}
            <span className="font-bold text-primary">{percentage}%</span>
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onPlayAgain}
          className="w-full text-lg py-6 bg-accent hover:bg-accent/90"
        >
          <RotateCcw className="mr-2 h-6 w-6" />
          Jugar de Nuevo
        </Button>
      </CardFooter>
    </Card>
  )
}
