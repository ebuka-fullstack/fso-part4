const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  { title: 'Blog A', author: 'Alice', likes: 5 },
  { title: 'Blog B', author: 'Bob', likes: 12 },
  { title: 'Blog C', author: 'Alice', likes: 3 },
  { title: 'Blog D', author: 'Bob', likes: 7 },
  { title: 'Blog E', author: 'Bob', likes: 2 },
]

// 4.3
test('dummy returns one', () => {
  const result = listHelper.dummy([])
  assert.strictEqual(result, 1)
})

// 4.4
describe('total likes', () => {
  test('of an empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('of a list with multiple blogs', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 29)
  })
})

// 4.5
describe('favorite blog', () => {
  test('blog with most likes', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), {
      title: 'Blog B',
      author: 'Bob',
      likes: 12
    })
  })
})

// 4.6
describe('most blogs', () => {
  test('author with most blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: 'Bob',
      blogs: 3
    })
  })
})

// 4.7
describe('most likes', () => {
  test('author with most total likes', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      author: 'Bob',
      likes: 21
    })
  })
})


