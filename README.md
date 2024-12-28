# OurWorld v0.0.1
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

A discord bot for the documentation of collaborative roleplays created by two Queer gamers who found themselves in fictional characters. Inspired by the Queer Worlds panel at QGCon 2023 and submitted as an entry.

Designed by Amp and programmed by Avengineering.

## Features
- Type /exportchannelmessages to get a .txt file of an entire Discord channel.

## Bot Creation
### From source

<details>
<summary>From source</summary>

1. If you do not have a Discord bot Application set up on the Discord Developer Portal, check out [this guide from Discord.js to set it up on your account.](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
2. Make sure you have [Node.js](https://nodejs.org/en) installed.
3. Clone the repository using the Github desktop interface or the command line:
```bash
cd FolderToMyOurWorld
git clone https://github.com/AvengineeringCreates/OurWorld.git
```
3. In the root of the local repository, create a new file called `.env`. This will contain your bot's token as well as other sensitive information.
4. In `.env` write:
```
BOT_TOKEN="yourbottoken"
CLIENT_ID="yourbotsclientid"
MAINTAINER_DISCORD="@yourdiscordusername"
```
- `BOT_TOKEN` is your Discord bot's login token. Do NOT share this! It is found on the Discord Developer Portal under YourApp > Bot > Token.
- `CLIENT_ID` is your Discord bot's client ID. It is found on the Discord Developer Portal under YourApp > General Information > Application Id.
- `MAINTAINER_DISCORD` is your Discord @username. It only is shown to users as contact information if there is an error. There are plans to change this to a move private route in the future.
5. Run `npm install` to install all dependencies.
6. Invite your bot to your server and provide the desired permissions. Read Messages, Write Messages, View Message History and Attach Files are required for any channel you want OurWorld to be able to process. It's simpler to just provide the Administrator permission, but more secure to provide the permissions individually or on a channel-by-channel basis.
7. Use `npm deploy-commands` to set slash commands on all joined servers.
8. Use `npm start` to start the server.
9. Run and enjoy!

</details>

### Using Docker Compose

<details>
<summary>Using Docker Compose</summary>

1. If you do not have a Discord bot Application set up on the Discord Developer Portal, check out [this guide from Discord.js to set it up on your account.](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
2. Make sure Docker Engine is installed.
3. Create a new directory for your Docker files. In this example we'll call it `MyOurWorld`.
```bash
mkdir MyOurworld
cd MyOurWorld
```
3. Download [Dockerfile](Dockerfile) and [compose.yml](compose.yml) from the repository via direct download or copy the contents into your own files of the same name. Place them in `MyOurWorld`.
4. In `MyOurWorld` create a new file `.env`.
```bash
sudo nano .env
```
5. In `.env` write:
```
BOT_TOKEN="yourbottoken"
CLIENT_ID="yourbotsclientid"
MAINTAINER_DISCORD="@yourdiscordusername"
```
- `BOT_TOKEN` is your Discord bot's login token. Do NOT share this! It is found on the Discord Developer Portal under YourApp > Bot > Token.
- `CLIENT_ID` is your Discord bot's client ID. It is found on the Discord Developer Portal under YourApp > General Information > Application Id.
- `MAINTAINER_DISCORD` is your Discord @username. It only is shown to users as contact information if there is an error. There are plans to change this to a move private route in the future.
6. Run `docker compose up -d` to spin up and start your OurWorld container. Enjoy!

</details>

## License
This project is licensed under the NON-AI-MIT License. See the [LICENSE](LICENSE) file for details. Thank you to the maintainers of [non-ai-licenses/non-ai-licenses](https://github.com/non-ai-licenses/non-ai-licenses/tree/main) for providing the license.

### Why non-AI?
AI is an incredible tool for education. In fact, it was used extensively to assist in building OurWorld, but many publicly available AI utilities are unfairly trained on licensed code. It is our belief that licensing should be respected when code is scraped for AI training. We are not against AI, or even necessarily the use of our code in training AI, but the widespread infringement of ownership created by reckless data scraping.

## Acknowledgements
Thank you to the hosts of [QGCon 2023](https://itch.io/jam/qgjam-2023) who inspired us with their opening symposium to create OurWorld!