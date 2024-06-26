import express from 'express';
import cors from 'cors';
import { envConfig } from './shared/config/env'
import router from './routes'

const PORT = envConfig.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})
app.use('/api', router)


app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})
