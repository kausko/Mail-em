# Mail-em
A simple web app to perform fast and hassle-free mail-merge with personalized image support.

## Usage
### 1. Upload recepient information
   
Upload a spreadsheet containing the recepient information that you intend to use in the email content. All the column headers in the spreadsheet can be used as variables in the email's `subject`, `content` and `SVG attachments`. Example:

| to/cc/bcc           | name     | score |
| ------------------- | -------- | ----- |
| a@b.in              | Catalina | 81    |
| b@c.in,c@d.in       | Camron   | 39    |
| devonte@mail-em.com | Devonte  | 80    |
| *required*          |

### 2. Upload email content
Upload a text or html file containing the message that you intend to send in the email body. Example:

```txt
Hello {{name}},
  You have received a score of {{score}} in the CS 101 Finals Examination.
```

### 3. Upload attachments
All constraints and limits setup by Gmail are applicable. SVG files can be used as templates by adding variables in the code.

PRO TIP: Presentation programs like PowerPoint, Slides, Keynote, etc. support exporting slides as SVG files.

Example:
```svg
<svg xmlns="http:Hwww.w3.org/2000/svg" version="1.1" width="200" height="120">      
  <rect width="200" height="120" fill="black"/> 
  <text x="60" y="60" fill="white"> 
    {{ name }} 
  </text>
</svg> 
```

## Local Setup
1. Run `npm i` or `yarn` in the cloned directory
2. Create a `.env` file and assign a Prisma-compliant database url to the variable `DATABASE_URL`
3. Create a `.env.local` file and add the following environment variables
   ```
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   NEXTAUTH_URL=
   SECRET=
   DATABASE_URL=
   ```
4. Run `npx prisma generate` to generate schema definitions in ts. (Optional)
5. Run `yarn dev` to start the `dev server` on `localhost`

## Technologies used

![image](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next-dot-js&logoColor=white)
![image](https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)
![image](https://img.shields.io/badge/Primsa-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![image](https://img.shields.io/badge/Google_APIs-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![image](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)