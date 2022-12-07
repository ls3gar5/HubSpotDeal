import app from './app';
import dotenv from 'dotenv';
import '@babel/polyfill';

//if (process.env.NODE_ENV === 'development') {
dotenv.config();

//servicio de la nube process.env.port sino el por defecto el 4800
var port = process.env.PORT || 4000;

const main = async (): Promise<void> => {
  try {
    await app.listen(port);
    console.log('API escuchando en el puertos ' + port);
  } catch (e) {
    console.log(`[Users start server error]: ${(e as Error).message}`);
  }
};

main();
