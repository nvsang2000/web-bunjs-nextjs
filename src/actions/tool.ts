"use server";
import runJobOKX from './job/okx'
export default async function runToolOKX(values: any) {
  const { proxy, requestId } =  values.jobAirdrop[0]
  try {
    console.log("values", values.jobAirdrop[0]);

    setTimeout(() => {
      console.log("Worker job finished");
      runJobOKX(proxy, requestId).catch((err) => {
        console.error(err);
        process.exit(1);
      });
    }, 1000);

    return { mess: "Running tool okx", code: 200 };
  } catch (error) {
    console.log(error);
    return { mess: "Error server!", code: 500 };
  }
}
