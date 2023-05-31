FROM node:18.16.0
WORKDIR /src
RUN yarn install
RUN npm install --global prisma
COPY . .
RUN npx prisma generate

