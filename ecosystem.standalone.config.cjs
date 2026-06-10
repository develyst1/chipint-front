// Standalone deploy: build at local (`bun run build` / `npm run build`),
// copy `.next/standalone` (which now contains server.js + trimmed node_modules
// + the static/public assets from postbuild) onto the server, then:
//   pm2 delete chipint
//   pm2 start ecosystem.standalone.config.cjs
//   pm2 save
//
// NEXT_PUBLIC_* vars are baked at BUILD time (on local) — not needed here.
// NEXTAUTH_* are read at RUNTIME — provide them either:
//   (a) in the env block below, or
//   (b) as a `.env.local` placed inside `.next/standalone/` on the server (gitignored).
module.exports = {
  apps: [
    {
      name: "chipint",
      script: "server.js",
      cwd: "C:\\Develyst\\chipint\\front\\.next\\standalone",
      env: {
        NODE_ENV: "production",
        PORT: "3010",
        HOSTNAME: "0.0.0.0",
        // NEXTAUTH_URL: "https://chipint.develyst.online",
        // NEXTAUTH_SECRET: "<secret>",
      },
      watch: false,
      restart_delay: 3000,
      max_restarts: 10,
    },
  ],
};
