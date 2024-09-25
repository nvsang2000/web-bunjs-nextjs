"use server";
import runJobOKX from './job/okx'
export default async function runToolOKX(values: any) {
  const { requestId } =  values
  try {
    console.log("values", values);

    setTimeout(() => {
      console.log("Worker job finished");
      runJobOKX(requestId).catch((err) => {
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
