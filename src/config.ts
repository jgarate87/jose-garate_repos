import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
  return {
    cockroachDB: {
      dbName: process.env.COCKROACH_DB,
      port: parseInt(process.env.COCKROACH_PUERTO, 10),
      password: process.env.COCKROACH_CLAVE,
      user: process.env.COCKROACH_USUARIO,
      host: process.env.COCKROACH_HOST,
      cluster: process.env.COCKROACH_CLUSTER,
    },
  }
})
