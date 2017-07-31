from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def root_toot():
    return render_template('game.html')


def main():
    app.run(debug=True)

if __name__ == "__main__":
    main()
