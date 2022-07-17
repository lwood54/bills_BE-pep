#README

## Steps to get running

### 1. Install dependencies

```
npm i
```

### 2. Add env variables

- Create .env file

```
PORT="<add_your_port>"
DATABASE_URL="<postgresql://postgres:<**pasword**>@<remaining_url>"
```

### 3. Generate database tables

```
npx prisma migrate dev
```

### 4. Run server

```
npm run dev
```

### 5. Initialize Git

```
git init
```
