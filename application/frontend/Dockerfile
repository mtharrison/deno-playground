FROM golang:1.13.5

WORKDIR /app

COPY api/go.mod api/go.sum ./
RUN go mod download

COPY ./api .
RUN go build -o main .

COPY ./ui/static ./static
EXPOSE 8090

CMD ["./main"]
