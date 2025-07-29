# Scoreboard API Service - Flow Diagram

```mermaid
sequenceDiagram
    title Live Scoreboard Update Flow

    participant User
    participant WebBrowser as Web Browser
    participant AppServer as Application Server
    participant AuthService as Authentication Service
    participant GameService as Authorization and Game logic Service
    participant DB as Database
    participant Cache as Cache Layer
    participant WebSocket as WebSocket Service

    %% User performs action
    User->>WebBrowser: Perform action

    %% Web Browser initiates score update
    WebBrowser->>AppServer: API call to update score (with JWT access_token)
    activate WebBrowser

    %% App Server validates JWT
    AppServer->>AuthService: Validate JWT access_token

    alt JWT valid
        AuthService->>AppServer: Token valid

        AppServer->>GameService: Validate Authorization and Game logic

        alt Authorization and Game logic valid
            GameService->>AppServer: Action valid
            %% App Server updates user score
            AppServer->>DB: Update user score
            DB->>AppServer: Score updated

            AppServer-->>WebBrowser: Score update result

            loop every second
                alt there is score update since last time
                    AppServer->>DB: Get top 10 user
                    DB->>AppServer: Top 10 user updated

                    alt Scoreboard update needed
                        AppServer->>Cache: Update scoreboard cache
                        AppServer->>WebSocket: Broadcast new scoreboard
                        WebSocket-->>WebBrowser: Push updated scoreboard
                    end
                end
            end
        else Action invalid
            GameService->>AppServer: Authorization and Game logic invalid
            AppServer-->>WebBrowser: Action not authorized (score not updated)
        end
    else JWT invalid
        AuthService->>AppServer: Token invalid
        AppServer-->>WebBrowser: Invalid token (score not updated)
    end
    deactivate WebBrowser
```

## Key Flow Characteristics

### Performance Considerations
- **Caching**: Scoreboard cached in Redis
- **Database**: Optimized queries with proper indexes, like column score to get top 10 user efficiently
- **WebSocket**: Efficient broadcasting to connected clients
- **Rate Limiting**: Redis-based with sliding window

### Security Measures
- **Authentication**: JWT token verification on every request
- **Authorization**: User can only update their own scores and with valid action
- **Rate Limiting**: Prevents abuse and DoS attacks
- **Input Validation**: Sanitizes all inputs
- **Anomaly Detection**: Flags suspicious score patterns

### Scalability Features
- **Horizontal Scaling**: Stateless API design
- **Load Balancing**: Multiple API instances
- **Database Connection Pooling**: Efficient resource usage
- **Redis Pub/Sub**: Decoupled real-time updates

### Reliability Features
- **Database Transactions**: Ensures data consistency
- **Error Handling**: Comprehensive error responses
- **Logging**: Structured logging for debugging
- **Monitoring**: Real-time performance metrics 