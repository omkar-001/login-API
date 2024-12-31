import Queue from "bull";
import { sendEmail } from "../config/helper.js";

const emailQueue = new Queue("emailjob", {
  redis: {
    host: "localhost",
    port: 6379,
  },
});

emailQueue.process(async (job) => {
  try {
    const { user, resetUrl } = job.data;
    await sendEmail(user, resetUrl);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    throw error;
  }
});

emailQueue.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed with result:`, result);
});

emailQueue.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed with error:`, err);
});

export default emailQueue;
