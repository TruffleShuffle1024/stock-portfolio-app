# 📈 Curtis's Smart Stock Portfolio Manager

A modern, AI-powered stock portfolio management application built with React and Flask. Track your investments, get real-time insights, and receive AI-driven portfolio analysis powered by Anthropic's Claude.

![Portfolio Manager](https://via.placeholder.com/800x400/0f172a/10b981?text=Stock+Portfolio+Manager)

## ✨ Features

- **📊 Real-time Portfolio Tracking** - Monitor all your stock holdings in one place
- **🤖 AI-Powered Analysis** - Get intelligent insights and recommendations from Claude AI
- **💰 Automatic Calculations** - Track gains/losses, portfolio value, and performance metrics
- **🎨 Beautiful Modern UI** - Dark mode interface with smooth animations
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **💾 Persistent Storage** - All data saved in SQLite database

## 🚀 Live Demo

**Frontend:** [https://your-portfolio.vercel.app](https://your-portfolio.vercel.app) *(Deploy to get this link)*  
**Backend API:** [https://your-api.railway.app](https://your-api.railway.app) *(Deploy to get this link)*

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite/React Scripts** - Fast build tool

### Backend
- **Python Flask** - Lightweight web framework
- **SQLite** - Embedded database
- **Anthropic Claude API** - AI-powered analysis
- **Flask-CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Python 3.9+
- Anthropic API key ([Get one here](https://console.anthropic.com))

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
cp .env.example .env
```

5. Add your Anthropic API key to `.env`:
```
ANTHROPIC_API_KEY=your_actual_api_key_here
```

6. Run the backend:
```bash
python app.py
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 🌐 Deployment

### Deploy Backend to Railway

1. Sign up at [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `/backend`
5. Add environment variable: `ANTHROPIC_API_KEY`
6. Railway will auto-deploy!

**Get your API URL from Railway dashboard**

### Deploy Frontend to Vercel

1. Sign up at [Vercel.com](https://vercel.com)
2. Click "New Project" → Import your GitHub repo
3. Set root directory to `/frontend`
4. Set build command: `npm run build`
5. Set output directory: `build`
6. Click "Deploy"!

**Update the API URL in frontend/src/App.jsx:**
```javascript
const API_URL = 'https://your-railway-app.railway.app';
```

## 💡 Usage

### Adding Stocks
1. Click "Add Stock" button
2. Enter stock symbol (e.g., AAPL)
3. Enter company name
4. Enter number of shares
5. Enter purchase price
6. Click "Add to Portfolio"

### Getting AI Analysis
1. Click "Get Analysis" in the AI Insights card
2. Wait for Claude to analyze your portfolio
3. Read personalized recommendations

### Managing Portfolio
- View real-time portfolio value
- Track total gains/losses
- See individual stock performance
- Delete stocks with trash icon

## 📸 Screenshots

### Dashboard View
![Dashboard](https://via.placeholder.com/800x400/0f172a/10b981?text=Dashboard+View)

### AI Analysis
![AI Insights](https://via.placeholder.com/800x400/0f172a/06b6d4?text=AI+Analysis)

## 🔑 Environment Variables

### Backend (.env)
```
ANTHROPIC_API_KEY=your_api_key
FLASK_ENV=production
PORT=5000
```

### Frontend
No environment variables needed for basic setup. For production, update API_URL in App.jsx.

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/stocks` | GET | Get all stocks |
| `/api/stocks` | POST | Add new stock |
| `/api/stocks/<id>` | PUT | Update stock price |
| `/api/stocks/<id>` | DELETE | Delete stock |
| `/api/analyze` | POST | Get AI portfolio analysis |
| `/health` | GET | Health check |

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Curtis Fawcett**
- Email: fawcett.curtis@gmail.com
- GitHub: [@TruffleShuffle1024](https://github.com/TruffleShuffle1024)
- Fiverr: [My Profile](https://www.fiverr.com/s/WEpE3D5)

## 🙏 Acknowledgments

- Built with ❤️ using React and Flask
- AI powered by Anthropic's Claude
- Icons by Lucide
- Design inspiration from modern fintech apps

## 🚧 Roadmap

- [ ] Real-time stock price updates via API
- [ ] Historical price charts
- [ ] Multiple portfolio support
- [ ] Export to CSV/PDF
- [ ] Mobile app (React Native)
- [ ] Stock price alerts
- [ ] Portfolio comparison tools

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**
