interface Match {
  id: number
  homeTeam: string
  awayTeam: string
  score: string
  status: string
  minute?: number
}

interface LiveScoresProps {
  matches: Match[]
}

export default function LiveScores({ matches }: LiveScoresProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
      <h3 className="text-lg font-bold mb-4">Scores en direct</h3>
      <div className="space-y-3">
        {matches.map((match) => (
          <div key={match.id} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div className="text-sm">{`${match.homeTeam} vs ${match.awayTeam}`}</div>
              <div className="font-bold">{match.score}</div>
            </div>
            <div className="text-xs opacity-75 mt-1">
              {match.status === "live" ? `${match.minute}' - En cours` : match.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 