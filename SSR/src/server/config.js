const config = {
    marvel_public: process.env.RAZZLE_MARVEL_PUBLIC,
    marvel_private: process.env.RAZZLE_MARVEL_PRIVATE,    
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/marvel-api',
    port: process.env.PORT || 3000
}
  
export default config;