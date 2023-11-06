sequenceDiagram
	participant browser
	participant server
	
	browser->>server GET https://studies.cs.helsinki.fi/exampleapp/spa
	activate server
	server->>browser: 200 OK - spa
	deactivate server
	
	browser->>server GET https://studies.cs.helsinki.fi/exampleapp/main.css
	activate server
	server->>browser: 200 OK - main.css
	deactivate server
	
	browser->>server GET https://studies.cs.helsinki.fi/exampleapp/spa.js
	activate server
	server->>browser: 200 OK - spa.js
	deactivate server
	
	browser->>server GET https://studies.cs.helsinki.fi/exampleapp/data.json
	activate server
	server->>browser: 200 OK - data.json
	deactivate server