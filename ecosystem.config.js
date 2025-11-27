export default {
  apps: [
    {
      name: "backend-task",
      script: "./server.js",
      instances: "max",      // Cluster mode
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
