# Stage 0, "builder", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 AS builder
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/

# for deployment change to actual BE URL
# ARG REACT_APP_BACKEND=http://localhost:8080
ARG REACT_APP_BACKEND=https://covid-tracker-v2-be.herokuapp.com
# set the environment variable to be BE URL and build to production
RUN REACT_APP_BACKEND=$REACT_APP_BACKEND npm run build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=builder /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE $PORT
ENTRYPOINT ["nginx","-g","daemon off;"]

# build docker and run
# docker build -t covid-fe .
# docker run -dp 3000:80 covid-fe
