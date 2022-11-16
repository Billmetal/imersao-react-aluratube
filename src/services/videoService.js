import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.PROJECT_URL, process.env.PUBLIC_KEY);

export default function videoService(){
    return {
        getAllVideos: () => {
            return supabase.from("video").select("*");
        }
    };
}