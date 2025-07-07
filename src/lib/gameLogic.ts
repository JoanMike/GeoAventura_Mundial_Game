import type { Country } from './countries'

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export interface GameQuestion {
  countryToGuess: Country
  options: string[] // Country names in Spanish
  flagUrl: string
}

export function generateGameQuestions(
  allCountries: Country[],
  numQuestions: number,
): GameQuestion[] {
  const shuffledCountries = shuffleArray(allCountries)
  const selectedCountries =
    numQuestions >= allCountries.length
      ? shuffledCountries
      : shuffledCountries.slice(0, numQuestions)

  return selectedCountries.map((correctCountry) => {
    const incorrectOptions = shuffleArray(
      allCountries.filter((c) => c.code !== correctCountry.code),
    )
      .slice(0, 3)
      .map((c) => c.name_es)

    const options = shuffleArray([correctCountry.name_es, ...incorrectOptions])

    return {
      countryToGuess: correctCountry,
      options,
      flagUrl: `https://flagpedia.net/data/flags/w580/${correctCountry.code.toLowerCase()}.png`,
    }
  })
}
