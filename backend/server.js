const app = require('.')

require('dotenv').config()
// Set the port number to 5000 or the port number in the .env file.
const PORT = process.env.PORT || 5000


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
