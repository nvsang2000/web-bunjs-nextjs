import OKX from "../../actions/okx"
export async function GET(request) {
    OKX.main()
    return new Response(JSON.stringify({ message: 'Hello from Next.js API!' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  