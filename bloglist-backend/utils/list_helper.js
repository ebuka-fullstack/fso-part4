const dummy = (blogs) => 1

const totalLikes = (blogs) =>
  blogs.reduce((sum, b) => sum + b.likes, 0)

const favoriteBlog = (blogs) =>
  blogs.reduce((max, b) => b.likes > max.likes ? b : max)

const mostBlogs = (blogs) => {
  const counts = blogs.reduce((acc, { author }) => {
    acc[author] = (acc[author] || 0) + 1
    return acc
  }, {})
  const top = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)
  return { author: top, blogs: counts[top] }
}

const mostLikes = (blogs) => {
  const counts = blogs.reduce((acc, { author, likes }) => {
    acc[author] = (acc[author] || 0) + likes
    return acc
  }, {})
  const top = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)
  return { author: top, likes: counts[top] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }