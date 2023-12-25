FROM node:19.5.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
#COPY . .
COPY public ./public
COPY src ./src
COPY tsconfig.json ./tsconfig.json
CMD ["/bin/sh"]
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]
