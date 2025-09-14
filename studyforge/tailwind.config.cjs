/**** StudyForge Tailwind Config ****/
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,css}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        surface: 'var(--color-surface)',
        bg: 'var(--color-bg)',
        muted: 'var(--color-muted)'
      },
      backgroundImage: {
        'warm-gradient': 'var(--gradient-warm)'
      },
      boxShadow: {
        'soft-warm': '0 6px 18px rgba(5,150,105,0.08), 0 2px 6px rgba(217,119,6,0.04)'
      },
      borderColor: {
        border: 'var(--color-border)'
      },
      fontFamily: {
        sans: ['Cairo', 'Inter', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        xl: '12px'
      }
    }
  },
  plugins: []
}
