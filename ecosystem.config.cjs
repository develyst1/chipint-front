module.exports = {
  apps: [{
    name: 'chipint',
    script: 'server.js',
    cwd: 'C:\\Develyst\\chipint\\front',
    env: { NODE_ENV: 'production' },
    watch: false,
    restart_delay: 3000,
    max_restarts: 10,
  }]
};
