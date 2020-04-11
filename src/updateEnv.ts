import fs from 'fs';

const required: string[] = ['BOT_TOKEN', 'OMDB_TOKEN'];
const envFile: string = './bot.env';

const envIsNotSet = (k: string): boolean => (process.env[k] === undefined || process.env[k] === '');
const readEnvFile = (verbose: boolean) => {
  try {
    const botEnv: string[] = fs.readFileSync(envFile, 'utf-8')
      .split('\n').filter((s: string) => s !== '');
    botEnv.forEach((s: string) => {
      const [k, v] = s.split('=');
      if (envIsNotSet(k)) {
        if (verbose) console.log('- Reading from env file', k);
        process.env[k] = v;
      }
    });
  }
  catch {
    if (required.some(envIsNotSet)) { 
      console.error('> Failed to source env file', envFile);
    }
  }
  finally {
    const missing = required.filter(envIsNotSet);
    if (missing.length > 0) {
      console.error(`> Some env variables are missing: [${missing.join(', ')}]`);
      process.exit(0);
    }
  }
}

export { readEnvFile }
