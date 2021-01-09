FROM mobapi/nodemon:14 as basic

COPY ./ /root/app
WORKDIR /root/app

RUN npm i
# COPY pkg/node_modules /root/app/node_modules
# COPY pkg/package-lock.json /root/app/package-lock.json

RUN npm run build

CMD ["nodemon", "dist/src/main"]
