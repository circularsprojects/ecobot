# ecobot
https://circularsprojects.com\
simple economy bot for discord\
this isn't finished yet, check back later\
CURRENT VERSION: PRERELEASE v1.0
## how it works
the bot works with a local .JSON to store user data so it's basically like having a bunch of variables
## setup
1. run `npm install` in the working directory\
2. change botToken in variables.json to your token
3. change ownerID in variables.json to your id (not the bot id)
## commands (CLI)
`node index.js start` - Start ecobot\
`node index.js clear` - Clear all economy data\
## commands (DISCORD)
`e!balance` - View your balance\
`e!set [ID] [AMOUNT]` - Set someone's balance (can only be used by ID set in variables.json\
`e!work` - get money (work in progress)
## to-do
- finish all commands
- make file writing more efficient
  - save to file every minute or so
  - save in memory first
