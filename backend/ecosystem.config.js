module.exports = {
  apps: [
    {
      name: "server",
      script: "./app.js", // Path to your main server file
      instances: 1,
      autorestart: false,
      watch: false,
      // max_memory_restart: "300M",
      min_uptime: "60s",
      max_restarts: 5,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "fetchSurfData",
      script: "./services/fetchSurfData.js", // Path to your fetchSurfData script
      instances: 1,
      autorestart: false,
      watch: false,
      // max_memory_restart: "100M", // Adjust according to your need
      min_uptime: "60s",
      max_restarts: 5,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
