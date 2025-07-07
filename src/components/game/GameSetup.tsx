'use client'

import type * as React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { PlayCircle } from 'lucide-react'

interface GameSetupProps {
  onStartGame: (numCountries: number) => void
  maxCountries: number // Total available countries from ALL_COUNTRIES.length
}

const MIN_COUNTRIES_TO_PLAY = 5
const DEFAULT_QUESTIONS = 10 // Default number of questions suggestion

export function GameSetup({
  onStartGame,
  maxCountries,
}: GameSetupProps): JSX.Element {
  const getValidInitialCount = () => {
    if (maxCountries < MIN_COUNTRIES_TO_PLAY) {
      // If not enough countries overall, suggest playing with all available if > 0
      return Math.max(1, maxCountries)
    }
    // Default to 10, but ensure it's within [MIN_COUNTRIES_TO_PLAY, maxCountries]
    return Math.max(
      MIN_COUNTRIES_TO_PLAY,
      Math.min(DEFAULT_QUESTIONS, maxCountries),
    )
  }

  const [numQuestionsToAsk, setNumQuestionsToAsk] = useState<number>(
    getValidInitialCount(),
  )

  // Determine if the game can be played based on available countries
  const canPlay = maxCountries >= MIN_COUNTRIES_TO_PLAY

  // Effect to update numQuestionsToAsk if maxCountries changes
  useEffect(() => {
    setNumQuestionsToAsk((prevNumQuestions) => {
      if (maxCountries < MIN_COUNTRIES_TO_PLAY) {
        return Math.max(1, maxCountries) // Fallback if maxCountries becomes very low
      }
      // Ensure current selection is valid, clamp if necessary
      return Math.max(
        MIN_COUNTRIES_TO_PLAY,
        Math.min(prevNumQuestions, maxCountries),
      )
    })
  }, [maxCountries])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canPlay) {
      onStartGame(numQuestionsToAsk)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-card/60 dark:bg-card/20 backdrop-blur-lg border border-border/30 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          ¡Bienvenid@ a GeoAventura!
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Prepárate para un viaje divertido aprendiendo banderas y países.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <Label
                htmlFor="numCountriesSlider"
                className="text-md font-semibold"
              >
                Número de países para la partida:
              </Label>
              <span className="text-lg font-bold text-primary">
                {numQuestionsToAsk}
              </span>
            </div>
            <Slider
              id="numCountriesSlider"
              value={[numQuestionsToAsk]}
              onValueChange={(value) => setNumQuestionsToAsk(value[0])}
              min={MIN_COUNTRIES_TO_PLAY}
              max={maxCountries} // Slider's max is total available countries
              step={1}
              disabled={!canPlay} // Disable slider if not enough countries
              className="my-4"
              aria-label={`Seleccionar número de países, mínimo ${MIN_COUNTRIES_TO_PLAY}, máximo ${maxCountries}`}
            />
            {!canPlay ? (
              <p className="text-sm text-destructive text-center">
                No hay suficientes países disponibles ({maxCountries}) para
                iniciar el juego. Se requieren al menos {MIN_COUNTRIES_TO_PLAY}.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Desliza para elegir entre {MIN_COUNTRIES_TO_PLAY} y{' '}
                {maxCountries} países.
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
            disabled={!canPlay} // Disable button if not enough countries
          >
            <PlayCircle className="mr-2 h-6 w-6" />
            Empezar Juego
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
