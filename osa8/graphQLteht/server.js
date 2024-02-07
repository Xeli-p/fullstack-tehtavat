const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')

mongoose.set('strictQuery', false)

const { v1: uuid } = require('uuid')


require('dotenv').config()


const typeDefs = `

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    addAuthor(
      name: String!
      born: Int
    ): Author
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
`


const MONGODB_URI = config.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

      if (!args.author && !args.genre) {
        return Book.find({})        
      } 
    /*  const byGenre = (book) =>
        book.genres.includes(args.genre)
      const byAuthor = (book) =>
        args.author === book.author

      if (!args.author && !args.genre) {
        return books
      } 
      
      if (args.author && args.genre) {
        return books.filter(byAuthor, byGenre)
      } 

      if (args.genre) {
      return books.filter(byGenre)
      }

      if (args.author) {
      return books.filter(byAuthor)
      }
      */
      if (args.genre) {
        return Book.find({
          genres: args.genre 
         })
        }
  

    },
    allAuthors: async(root, args) => {
      return Author.find({})
    }
  },
  Author: {
    name: (root) => root.name,
    bookCount: async (root) => Book.countDocuments({author: root.id}) //books.filter((book) => book.author === root.name).length
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: async (root) => {
      if (!root.author) {
        return null; // or handle this case accordingly
      }
  
      try {
        const author = await Author.findById(root.author);
        return author;
      } catch (error) {
        console.error(`Error fetching author for book ${root.title}:`, error);
        return null; // or handle this case accordingly
      }
    },
    genres: (root) => root.genres
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser
  
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      if (!author) {
        author = new Author({ name: args.author, bookCount: 1 })
        await author.save();
      } else {
        author.bookCount += 1;
        await author.save();
      }
  
      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      const updatedBook = await Book.findById(book._id).populate('author')
      return updatedBook
      
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      author.born = args.setBornTo
      await author.save()
     // const author = authors.find(p => p.name === args.name)
      

    /*  if (!author) {
        return null
      }
      */
     /* if (args.setBornTo) {
        const updatedAuthor = { ...author, born: args.setBornTo }
        authors = authors.map(p => p.name === args.name ? updatedAuthor : p)
        return updatedAuthor
      }
      */
      return author
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return author
    }

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})