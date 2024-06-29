import { authentication, createDirectus, rest } from "@directus/sdk";
import "dotenv/config";

export default createDirectus(process.env.BACKEND_URL!)
  .with(rest())
  .with(
    authentication("cookie", { credentials: "include", autoRefresh: true })
  );
