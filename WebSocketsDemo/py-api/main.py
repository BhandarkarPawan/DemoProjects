from flask import Flask
from flask_socketio import SocketIO, send


app = Flask(__name__)
app.config["SECRET_KEY"] = "mysecret"
socketio = SocketIO(app, cors_allowed_origins="*")

app.debug = True
app.host = "localhost"


@socketio.on("message")
def handleMessage(msg):
    print(f"Client sent Message: {msg}")
    send(msg, broadcast=True)


@socketio.on("connect")
def handleConnect():
    print("New Connection")
    message = {"username": "Server", "message": "Welcome to the Server!"}
    send(message)


if __name__ == "__main__":
    socketio.run(app)
