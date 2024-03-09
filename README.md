# Hotel Management Backend 🌟 Rest API | Nest Js 🦁 & Prisma  

This application is the Backend of Hotel Management

## Prerequisites 📋

Make sure you have the following programs installed before getting started:

- [Bun 🧄](https://bun.sh/) (version 1.0.3)
- [Docker 󰡨 ](https://www.docker.com/) (if using a containerized database)

Or

- [Node.js 🐦](https://nodejs.org/) (version 20.X.X)
- [npm  ](https://www.npmjs.com/) (version 10.X.X)

## Installation 🛠️

1. Clone the repository: 🧬

```bash
git clone https://github.com/pxnditxyr/hotel-management-back
```

2. Navigate to the project directory: 📂

```bash
cd hotel-management-back
```

3. Install dependencies:

```bash
bun i
```
4. 🚧 Fixing Bcrypt and Bun Incompatibility 🧩
Due to the incompatibility between bcrypt and bun, you should perform the following two commands in order to resolve this issue:

```bash
npm i bcrypt
```

followed by

```bash
rm package-lock.json
```

## Configuration ⚙️

### Environment Variables

1. Copy the example environment file to create you `.env` file: 🔑

```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration values.

### Database 🗄️

1. If you're using a containerized database, you can use Docker Compose to start it: 🐋

```bash
docker compose up -d
```

2. Then, run Prisma migrations: 🔄

```bash
bunx prisma db push
```

### Other considerations 📋

1. In your database, you must record the roles accepted by your system, and the name of each role must be written 📝 in the same way in the file: 
./src/auth/enums/valid-roles.enum.ts 📂

## Usage 🚀

Run the application in Development Mode: 🚀

```bash
bun start:dev
```

## Technologies Used 🛠️

- [NestJS 🦁](https://nestjs.com/)
- [Bun 🧄](https://babeljs.io/) 📜
- [Prisma  ](https://www.prisma.io/)

## License 📄

This project is under the MIT License. Check the [LICENSE](LICENSE) file for more details. 📜
