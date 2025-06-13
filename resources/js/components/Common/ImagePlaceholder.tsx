interface ImagePlaceholderProps {
  type: 'article' | 'profile'
  className?: string
}

export default function ImagePlaceholder({ type, className = '' }: ImagePlaceholderProps) {
  if (type === 'article') {
    return (
      <div 
        className={`${className} bg-blue-500 flex items-center justify-center text-white font-medium`}
      >
        Article Image
      </div>
    )
  }

  return (
    <div 
      className={`${className} bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium`}
    >
      Profile
    </div>
  )
} 