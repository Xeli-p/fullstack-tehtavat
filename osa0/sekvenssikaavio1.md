sequenceDiagram
	participant browser
	participant server
	
	browser->>server POST https://studies.cs.helsinki.fi/exampleapp/new_note
	activate server
	server save note
	server->>browser: 302 found - note data
	deactivate server
	
	browser->>server GET https://studies.cs.helsinki.fi/exampleapp/notes
	activate server
	server->>browser: 200 - notes
	deactivate server
	
	browser->>server GET https://studies.cs.helsinki.fi/exampleapp/main.css
	activate server
	server->>browser: 200 - main.css
	deactivate server
	
	browser->>server GET https://studies.cs.helsinki.fi/exampleapp/main.js
	activate server
	server->>browser: 200 - main.js
	deactivate server
	
	browser->>server GET https://studies.cs.helsinki.fi/exampleapp/data.json
	activate server
	server->>browser: 200 - data.json
	deactivate server