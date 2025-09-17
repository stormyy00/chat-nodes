# Chat Nodes Server

A robust TypeScript Express server for the Chat Nodes application with AI integration.

## Features

- 🚀 **TypeScript** - Full type safety and modern development experience
- 🤖 **AI Integration** - Support for Gemini, OpenAI, and local models
- 💾 **Database** - PostgreSQL with Drizzle ORM
- 🔌 **WebSocket** - Real-time communication support
- 🛡️ **Error Handling** - Comprehensive error handling and logging
- 📊 **Health Checks** - Built-in health monitoring
- 🔧 **Middleware** - Request logging and CORS support

## Project Structure

```
server-new/
├── config/
│   └── database.ts          # Database configuration
├── db/
│   └── schema.ts            # Database schema definitions
├── middleware/
│   ├── errorHandler.ts      # Error handling middleware
│   └── requestLogger.ts     # Request logging middleware
├── routes/
│   ├── chat.ts              # Chat-related endpoints
│   └── models.ts            # AI model management endpoints
├── services/
│   ├── aiService.ts         # AI service integration
│   └── modelTests.ts        # Model testing utilities
├── index.ts                 # Main server file
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## API Endpoints

### Chat

- `GET /api/chat/conversations` - Get all conversations
- `POST /api/chat/conversations` - Create new conversation
- `PUT /api/chat/conversations/:id` - Update conversation
- `DELETE /api/chat/conversations/:id` - Delete conversation
- `GET /api/chat/conversations/:id/messages` - Get messages
- `POST /api/chat/conversations/:id/messages` - Send message
- `POST /api/chat/generate` - Generate AI response

### Models

- `GET /api/models` - Get all AI models
- `POST /api/models` - Create new model
- `PUT /api/models/:id` - Update model
- `DELETE /api/models/:id` - Delete model
- `POST /api/models/:id/test` - Test model connection

### Health

- `GET /health` - Health check endpoint

## Environment Variables

```env
DATABASE_URL=postgresql://username:password@host:port/database
GOOGLE_API_KEY=your_gemini_api_key
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## Production Deployment

1. Build the project: `npm run build`
2. Set environment variables
3. Start the server: `npm start`

The server will start on the port specified in the `PORT` environment variable (default: 3001).
