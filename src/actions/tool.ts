"use server";
import { toolWorker } from "../workers/tools.worker";


export default async function runToolOKX() {
  try {
    console.log('runToolOKX')
    const job = await toolWorker.add('toolWorker', { mess: 'hello job'})

    console.log('job', job.id)
    return { data: job.id }

  } catch (error) {
    console.log(error)
  }
}
