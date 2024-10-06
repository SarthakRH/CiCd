FROM node:14.21.3-alpine

WORKDIR /app
COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
COPY ./.env .env
COPY ./start.sh start.sh
COPY ./backend backend/
COPY ./frontend frontend/
COPY ./screenshots screenshots/
RUN npm install && \
    npm install jest && \
    cd frontend && \
    npm install && \
    cd .. && \
    chmod +x start.sh
CMD ["/app/start.sh"]
