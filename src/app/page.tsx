'use client'

import type * as React from 'react'
import { useState, useCallback } from 'react'
import { GameSetup } from '@/components/game/GameSetup'
import { GamePlay } from '@/components/game/GamePlay'
import { GameResults } from '@/components/game/GameResults'
import { ALL_COUNTRIES } from '@/lib/countries'
import { generateGameQuestions, type GameQuestion } from '@/lib/gameLogic'
import { useToast } from '@/hooks/use-toast'
import {
  Loader2,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Trophy,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type GameState = 'setup' | 'playing' | 'results' | 'loading'

export default function HomePage(): JSX.Element {
  const [gameState, setGameState] = useState<GameState>('setup')
  const [questions, setQuestions] = useState<GameQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })
  const [userAnswer, setUserAnswer] = useState<{
    answer: string
    isCorrect: boolean
  } | null>(null)
  const { toast } = useToast()

  const maxCountries = ALL_COUNTRIES.length

  const startGame = useCallback(
    (numCountries: number) => {
      setGameState('loading')
      setTimeout(() => {
        // Simulate loading if needed, or for smoother transition
        try {
          const gameQuestions = generateGameQuestions(
            ALL_COUNTRIES,
            numCountries,
          )
          if (gameQuestions.length === 0) {
            toast({
              title: 'Error',
              description:
                'No se pudieron generar preguntas. Intenta con más países.',
              variant: 'destructive',
            })
            setGameState('setup')
            return
          }
          setQuestions(gameQuestions)
          setCurrentQuestionIndex(0)
          setScore({ correct: 0, incorrect: 0 })
          setUserAnswer(null)
          setGameState('playing')
        } catch (error) {
          console.error('Error starting game:', error)
          toast({
            title: 'Error al iniciar',
            description:
              'Hubo un problema al preparar el juego. Inténtalo de nuevo.',
            variant: 'destructive',
          })
          setGameState('setup')
        }
      }, 200)
    },
    [toast],
  )

  const handleAnswer = (selectedAnswer: string, isCorrect: boolean) => {
    setUserAnswer({ answer: selectedAnswer, isCorrect })
    if (isCorrect) {
      setScore((prevScore) => ({
        ...prevScore,
        correct: prevScore.correct + 1,
      }))
    } else {
      setScore((prevScore) => ({
        ...prevScore,
        incorrect: prevScore.incorrect + 1,
      }))
    }
  }

  const handleNextQuestion = () => {
    setUserAnswer(null)
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
  }

  const handleShowResults = () => {
    setGameState('results')
  }

  const handlePlayAgain = () => {
    setGameState('setup')
  }

  let content

  if (gameState === 'loading') {
    content = (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-xl text-muted-foreground">
          Preparando tu aventura...
        </p>
      </div>
    )
  } else if (gameState === 'setup') {
    content = <GameSetup onStartGame={startGame} maxCountries={maxCountries} />
  } else if (gameState === 'playing' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex]
    content = (
      <GamePlay
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        score={score}
        onAnswer={handleAnswer}
        userAnswer={userAnswer}
      />
    )
  } else if (gameState === 'results') {
    content = (
      <GameResults
        score={score}
        totalQuestions={questions.length}
        onPlayAgain={handlePlayAgain}
      />
    )
  } else {
    content = (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-xl text-muted-foreground">Cargando GeoAventura...</p>
      </div>
    )
  }

  return (
    <>
      {content}

      {gameState === 'playing' && userAnswer && (
        <div className="fixed bottom-5 inset-x-0 z-50 flex justify-center px-4">
          <Card
            className="w-full max-w-md animate-in slide-in-from-bottom-5 duration-500 bg-card/80 dark:bg-card/60 backdrop-blur-lg border-border/30 shadow-2xl"
            style={{
              WebkitBackdropFilter: 'blur(16px)', // Añadir esta línea para compatibilidad con Safari
              backdropFilter: 'blur(16px)',
            }}
          >
            <CardContent className="p-4 flex flex-col items-center space-y-4">
              {userAnswer.isCorrect ? (
                <div className="flex items-center text-secondary-foreground text-sm sm:text-base font-semibold p-2 sm:p-3 bg-secondary/90 rounded-md w-full justify-center text-center">
                  <CheckCircle2 className="h-5 sm:h-6 w-5 sm:w-6 mr-2 flex-shrink-0" />{' '}
                  ¡Correcto!
                </div>
              ) : (
                <div className="flex items-center text-destructive-foreground text-sm sm:text-base font-semibold p-2 sm:p-3 bg-destructive/90 rounded-md w-full justify-center text-center">
                  <XCircle className="h-5 sm:h-6 w-5 sm:w-6 mr-2 flex-shrink-0" />{' '}
                  <span className="flex-1">
                    Incorrecto. La respuesta era:{' '}
                    {questions[currentQuestionIndex].countryToGuess.name_es}
                  </span>
                </div>
              )}

              {currentQuestionIndex < questions.length - 1 ? (
                <Button
                  onClick={handleNextQuestion}
                  className="w-full text-base sm:text-lg py-3 sm:py-4 bg-primary hover:bg-primary/90"
                >
                  Siguiente Pregunta <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button
                  onClick={handleShowResults}
                  className="w-full text-base sm:text-lg py-3 sm:py-4 bg-accent hover:bg-accent/90"
                >
                  Ver Resultados <Trophy className="ml-2 h-5 w-5" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
