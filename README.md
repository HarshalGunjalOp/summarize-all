# Summarize All

## Description
Summarize All is a full-stack web application that allows users to summarize content from a website or raw text. It uses Flask as the backend to process requests and a React-based frontend built with Tailwind CSS and shadcn UI components for an intuitive user interface.

## Features
- Input a website URL or plain text to summarize.
- Choose the summary length and style (e.g., single paragraph, bullet points).
- Real-time summarization using OpenAI's API.

## Technologies Used
### Frontend
- **React**: For building the user interface.
- **Vite**: For fast development and build processes.
- **shadcn UI**: For accessible and beautiful components.
- **Tailwind CSS**: For styling.

### Backend
- **Flask**: As the backend framework.
- **Uvicorn**: For running the backend with ASGI compatibility.
- **OpenAI API**: For generating summaries.
- **BeautifulSoup**: For web scraping and extracting website content.

### Other Tools
- **Node.js**: For managing frontend dependencies.
- **Conda**: For managing backend dependencies.

---

## Installation
### Prerequisites
- Node.js (for the frontend)
- Python 3.10+ (for the backend)
- Conda (recommended for environment management)

### Clone the Repository
```bash
# Clone the repository
git clone https://github.com/HarshalGunjalOp/summarize-all/
cd summarize-all
```

---

## Setup Instructions

### Backend Setup
1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate the Conda environment**:
   ```bash
   conda env create -f environment.yml
   conda activate website-summarizer-backend
   ```

3. **Install additional dependencies** (if necessary):
   ```bash
   pip install -r requirements.txt
   ```

4. **Add your OpenAI API Key**:
   - Create a `.env` file in the `backend` directory and add:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

5. **Run the backend**:
   ```bash
   uvicorn asgi:app --host 127.0.0.1 --port 5000 --reload
   ```

   The backend should now be running at `http://127.0.0.1:5000`.

### Frontend Setup
1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Run the frontend**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and go to `http://localhost:5173`.

---

## Deployment
### Build the Frontend
To prepare the frontend for production:
```bash
cd frontend
npm run build
```
This will generate the production-ready files in the `frontend/dist` directory.

### Serve the Frontend with Flask
1. Ensure the `static_folder` in your Flask app points to the `dist` folder:
   ```python
   app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')
   ```

2. Run the Flask app in production mode:
   ```bash
   uvicorn asgi:app --host 0.0.0.0 --port 5000
   ```

---

## File Structure
```
summarize-all/
├── LICENSE
├── README.md
├── backend
│   ├── app.py          # Flask backend
│   ├── asgi.py         # ASGI entry point
│   ├── environment.yml # Conda environment file
│   ├── .env            # Environment variables
│   └── requirements.txt
├── frontend
│   ├── README.md
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── Header.tsx
│   │   │   ├── SummaryForm.tsx
│   │   │   ├── SummaryDisplay.tsx
│   │   │   └── ui
│   │   ├── index.css
│   │   ├── lib
│   │   │   └── utils.ts
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
```

---

## Usage
1. Open the application in your browser (`http://localhost:5173`).
2. Enter a website URL or plain text.
3. Select the summary length and style.
4. Click "Summarize" to get the summary.

---

## Troubleshooting
### Common Issues
1. **Frontend cannot connect to backend:**
   - Ensure the backend is running at `http://127.0.0.1:5000`.
   - Verify your Vite proxy settings in `vite.config.ts`:
     ```typescript
     server: {
       proxy: {
         '/summarize': {
           target: 'http://127.0.0.1:5000',
           changeOrigin: true,
           secure: false,
         },
       },
     },
     ```

2. **Backend not starting:**
   - Ensure all dependencies are installed.
   - Check for port conflicts.

3. **OpenAI API errors:**
   - Verify your API key in the `.env` file.
   - Ensure you have sufficient credits in your OpenAI account.

---

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Acknowledgements
- [OpenAI API](https://openai.com/api/) for powering the summaries.
- [Vite](https://vitejs.dev/) for a blazing-fast frontend build tool.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- [shadcn UI](https://ui.shadcn.com/) for beautiful and accessible components.


