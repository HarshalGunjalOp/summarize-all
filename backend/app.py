import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
from dotenv import load_dotenv
from bs4 import BeautifulSoup
import openai

# Load environment variables
load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')

if not api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables.")

# Set up OpenAI API
openai.api_key = api_key

# Initialize Flask app
# Update static_folder to 'dist' as Vite's default build directory
app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')

# Configure CORS
# During development, frontend runs on localhost:5173 (Vite's default port)
CORS(app, resources={r"/summarize": {"origins": "*"}})

# Configure headers for web scraping
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
}

class Website:
    def __init__(self, url):
        self.url = url
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.content, 'html.parser')
        self.title = soup.title.string if soup.title else "No title found"
        if soup.body:
            for irrelevant in soup.body(["script", "style", "img", "input"]):
                irrelevant.decompose()
            self.text = soup.body.get_text(separator="\n", strip=True)
        else:
            self.text = "No content available."

system_prompt = "You are an assistant that analyzes the contents of a website and provides a short summary, ignoring text that might be navigation related. Respond in markdown."

def user_prompt_for(website, length, summary_style):
    user_prompt = f"You are looking at a website titled {website.title}\n"
    user_prompt += "The contents of this website are as follows; please provide a summary based on the following options:\n"
    user_prompt += f"Summary Length: {length}\nSummary Style: {summary_style}\n\n"
    user_prompt += website.text
    return user_prompt

def user_prompt_for_text(text, length, summary_style):
    user_prompt = "The following is a block of text; please provide a summary based on the following options:\n"
    user_prompt += f"Summary Length: {length}\nSummary Style: {summary_style}\n\n"
    user_prompt += text
    return user_prompt

def messages_for(website, text, length, summary_style):
    if website:
        return [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt_for(website, length, summary_style)}
        ]
    return [
        {"role": "system", "content": "You are an assistant that summarizes user-provided text."},
        {"role": "user", "content": user_prompt_for_text(text, length, summary_style)}
    ]

def summarize(url=None, text=None, length=3, summary_style="single_paragraph"):
    website = Website(url) if url else None
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages_for(website, text, length, summary_style)
    )
    return response.choices[0].message.content

@app.route('/summarize', methods=['POST'])
def summarize_website():
    data = request.get_json()
    url = data.get('url')
    text = data.get('text')
    length = data.get('length', 3)
    summary_style = data.get('summary_style', "single_paragraph")

    if not url and not text:
        return jsonify({"error": "Either URL or text is required!"}), 400

    try:
        summary = summarize(url, text, length, summary_style)
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Serve React Frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    # Use host='0.0.0.0' to make the server externally visible if needed
    app.run(host='0.0.0.0', port=5000)
