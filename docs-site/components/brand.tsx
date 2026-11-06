export function Brand() {
  return (
    <span className="jing-brand">
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path
          d="M6 5h6v13a7 7 0 0 1-7 7v-6a1 1 0 0 0 1-1V5Z"
          fill="currentColor"
        />
        <path
          d="M16 5h6v6h-6zM16 15h6v10h-6z"
          fill="currentColor"
          opacity=".45"
        />
      </svg>
      <span>
        jing<span className="jing-brand-divider">/</span>ui
      </span>
    </span>
  )
}
