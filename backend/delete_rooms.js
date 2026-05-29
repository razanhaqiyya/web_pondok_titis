const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteAllRooms() {
    console.log("Deleting all rooms...");
    // Since Supabase doesn't allow a delete without a filter by default, we can just delete where id is not null.
    const { data, error } = await supabase
        .from('rooms')
        .delete()
        .neq('id', 0); // Hack to delete all

    if (error) {
        console.error("Error deleting rooms:", error);
    } else {
        console.log("Deleted rooms.");
    }
}

deleteAllRooms();
