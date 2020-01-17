export default {
  colors: {
    text: '#333',
    background: '#bab8a0',
    white: '#faf5e6',
    primary: '#bab8a0',
    secondary: '#f0edd5',
    accent: '#609',
    muted: '#f6f6f6f',
  },
  fonts: {
    body: 'Helvetica, sans-serif',
    heading: 'Helvetica, sans-serif',
    monospace: 'Menlo, monospace',
  },
  space: [ 0, 4, 6, 8, 10 ],
  fontSizes: [ 14, 16, 18, 20, 24 ],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  radii: {
    default: 4,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, .125)',
  },
  buttons: {
    primary: {
      // you can reference other values defined in the theme
      color: 'secondary',
      bg: 'primary',
    },
    secondary: {
      color: 'primary',
      bg: 'secondary',
    },
  },
  variants: {
    heading: {
      fontSize: 3,
      fontWeight: 'bold'
    },
    card: {
      p: 3,
      borderRadius: 'default',
      bg: 'white',
      boxShadow: 'card',
      padding: 4
    }
  },
}
