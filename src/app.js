import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import {createRoles} from './libs/initialSetup';

const app = express();

//Cuando la aplicación inicie, ejecutara la función createRoles
createRoles();

app.set('pkg', pkg);

app.use(morgan('dev'));

//Entender los datos en formato json
app.use(express.json());

app.get('/', (req, res) =>{
    res.json({
        author: app.get('pkg').author,
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    })
});

app.use('/api/products',productsRoutes);

app.use('/api/auths', authRoutes);

app.use('/api/users', userRoutes);
 
export default app;
