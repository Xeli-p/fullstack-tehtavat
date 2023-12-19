describe('Blog app',  function() {

  beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'mluukkai', password: 'salainen', name: 'Matti Luukkainen'
      })
      cy.visit('http://localhost:5173/')
  })

  it('login form is shown', function() {
    cy.contains('login')
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('salainen')

    cy.contains('login')
  })

  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen')
  
      cy.contains('login').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      //cy.contains('logout').click()
      cy.get('#username').type('mluukkaiasd');
      cy.get('#password').type('salainenads')
  
      cy.contains('login').click()
      cy.get('.error-red').should('contain', 'wrong credentials') 
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'mluukkai', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#authorinput').type('Johannes Koski')
      cy.get('#titleinput').type('Taru Herkon Lordista')
      cy.get('#urlinput').type('www.fsgf.fi/')
      cy.contains('save').click()
      cy.contains('Taru Herkon Lordista')
    })

  })

  describe('Post can be liked', function() {

    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'mluukkai', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        const token = JSON.parse(localStorage.getItem('loggedBlogappUser')).token;
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            title: 'Taru Herkon Lordista', 
            author: 'Johannes Koski',
            url: 'www.fsgf.fi/'
          }
      })
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'pirkkis69', password: 'salasana', name: 'Pirkko Hietanen'
      })
      cy.visit('http://localhost:5173')
      })

  })
    it('A blog can be liked', function() {
      
      cy.contains('Taru Herkon Lordista')

      cy.contains('show details').click()
      cy.contains('likes')
      cy.contains('like').click()
    })

    it('A blog can be deleted', function() {
      
         cy.contains('Taru Herkon Lordista')
         cy.contains('show details').click()
         cy.contains('likes')
         cy.contains('delete blog').click()
         cy.should('not.contain', 'Taru Herkon Lordista')
       })

  })

  describe('Post can be deleted only by the user who posted it', function() {

    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'mluukkai', password: 'salainen'
    }).then(response => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      const token = JSON.parse(localStorage.getItem('loggedBlogappUser')).token;
      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          title: 'Taru Herkon Lordista', 
          author: 'Johannes Koski',
          url: 'www.fsgf.fi/'
        }
      })
      cy.visit('http://localhost:5173')
      })
    }) 

    it('A blog cant be deleted by unauthorized user', function() { 

      cy.contains('logout').click()
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'pirkkis69', password: 'salasana', name: 'Pirkko Hietanen'
      })
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'pirkkis69', password: 'salasana'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        const token = JSON.parse(localStorage.getItem('loggedBlogappUser')).token;
        cy.visit('http://localhost:5173')
      })
      cy.contains('show details').click()
      cy.should('not.contain', 'delete blog')
    })
  })

  describe('Blogs are ordered by their likes', function() { 
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'mluukkai', password: 'salainen'
    }).then(response => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      const token = JSON.parse(localStorage.getItem('loggedBlogappUser')).token;
      
      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          title: 'Title with most likes', 
          author: 'Kohannes Joski',
          url: 'www.asdfsadsf.org/',
          likes: 20
        }
      })
      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          title: 'Title with third most likes', 
          author: 'Johannes Koski',
          url: 'www.fsgf.fi/',
          likes: 5
        }
      })
      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          title: 'Title with least likes', 
          author: 'Johannes Koski',
          url: 'www.fsgf.fi/',
          likes: 2
        }
      })
      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          title: 'Title with second most likes', 
          author: 'Johannes Koski',
          url: 'www.fsgf.fi/',
          likes: 10
        }
      })
      cy.visit('http://localhost:5173')
      })
    })

    it('Blogs are ordered by their likes descending', function() { 

      cy.get('.blog').first().contains('Title with most likes');
      cy.get('.blog').last().contains('Title with least likes');

    })
  })
})