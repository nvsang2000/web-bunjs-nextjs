"use server";
import { Worker, Queue } from "bullmq";
import Redis from "ioredis";
const connection = new Redis(process.env.REDIS_URL!);

export const toolWorker = new Queue("toolWorker", {
  connection: {
    host: "127.0.0.1", // Địa chỉ Redis
    port: 6379, // Cổng của Redis
    maxRetriesPerRequest: null, // Cần đặt giá trị là null
  },
});

const worker = new Worker(
  "toolWorker", // this is the queue name, the first string parameter we provided for Queue()
  async (job) => {
    const data = job?.data;
    console.log(data);
    console.log("Task executed successfully");
  },
  {
    connection,
    concurrency: 5,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  }
);

export default worker;
