import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = process.env.URL;
const PUBLIC_KEY = process.env.SUPABASE_KEY;

console.log("URL = " + PROJECT_URL);
console.log("APIKEY = " + PUBLIC_KEY);

const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export default function videoService(){
    return {
        getAllVideos: () => {
            return supabase.from("video").select("*");
        }
    };
}