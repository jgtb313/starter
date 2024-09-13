import path from 'path'

export default {
  resolve: {
    alias: {
      '@/common': path.resolve(__dirname, './src/@common'),
      '@': path.resolve(__dirname, 'src')
    }
  }
}
