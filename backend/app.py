from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime
import anthropic

app = Flask(__name__)
CORS(app)

# Database setup
DATABASE = 'portfolio.db'

def init_db():
    """Initialize the database"""
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS stocks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            symbol TEXT NOT NULL,
            name TEXT NOT NULL,
            shares REAL NOT NULL,
            purchase_price REAL NOT NULL,
            current_price REAL NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def get_db_connection():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Initialize database on startup
init_db()

@app.route('/api/stocks', methods=['GET'])
def get_stocks():
    """Get all stocks"""
    conn = get_db_connection()
    stocks = conn.execute('SELECT * FROM stocks ORDER BY created_at DESC').fetchall()
    conn.close()
    return jsonify([dict(stock) for stock in stocks])

@app.route('/api/stocks', methods=['POST'])
def add_stock():
    """Add a new stock"""
    data = request.json
    
    if not all(k in data for k in ('symbol', 'name', 'shares', 'purchase_price')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO stocks (symbol, name, shares, purchase_price, current_price)
        VALUES (?, ?, ?, ?, ?)
    ''', (
        data['symbol'].upper(),
        data['name'],
        float(data['shares']),
        float(data['purchase_price']),
        float(data.get('current_price', data['purchase_price']))
    ))
    conn.commit()
    stock_id = cursor.lastrowid
    conn.close()
    
    return jsonify({'id': stock_id, 'message': 'Stock added successfully'}), 201

@app.route('/api/stocks/<int:stock_id>', methods=['DELETE'])
def delete_stock(stock_id):
    """Delete a stock"""
    conn = get_db_connection()
    conn.execute('DELETE FROM stocks WHERE id = ?', (stock_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Stock deleted successfully'})

@app.route('/api/stocks/<int:stock_id>', methods=['PUT'])
def update_stock(stock_id):
    """Update stock current price"""
    data = request.json
    conn = get_db_connection()
    conn.execute('''
        UPDATE stocks 
        SET current_price = ?
        WHERE id = ?
    ''', (float(data['current_price']), stock_id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Stock updated successfully'})

@app.route('/api/analyze', methods=['POST'])
def analyze_portfolio():
    """Get AI analysis of the portfolio using Claude"""
    
    # Get all stocks
    conn = get_db_connection()
    stocks = conn.execute('SELECT * FROM stocks').fetchall()
    conn.close()
    
    if not stocks:
        return jsonify({'insight': 'Add some stocks to your portfolio to get AI analysis.'}), 200
    
    # Calculate portfolio metrics
    total_value = sum(stock['shares'] * stock['current_price'] for stock in stocks)
    total_cost = sum(stock['shares'] * stock['purchase_price'] for stock in stocks)
    total_gain = total_value - total_cost
    gain_percent = (total_gain / total_cost * 100) if total_cost > 0 else 0
    
    # Prepare portfolio summary for Claude
    portfolio_summary = f"""
Portfolio Summary:
- Number of positions: {len(stocks)}
- Total portfolio value: ${total_value:,.2f}
- Total cost basis: ${total_cost:,.2f}
- Total gain/loss: ${total_gain:,.2f} ({gain_percent:+.2f}%)

Holdings:
"""
    for stock in stocks:
        stock_gain = (stock['current_price'] - stock['purchase_price']) * stock['shares']
        stock_gain_pct = ((stock['current_price'] - stock['purchase_price']) / stock['purchase_price'] * 100) if stock['purchase_price'] > 0 else 0
        portfolio_summary += f"\n- {stock['symbol']} ({stock['name']}): {stock['shares']} shares at ${stock['current_price']:.2f} (purchased at ${stock['purchase_price']:.2f}), gain/loss: ${stock_gain:+.2f} ({stock_gain_pct:+.2f}%)"
    
    # Call Claude API for analysis
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    
    if not api_key:
        # Return basic analysis if no API key
        if gain_percent > 10:
            insight = f"💚 Strong Performance! Your portfolio is up {gain_percent:.2f}% with a total value of ${total_value:,.2f}. Consider taking some profits or rebalancing."
        elif gain_percent > 0:
            insight = f"📈 Positive Growth: Your portfolio shows {gain_percent:.2f}% gains totaling ${total_gain:,.2f}. Continue monitoring and stay disciplined."
        elif gain_percent > -10:
            insight = f"⚠️ Minor Decline: Portfolio is down {gain_percent:.2f}%. Review your holdings but avoid panic selling. Focus on long-term strategy."
        else:
            insight = f"🔴 Significant Loss: Portfolio down {gain_percent:.2f}%. Time to review your strategy. Consider: Are these quality companies? Is this a good entry point? Should you cut losses?"
        
        if len(stocks) < 3:
            insight += " Your portfolio could benefit from more diversification - consider adding more positions."
        
        return jsonify({'insight': insight})
    
    try:
        client = anthropic.Anthropic(api_key=api_key)
        
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            messages=[{
                "role": "user",
                "content": f"""You are a professional financial advisor. Analyze this stock portfolio and provide actionable insights. Be specific, honest, and helpful. Keep it concise (2-3 sentences).

{portfolio_summary}

Provide:
1. Overall assessment (performance, risk level)
2. Specific actionable recommendation
3. One thing to watch out for"""
            }]
        )
        
        ai_insight = message.content[0].text
        return jsonify({'insight': ai_insight})
        
    except Exception as e:
        print(f"Claude API Error: {str(e)}")
        # Fallback to basic analysis
        if gain_percent > 5:
            insight = f"Strong performance! Portfolio up {gain_percent:.2f}% (${total_gain:+,.2f}). Consider taking some profits."
        elif gain_percent < -5:
            insight = f"Portfolio underperforming: down {gain_percent:.2f}%. Review holdings and consider rebalancing."
        else:
            insight = f"Portfolio stable at {gain_percent:+.2f}%. Continue monitoring."
        
        return jsonify({'insight': insight})

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
